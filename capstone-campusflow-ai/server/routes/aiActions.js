const express = require('express');
const crypto = require('crypto');
const AIAction = require('../models/AIAction');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);

const ACTIONS = new Set(['create_task', 'complete_task', 'update_task']);
const PRIORITIES = new Set(['low', 'medium', 'high']);
const STATUSES = new Set(['todo', 'in-progress', 'done']);
const TOKEN_TTL_MS = 5 * 60 * 1000;

function tokenHash(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function makeToken() {
  return crypto.randomBytes(32).toString('hex');
}

function cleanText(value, max) {
  return String(value || '').trim().slice(0, max);
}

async function validateAction(userId, actionType, rawPayload) {
  if (!ACTIONS.has(actionType)) throw Object.assign(new Error('Unsupported AI action.'), { status: 400 });
  const payload = rawPayload && typeof rawPayload === 'object' && !Array.isArray(rawPayload) ? rawPayload : {};

  if (actionType === 'create_task') {
    const title = cleanText(payload.title, 200);
    if (!title) throw Object.assign(new Error('Task title is required.'), { status: 400 });
    const priority = payload.priority || 'medium';
    if (!PRIORITIES.has(priority)) throw Object.assign(new Error('Invalid task priority.'), { status: 400 });
    let dueDate;
    if (payload.dueDate) {
      dueDate = new Date(payload.dueDate);
      if (Number.isNaN(dueDate.getTime())) throw Object.assign(new Error('Invalid due date.'), { status: 400 });
    }
    return {
      title,
      description: cleanText(payload.description, 1000),
      priority,
      status: 'todo',
      ...(dueDate ? { dueDate } : {})
    };
  }

  const taskId = cleanText(payload.taskId, 64);
  if (!/^[a-f0-9]{24}$/i.test(taskId)) throw Object.assign(new Error('A valid taskId is required.'), { status: 400 });
  const task = await Task.findOne({ _id: taskId, user: userId }).select('title status priority dueDate').lean();
  if (!task) throw Object.assign(new Error('Task not found for this user.'), { status: 404 });

  if (actionType === 'complete_task') {
    return { taskId, expectedStatus: task.status, title: task.title };
  }

  const update = { taskId };
  if (payload.title !== undefined) update.title = cleanText(payload.title, 200);
  if (payload.description !== undefined) update.description = cleanText(payload.description, 1000);
  if (payload.priority !== undefined) {
    if (!PRIORITIES.has(payload.priority)) throw Object.assign(new Error('Invalid task priority.'), { status: 400 });
    update.priority = payload.priority;
  }
  if (payload.status !== undefined) {
    if (!STATUSES.has(payload.status)) throw Object.assign(new Error('Invalid task status.'), { status: 400 });
    update.status = payload.status;
  }
  if (payload.dueDate !== undefined) {
    if (payload.dueDate === null || payload.dueDate === '') update.dueDate = null;
    else {
      const date = new Date(payload.dueDate);
      if (Number.isNaN(date.getTime())) throw Object.assign(new Error('Invalid due date.'), { status: 400 });
      update.dueDate = date;
    }
  }
  if (Object.keys(update).length === 1) throw Object.assign(new Error('No task changes were supplied.'), { status: 400 });
  return update;
}

function previewFor(actionType, payload) {
  if (actionType === 'create_task') return `Create task “${payload.title}” with ${payload.priority} priority.`;
  if (actionType === 'complete_task') return `Mark “${payload.title}” as done.`;
  return `Update task ${payload.taskId} with the confirmed fields.`;
}

router.post('/propose', async (req, res, next) => {
  try {
    const actionType = cleanText(req.body.actionType, 40);
    const payload = await validateAction(req.user._id, actionType, req.body.payload);
    const token = makeToken();
    const action = await AIAction.create({
      user: req.user._id,
      actionType,
      payload,
      preview: previewFor(actionType, payload),
      tokenHash: tokenHash(token),
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS)
    });

    await audit(req, 'ai.action_proposed', 'aiAction', action._id, { actionType });
    res.status(201).json({
      actionId: action._id,
      actionType,
      preview: action.preview,
      expiresAt: action.expiresAt,
      confirmationToken: token
    });
  } catch (error) { next(error); }
});

router.post('/confirm', async (req, res, next) => {
  try {
    const token = cleanText(req.body.confirmationToken, 128);
    if (!token) return res.status(400).json({ message: 'confirmationToken is required.' });

    const action = await AIAction.findOne({ tokenHash: tokenHash(token), user: req.user._id, status: 'pending' });
    if (!action) return res.status(404).json({ message: 'Confirmation is invalid, already used, or expired.' });
    if (action.expiresAt <= new Date()) {
      action.status = 'expired';
      await action.save();
      return res.status(410).json({ message: 'Confirmation expired. Create a new proposal.' });
    }

    let result;
    if (action.actionType === 'create_task') {
      result = await Task.create({ user: req.user._id, ...action.payload });
    } else if (action.actionType === 'complete_task') {
      result = await Task.findOneAndUpdate(
        { _id: action.payload.taskId, user: req.user._id, status: action.payload.expectedStatus },
        { $set: { status: 'done' } },
        { new: true }
      ).select('title status priority dueDate').lean();
    } else {
      const changes = { ...action.payload };
      delete changes.taskId;
      result = await Task.findOneAndUpdate(
        { _id: action.payload.taskId, user: req.user._id },
        { $set: changes },
        { new: true, runValidators: true }
      ).select('title description status priority dueDate').lean();
    }

    if (!result) return res.status(409).json({ message: 'The target task changed or no longer exists. Nothing was applied.' });

    action.status = 'confirmed';
    action.confirmedAt = new Date();
    action.result = { id: result._id, type: action.actionType };
    await action.save();
    await audit(req, 'ai.action_confirmed', 'aiAction', action._id, { actionType: action.actionType, resultId: result._id });
    res.json({ actionId: action._id, status: 'confirmed', result });
  } catch (error) { next(error); }
});

router.post('/cancel', async (req, res, next) => {
  try {
    const token = cleanText(req.body.confirmationToken, 128);
    const action = await AIAction.findOneAndUpdate(
      { tokenHash: tokenHash(token), user: req.user._id, status: 'pending', expiresAt: { $gt: new Date() } },
      { $set: { status: 'cancelled' } },
      { new: true }
    ).select('_id status');
    if (!action) return res.status(404).json({ message: 'Confirmation is invalid or already closed.' });
    await audit(req, 'ai.action_cancelled', 'aiAction', action._id);
    res.json({ actionId: action._id, status: 'cancelled' });
  } catch (error) { next(error); }
});

module.exports = router;
