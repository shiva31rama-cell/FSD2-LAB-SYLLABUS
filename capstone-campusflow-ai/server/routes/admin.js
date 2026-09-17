const express = require('express');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { requireAuth, requireRole } = require('../middleware/auth');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth, requireRole('admin'));

router.get('/users', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 25, 1), 100);
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const total = await User.countDocuments();
    res.json({ users, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
});

router.patch('/users/:id/role', async (req, res, next) => {
  try {
    if (!['student', 'faculty', 'admin'].includes(req.body.role)) return res.status(400).json({ message: 'Invalid role.' });
    if (String(req.user._id) === String(req.params.id) && req.body.role !== 'admin') return res.status(400).json({ message: 'Do not remove your own admin role.' });
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true, runValidators: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    await audit(req, 'role.change', 'user', user._id, { role: user.role });
    res.json({ user });
  } catch (error) { next(error); }
});

router.get('/audit-logs', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
    const logs = await AuditLog.find().populate('actor', 'name email role').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const total = await AuditLog.countDocuments();
    res.json({ logs, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
});

module.exports = router;
