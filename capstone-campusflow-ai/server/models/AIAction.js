const mongoose = require('mongoose');

const aiActionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  actionType: { type: String, enum: ['create_task', 'complete_task', 'update_task'], required: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  preview: { type: String, required: true, maxlength: 1000 },
  tokenHash: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'confirmed', 'expired', 'cancelled'], default: 'pending', index: true },
  // TTL index is declared below so MongoDB can automatically remove expired actions.
  expiresAt: { type: Date, required: true },
  confirmedAt: Date,
  result: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true, versionKey: false });

// Keep one index definition. This is a TTL index and also supports expiry queries.
aiActionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AIAction', aiActionSchema);
