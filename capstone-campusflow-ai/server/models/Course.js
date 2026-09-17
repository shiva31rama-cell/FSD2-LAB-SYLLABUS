const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true, uppercase: true, maxlength: 20 },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, default: '', maxlength: 2000 },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  term: { type: String, required: true, trim: true, maxlength: 40 },
  credits: { type: Number, min: 0, max: 20, default: 3 },
  schedule: [{ day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] }, start: String, end: String }],
  room: { type: String, trim: true, maxlength: 80, default: '' },
  active: { type: Boolean, default: true, index: true }
}, { timestamps: true, versionKey: false });

courseSchema.index({ code: 1, term: 1 }, { unique: true });
courseSchema.index({ faculty: 1, active: 1, term: 1 });

module.exports = mongoose.model('Course', courseSchema);
