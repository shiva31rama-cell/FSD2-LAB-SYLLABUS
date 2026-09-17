const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true },
  category: { type: String, enum: ['academic', 'event', 'placement', 'general'], default: 'general' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

announcementSchema.index({ category: 1, publishedAt: -1 });
announcementSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Announcement', announcementSchema);
