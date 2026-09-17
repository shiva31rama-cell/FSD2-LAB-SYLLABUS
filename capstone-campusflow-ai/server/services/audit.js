const AuditLog = require('../models/AuditLog');

async function audit(req, action, resource, resourceId = undefined, metadata = {}) {
  if (!req.user?._id) return;
  await AuditLog.create({
    actor: req.user._id,
    action,
    resource,
    resourceId: resourceId ? String(resourceId) : undefined,
    method: req.method,
    path: req.originalUrl,
    requestId: req.requestId,
    metadata
  });
}

module.exports = { audit };
