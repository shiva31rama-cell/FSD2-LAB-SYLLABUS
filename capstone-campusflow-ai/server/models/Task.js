const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, default: '' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  dueDate: { type: Date },
  aiLabel: { type: String, default: '' }
}, { timestamps: true });

taskSchema.index({ user: 1, status: 1, dueDate: 1 });
taskSchema.index({ user: 1, title: 'text', description: 'text' });

module.exports = mongoose.model('Task', taskSchema);
