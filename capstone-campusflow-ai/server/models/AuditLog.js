const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: { type: String, required: true, trim: true, maxlength: 80 },
  resource: { type: String, required: true, trim: true, maxlength: 80 },
  resourceId: { type: String, trim: true, maxlength: 100 },
  method: { type: String, required: true, maxlength: 10 },
  path: { type: String, required: true, maxlength: 300 },
  requestId: { type: String, required: true, index: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true, versionKey: false });

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ actor: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
