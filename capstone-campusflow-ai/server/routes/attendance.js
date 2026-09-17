const express = require('express');
const mongoose = require('mongoose');
const AttendanceSession = require('../models/AttendanceSession');
const AttendanceRecord = require('../models/AttendanceRecord');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { requireAuth, requireRole } = require('../middleware/auth');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);
const statuses = ['present', 'absent', 'late', 'excused'];

async function ownedCourse(courseId, user) {
  const course = await Course.findById(courseId).select('faculty code title').lean();
  if (!course) return null;
  if (user.role === 'admin') return course;
  if (user.role === 'faculty' && String(course.faculty) === String(user._id)) return course;
  return false;
}

router.post('/sessions', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.body.course)) return res.status(400).json({ message: 'Valid course is required.' });
    const course = await ownedCourse(req.body.course, req.user);
    if (course === false) return res.status(403).json({ message: 'You do not own this course.' });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const session = await AttendanceSession.create({ course: course._id, date: req.body.date ? new Date(req.body.date) : new Date(), topic: req.body.topic, createdBy: req.user._id });
    await audit(req, 'attendance.session.create', 'attendanceSession', session._id, { course: course._id });
    res.status(201).json(session);
  } catch (error) { next(error); }
});

router.patch('/sessions/:id/close', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid session id.' });
    const session = await AttendanceSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Attendance session not found.' });
    const course = await ownedCourse(session.course, req.user);
    if (course === false) return res.status(403).json({ message: 'You do not own this course.' });
    session.status = 'closed';
    session.closedAt = new Date();
    await session.save();
    await audit(req, 'attendance.session.close', 'attendanceSession', session._id);
    res.json(session);
  } catch (error) { next(error); }
});

router.put('/sessions/:id/records', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid session id.' });
    const session = await AttendanceSession.findById(req.params.id).lean();
    if (!session) return res.status(404).json({ message: 'Attendance session not found.' });
    if (session.status === 'closed') return res.status(409).json({ message: 'Attendance session is closed.' });
    const course = await ownedCourse(session.course, req.user);
    if (course === false) return res.status(403).json({ message: 'You do not own this course.' });
    const records = Array.isArray(req.body.records) ? req.body.records : [];
    if (!records.length || records.length > 500) return res.status(400).json({ message: 'records must contain 1 to 500 items.' });
    const studentIds = records.map(r => r.student).filter(mongoose.isValidObjectId);
    if (studentIds.length !== records.length) return res.status(400).json({ message: 'Every record needs a valid student id.' });
    const enrolled = await Enrollment.find({ course: session.course, student: { $in: studentIds }, status: 'active' }).select('student').lean();
    const enrolledIds = new Set(enrolled.map(e => String(e.student)));
    const invalid = studentIds.find(id => !enrolledIds.has(String(id)));
    if (invalid) return res.status(400).json({ message: 'All students must be actively enrolled in the course.' });
    const ops = records.map(r => {
      if (!statuses.includes(r.status)) throw Object.assign(new Error(`Invalid attendance status: ${r.status}`), { status: 400 });
      return { updateOne: { filter: { session: session._id, student: r.student }, update: { $set: { status: r.status, markedBy: req.user._id, markedAt: new Date() } }, upsert: true } };
    });
    await AttendanceRecord.bulkWrite(ops, { ordered: true });
    await audit(req, 'attendance.records.upsert', 'attendanceSession', session._id, { count: records.length });
    res.json({ updated: records.length });
  } catch (error) { next(error); }
});

router.get('/courses/:courseId/report', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.courseId)) return res.status(400).json({ message: 'Invalid course id.' });
    const course = await ownedCourse(req.params.courseId, req.user);
    if (course === false) return res.status(403).json({ message: 'You do not own this course.' });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const sessions = await AttendanceSession.find({ course: course._id }).sort({ date: -1 }).lean();
    const sessionIds = sessions.map(s => s._id);
    const records = await AttendanceRecord.find({ session: { $in: sessionIds } }).populate('student', 'name email branch year').lean();
    const byStudent = new Map();
    for (const r of records) {
      const key = String(r.student._id);
      const item = byStudent.get(key) || { student: r.student, present: 0, absent: 0, late: 0, excused: 0, total: 0 };
      item[r.status] += 1;
      item.total += 1;
      byStudent.set(key, item);
    }
    const report = [...byStudent.values()].map(item => ({ ...item, percentage: item.total ? Number((((item.present + item.late) / item.total) * 100).toFixed(2)) : 0 }));
    res.json({ course, sessionCount: sessions.length, sessions, students: report });
  } catch (error) { next(error); }
});

router.get('/me', requireRole('student'), async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id, status: 'active' }).select('course').lean();
    const courseIds = enrollments.map(e => e.course);
    const sessions = await AttendanceSession.find({ course: { $in: courseIds } }).sort({ date: -1 }).lean();
    const records = await AttendanceRecord.find({ student: req.user._id, session: { $in: sessions.map(s => s._id) } }).lean();
    const recordMap = new Map(records.map(r => [String(r.session), r.status]));
    const byCourse = new Map();
    for (const s of sessions) {
      const key = String(s.course);
      const item = byCourse.get(key) || { course: s.course, present: 0, absent: 0, late: 0, excused: 0, total: 0 };
      const status = recordMap.get(String(s._id));
      if (status) { item[status] += 1; item.total += 1; }
      byCourse.set(key, item);
    }
    res.json([...byCourse.values()].map(item => ({ ...item, percentage: item.total ? Number((((item.present + item.late) / item.total) * 100).toFixed(2)) : 0 })));
  } catch (error) { next(error); }
});

module.exports = router;
