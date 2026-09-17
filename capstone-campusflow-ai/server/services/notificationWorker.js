const Task = require('../models/Task');
const Notification = require('../models/Notification');

let timer = null;
let running = false;

async function runNotificationSweep() {
  if (running) return { skipped: true };
  running = true;
  try {
    const now = new Date();
    const horizon = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tasks = await Task.find({ status: { $ne: 'done' }, dueDate: { $gte: now, $lte: horizon } }).select('_id user title dueDate').lean();
    let created = 0;
    for (const task of tasks) {
      const key = `task_due:${task._id}:${task.dueDate.toISOString().slice(0, 10)}`;
      const result = await Notification.updateOne(
        { idempotencyKey: key },
        { $setOnInsert: { user: task.user, type: 'task_due', title: 'Task due soon', message: `${task.title} is due within 24 hours.`, data: { taskId: task._id, dueDate: task.dueDate }, idempotencyKey: key } },
        { upsert: true }
      );
      if (result.upsertedCount) created += 1;
    }
    return { checked: tasks.length, created };
  } finally {
    running = false;
  }
}

function startNotificationWorker() {
  if (process.env.NOTIFICATION_WORKER_ENABLED !== 'true' || timer) return;
  const intervalMs = Math.max(Number(process.env.NOTIFICATION_WORKER_INTERVAL_MS || 300000), 60000);
  timer = setInterval(() => runNotificationSweep().catch(error => console.error('Notification worker failed:', error.message)), intervalMs);
  timer.unref?.();
  runNotificationSweep().catch(error => console.error('Initial notification sweep failed:', error.message));
}

function stopNotificationWorker() {
  if (timer) clearInterval(timer);
  timer = null;
}

module.exports = { runNotificationSweep, startNotificationWorker, stopNotificationWorker };
