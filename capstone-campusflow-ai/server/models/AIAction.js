const mongoose = require('mongoose');

const aiActionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  actionType: { type: String, enum: ['create_task', 'complete_task', 'update_task'], required: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  preview: { type: String, required: true, maxlength: 1000 },
  tokenHash: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'confirmed', 'expired', 'cancelled'], default: 'pending', index: true },
  expiresAt: { type: Date, required: true, index: true },
  confirmedAt: Date,
  result: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true, versionKey: false });

aiActionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AIAction', aiActionSchema);
