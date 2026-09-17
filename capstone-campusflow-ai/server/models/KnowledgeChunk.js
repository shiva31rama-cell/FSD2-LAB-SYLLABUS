const mongoose = require('mongoose');

const knowledgeChunkSchema = new mongoose.Schema({
  sourceId: { type: String, required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true, maxlength: 12000 },
  category: { type: String, default: 'general', trim: true, maxlength: 80 },
  url: { type: String, trim: true, maxlength: 500 },
  embedding: { type: [Number], select: false },
  embeddingModel: { type: String, maxlength: 100 },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  active: { type: Boolean, default: true, index: true }
}, { timestamps: true, versionKey: false });

knowledgeChunkSchema.index({ sourceId: 1, active: 1 });
knowledgeChunkSchema.index({ category: 1, active: 1 });

module.exports = mongoose.model('KnowledgeChunk', knowledgeChunkSchema);
