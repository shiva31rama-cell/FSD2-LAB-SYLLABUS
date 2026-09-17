const express = require('express');
const Announcement = require('../models/Announcement');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const announcements = await Announcement.find(filter)
      .populate('author', 'name role')
      .sort({ publishedAt: -1 })
      .limit(30);
    res.json(announcements);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const announcement = await Announcement.create({ ...req.body, author: req.session.userId });
    res.status(201).json(await announcement.populate('author', 'name role'));
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const announcement = await Announcement.findOneAndDelete({ _id: req.params.id, author: req.session.userId });
    if (!announcement) return res.status(404).json({ message: 'Announcement not found or not owned by you.' });
    res.json({ message: 'Announcement deleted.' });
  } catch (error) { next(error); }
});

module.exports = router;
