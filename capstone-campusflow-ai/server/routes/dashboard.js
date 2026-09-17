const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const Announcement = require('../models/Announcement');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/summary', async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.session.userId);

    // MongoDB aggregation creates dashboard statistics in the database.
    const taskStats = await Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const priorityStats = await Task.aggregate([
      { $match: { user: userId, status: { $ne: 'done' } } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    const upcoming = await Task.find({
      user: req.session.userId,
      status: { $ne: 'done' },
      dueDate: { $gte: new Date() }
    }).sort({ dueDate: 1 }).limit(5).select('title priority status dueDate');

    const announcementCount = await Announcement.countDocuments();
    res.json({ taskStats, priorityStats, upcoming, announcementCount });
  } catch (error) { next(error); }
});

module.exports = router;
