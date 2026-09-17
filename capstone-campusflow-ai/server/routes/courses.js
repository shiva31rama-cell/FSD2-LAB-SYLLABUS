const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { requireAuth, requireRole } = require('../middleware/auth');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);

function validId(id) { return mongoose.isValidObjectId(id); }

router.get('/', async (req, res, next) => {
  try {
    const filter = { active: req.query.active !== 'false' };
    if (req.user.role === 'student') {
      const enrollments = await Enrollment.find({ student: req.user._id, status: 'active' }).select('course').lean();
      filter._id = { $in: enrollments.map(e => e.course) };
    } else if (req.query.faculty === 'me') {
      filter.faculty = req.user._id;
    }
    if (req.query.term) filter.term = String(req.query.term).slice(0, 40);
    const courses = await Course.find(filter).populate('faculty', 'name email').sort({ code: 1 }).limit(100).lean();
    res.json(courses);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid course id.' });
    const course = await Course.findById(req.params.id).populate('faculty', 'name email').lean();
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    if (req.user.role === 'student') {
      const enrolled = await Enrollment.exists({ course: course._id, student: req.user._id, status: 'active' });
      if (!enrolled) return res.status(403).json({ message: 'You are not enrolled in this course.' });
    } else if (req.user.role === 'faculty' && String(course.faculty?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You do not own this course.' });
    }
    res.json(course);
  } catch (error) { next(error); }
});

router.post('/', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    const { code, title, description, term, credits, schedule, room } = req.body;
    if (!code || !title || !term) return res.status(400).json({ message: 'code, title and term are required.' });
    const course = await Course.create({ code, title, description, term, credits, schedule, room, faculty: req.user._id });
    await audit(req, 'course.create', 'course', course._id, { code: course.code, term: course.term });
    res.status(201).json(course);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'A course with this code already exists for this term.' });
    next(error);
  }
});

router.put('/:id', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid course id.' });
    const existing = await Course.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Course not found.' });
    if (req.user.role === 'faculty' && String(existing.faculty) !== String(req.user._id)) return res.status(403).json({ message: 'You do not own this course.' });
    const allowed = ['code', 'title', 'description', 'term', 'credits', 'schedule', 'room', 'active'];
    const payload = Object.fromEntries(allowed.filter(k => req.body[k] !== undefined).map(k => [k, req.body[k]]));
    const course = await Course.findByIdAndUpdate(existing._id, { $set: payload }, { new: true, runValidators: true });
    await audit(req, 'course.update', 'course', course._id, { changedFields: Object.keys(payload) });
    res.json(course);
  } catch (error) { next(error); }
});

router.post('/:id/enroll', requireRole('student'), async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid course id.' });
    const course = await Course.findOne({ _id: req.params.id, active: true });
    if (!course) return res.status(404).json({ message: 'Active course not found.' });
    const enrollment = await Enrollment.findOneAndUpdate(
      { course: course._id, student: req.user._id },
      { $set: { status: 'active', completedAt: null }, $setOnInsert: { enrolledAt: new Date() } },
      { new: true, upsert: true, runValidators: true }
    );
    await audit(req, 'course.enroll', 'enrollment', enrollment._id, { course: course._id });
    res.status(201).json(enrollment);
  } catch (error) { next(error); }
});

router.delete('/:id/enroll', requireRole('student'), async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid course id.' });
    const enrollment = await Enrollment.findOneAndUpdate({ course: req.params.id, student: req.user._id, status: 'active' }, { $set: { status: 'dropped' } }, { new: true });
    if (!enrollment) return res.status(404).json({ message: 'Active enrollment not found.' });
    await audit(req, 'course.drop', 'enrollment', enrollment._id);
    res.json(enrollment);
  } catch (error) { next(error); }
});

router.get('/:id/roster', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid course id.' });
    const course = await Course.findById(req.params.id).select('faculty code title').lean();
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    if (req.user.role === 'faculty' && String(course.faculty) !== String(req.user._id)) return res.status(403).json({ message: 'You do not own this course.' });
    const roster = await Enrollment.find({ course: course._id, status: 'active' }).populate('student', 'name email branch year').sort({ createdAt: 1 }).lean();
    res.json({ course, roster });
  } catch (error) { next(error); }
});

module.exports = router;
