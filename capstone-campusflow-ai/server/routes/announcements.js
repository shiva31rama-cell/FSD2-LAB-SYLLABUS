const express = require('express');
const mongoose = require('mongoose');
const Announcement = require('../models/Announcement');
const { requireAuth, requireRole } = require('../middleware/auth');
const { text, validateBody } = require('../middleware/validate');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: String(req.query.category).slice(0, 80) } : {};
    const announcements = await Announcement.find(filter).populate('author', 'name role').sort({ publishedAt: -1 }).limit(30).lean();
    res.json(announcements);
  } catch (error) { next(error); }
});

router.post('/', requireRole('faculty', 'admin'), validateBody([
  body => text(body.title, 'title', { min: 2, max: 200 }),
  body => text(body.content, 'content', { min: 2, max: 5000 })
]), async (req, res, next) => {
  try {
    const announcement = await Announcement.create({ title: req.body.title.trim(), content: req.body.content.trim(), category: String(req.body.category || 'general').trim().slice(0, 80), author: req.user._id });
    await audit(req, 'announcement.create', 'announcement', announcement._id);
    res.status(201).json(await announcement.populate('author', 'name role'));
  } catch (error) { next(error); }
});

router.delete('/:id', requireRole('faculty', 'admin'), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid announcement id.' });
    const filter = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, author: req.user._id };
    const announcement = await Announcement.findOneAndDelete(filter);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found or not permitted.' });
    await audit(req, 'announcement.delete', 'announcement', announcement._id);
    res.json({ message: 'Announcement deleted.' });
  } catch (error) { next(error); }
});

module.exports = router;
