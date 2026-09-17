const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { app } = require('../server');
const User = require('../models/User');
const Task = require('../models/Task');
const AIAction = require('../models/AIAction');
const AuditLog = require('../models/AuditLog');

const runIntegration = process.env.RUN_ATLAS_INTEGRATION === 'true';
const testName = `atlas-e2e-${Date.now()}@campusflow.test`;
const testPassword = 'CampusFlow-E2E-2026!';
let server;
let cookie;
let userId;
let taskId;

function testOrSkip(name, fn) {
  return test(name, { skip: !runIntegration }, fn);
}

async function request(path, options = {}) {
  const headers = { 'content-type': 'application/json', ...(options.headers || {}) };
  if (cookie) headers.cookie = cookie;
  const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, {
    ...options,
    headers
  });
  const text = await response.text();
  let body = {};
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
  return { response, body };
}

function captureCookie(response) {
  const setCookie = response.headers.get('set-cookie');
  assert.ok(setCookie, 'Expected authenticated session cookie.');
  cookie = setCookie.split(';')[0];
}

testOrSkip('authenticated Atlas end-to-end flow with explicit AI confirmation', async () => {
  assert.ok(process.env.MONGO_URI, 'MONGO_URI is required for Atlas integration.');
  assert.ok(process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32, 'A test SESSION_SECRET of at least 32 characters is required.');

  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10 });
  server = app.listen(0);

  try {
    const register = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'CampusFlow Atlas E2E', email: testName, password: testPassword, branch: 'CSE', year: 3 })
    });
    assert.equal(register.response.status, 201);
    assert.equal(register.body.user.email, testName);
    userId = register.body.user.id;
    captureCookie(register.response);

    const me = await request('/api/auth/me');
    assert.equal(me.response.status, 200);
    assert.equal(me.body.user.id, userId);

    const createdTask = await request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: 'Atlas E2E confirmation task', priority: 'high', status: 'in-progress' })
    });
    assert.equal(createdTask.response.status, 201);
    taskId = createdTask.body._id;

    const proposal = await request('/api/ai/actions/propose', {
      method: 'POST',
      body: JSON.stringify({ actionType: 'complete_task', payload: { taskId } })
    });
    assert.equal(proposal.response.status, 201);
    assert.match(proposal.body.preview, /Mark/);
    assert.ok(proposal.body.confirmationToken);

    const beforeConfirm = await request(`/api/tasks`);
    assert.equal(beforeConfirm.response.status, 200);
    assert.equal(beforeConfirm.body.find(task => task._id === taskId).status, 'in-progress');

    const confirmed = await request('/api/ai/actions/confirm', {
      method: 'POST',
      body: JSON.stringify({ confirmationToken: proposal.body.confirmationToken })
    });
    assert.equal(confirmed.response.status, 200);
    assert.equal(confirmed.body.status, 'confirmed');
    assert.equal(confirmed.body.result.status, 'done');

    const replay = await request('/api/ai/actions/confirm', {
      method: 'POST',
      body: JSON.stringify({ confirmationToken: proposal.body.confirmationToken })
    });
    assert.equal(replay.response.status, 404);

    const createProposal = await request('/api/ai/actions/propose', {
      method: 'POST',
      body: JSON.stringify({ actionType: 'create_task', payload: { title: 'Confirmed Atlas task', priority: 'medium' } })
    });
    assert.equal(createProposal.response.status, 201);

    const cancelled = await request('/api/ai/actions/cancel', {
      method: 'POST',
      body: JSON.stringify({ confirmationToken: createProposal.body.confirmationToken })
    });
    assert.equal(cancelled.response.status, 200);
    assert.equal(cancelled.body.status, 'cancelled');

    const noExecution = await Task.findOne({ user: userId, title: 'Confirmed Atlas task' }).lean();
    assert.equal(noExecution, null);

    const auditCount = await AuditLog.countDocuments({ actor: userId, action: { $in: ['ai.action_proposed', 'ai.action_confirmed', 'ai.action_cancelled'] } });
    assert.ok(auditCount >= 3);
  } finally {
    if (userId) {
      await AIAction.deleteMany({ user: userId });
      await Task.deleteMany({ user: userId });
      await AuditLog.deleteMany({ actor: userId });
      await User.deleteOne({ _id: userId });
    }
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
  }
});

if (runIntegration && !process.env.MONGO_URI) {
  throw new Error('RUN_ATLAS_INTEGRATION=true requires MONGO_URI.');
}
