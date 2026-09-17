const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['active', 'dropped', 'completed'], default: 'active', index: true },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });

enrollmentSchema.index({ course: 1, student: 1 }, { unique: true });
enrollmentSchema.index({ student: 1, status: 1, course: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
