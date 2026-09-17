const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['task_due', 'announcement', 'system', 'ai'], required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  readAt: { type: Date, default: null },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  idempotencyKey: { type: String, trim: true, maxlength: 240, unique: true, sparse: true },
  expiresAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: 'date' } } });

module.exports = mongoose.model('Notification', notificationSchema);
