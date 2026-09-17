const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');
const { text, enumValue, validateBody } = require('../middleware/validate');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);
const allowedStatus = ['todo', 'in-progress', 'completed'];
const allowedPriority = ['low', 'medium', 'high'];

const taskRules = [
  body => text(body.title, 'title', { min: 1, max: 160 }),
  body => enumValue(body.status || 'todo', 'status', allowedStatus),
  body => enumValue(body.priority || 'medium', 'priority', allowedPriority)
];

router.get('/', async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.$text = { $search: String(req.query.search).slice(0, 100) };
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
    const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 }).limit(limit).lean();
    res.json(tasks);
  } catch (error) { next(error); }
});

router.post('/', validateBody(taskRules), async (req, res, next) => {
  try {
    const allowed = ['title', 'description', 'status', 'priority', 'dueDate'];
    const payload = Object.fromEntries(allowed.filter(key => req.body[key] !== undefined).map(key => [key, req.body[key]]));
    const task = await Task.create({ ...payload, user: req.user._id });
    await audit(req, 'task.create', 'task', task._id, { priority: task.priority, status: task.status });
    res.status(201).json(task);
  } catch (error) { next(error); }
});

router.put('/:id', validateBody([
  body => body.title === undefined ? null : text(body.title, 'title', { min: 1, max: 160 }),
  body => body.status === undefined ? null : enumValue(body.status, 'status', allowedStatus),
  body => body.priority === undefined ? null : enumValue(body.priority, 'priority', allowedPriority)
]), async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid task id.' });
    const allowed = ['title', 'description', 'status', 'priority', 'dueDate'];
    const payload = Object.fromEntries(allowed.filter(key => req.body[key] !== undefined).map(key => [key, req.body[key]]));
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { $set: payload }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    await audit(req, 'task.update', 'task', task._id, { changedFields: Object.keys(payload) });
    res.json(task);
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid task id.' });
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    await audit(req, 'task.delete', 'task', task._id);
    res.json({ message: 'Task deleted.' });
  } catch (error) { next(error); }
});

module.exports = router;
