const mongoose = require('mongoose');

const attendanceSessionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  date: { type: Date, required: true, index: true },
  topic: { type: String, trim: true, maxlength: 200, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open', index: true },
  closedAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });

attendanceSessionSchema.index({ course: 1, date: -1 });

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
