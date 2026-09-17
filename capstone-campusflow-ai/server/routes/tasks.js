const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const filter = { user: req.session.userId };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.$text = { $search: req.query.search };
    const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.session.userId });
    res.status(201).json(task);
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid task id.' });
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ message: 'Task deleted.' });
  } catch (error) { next(error); }
});

module.exports = router;
