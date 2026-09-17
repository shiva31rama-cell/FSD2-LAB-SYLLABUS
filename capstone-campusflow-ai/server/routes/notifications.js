const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);
    const unreadOnly = req.query.unread === 'true';
    const filter = { user: req.user._id };
    if (unreadOnly) filter.readAt = null;
    const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    res.json(notifications);
  } catch (error) { next(error); }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid notification id.' });
    const notification = await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { $set: { readAt: new Date() } }, { new: true }).lean();
    if (!notification) return res.status(404).json({ message: 'Notification not found.' });
    res.json(notification);
  } catch (error) { next(error); }
});

router.post('/read-all', async (req, res, next) => {
  try {
    const result = await Notification.updateMany({ user: req.user._id, readAt: null }, { $set: { readAt: new Date() } });
    res.json({ modifiedCount: result.modifiedCount });
  } catch (error) { next(error); }
});

module.exports = router;
