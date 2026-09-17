const express = require('express');
const OpenAI = require('openai');
const KnowledgeChunk = require('../models/KnowledgeChunk');
const { requireAuth, requireRole } = require('../middleware/auth');
const { text, validateBody } = require('../middleware/validate');
const { audit } = require('../services/audit');

const router = express.Router();
router.use(requireAuth);
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';

router.post('/ingest', requireRole('admin', 'faculty'), validateBody([
  body => text(body.title, 'title', { min: 2, max: 200 }),
  body => text(body.content, 'content', { min: 20, max: 12000 }),
  body => text(body.sourceId, 'sourceId', { min: 1, max: 120 })
]), async (req, res, next) => {
  try {
    if (!openai) return res.status(503).json({ message: 'OPENAI_API_KEY is not configured.' });
    const input = req.body.content.trim();
    const embeddingResponse = await openai.embeddings.create({ model: embeddingModel, input });
    const chunk = await KnowledgeChunk.findOneAndUpdate(
      { sourceId: req.body.sourceId },
      {
        $set: {
          title: req.body.title.trim(), content: input, category: String(req.body.category || 'general').trim().slice(0, 80),
          url: req.body.url ? String(req.body.url).trim().slice(0, 500) : undefined,
          embedding: embeddingResponse.data[0].embedding, embeddingModel, metadata: req.body.metadata || {}, active: true
        }
      },
      { upsert: true, new: true, runValidators: true }
    );
    await audit(req, 'knowledge.ingest', 'knowledgeChunk', chunk._id, { sourceId: chunk.sourceId });
    res.status(201).json({ id: chunk._id, sourceId: chunk.sourceId, embeddingModel, dimensions: chunk.embedding.length });
  } catch (error) { next(error); }
});

router.get('/', requireRole('admin', 'faculty'), async (req, res, next) => {
  try {
    const chunks = await KnowledgeChunk.find({ active: true }).select('-embedding').sort({ updatedAt: -1 }).limit(100).lean();
    res.json(chunks);
  } catch (error) { next(error); }
});

router.post('/search', validateBody([
  body => text(body.query, 'query', { min: 2, max: 1000 })
]), async (req, res, next) => {
  try {
    if (!openai) return res.status(503).json({ message: 'OPENAI_API_KEY is not configured.' });
    const embeddingResponse = await openai.embeddings.create({ model: embeddingModel, input: req.body.query.trim() });
    const limit = Math.min(Math.max(Number(req.body.limit) || 5, 1), 20);
    const filter = { active: true };
    if (req.body.category) filter.category = String(req.body.category).slice(0, 80);
    const results = await KnowledgeChunk.aggregate([
      { $vectorSearch: { index: process.env.MONGODB_VECTOR_INDEX || 'campusflow_vector_index', path: 'embedding', queryVector: embeddingResponse.data[0].embedding, numCandidates: Math.max(limit * 20, 50), limit, filter } },
      { $project: { title: 1, content: 1, category: 1, url: 1, sourceId: 1, score: { $meta: 'vectorSearchScore' } } }
    ]);
    res.json({ query: req.body.query.trim(), results });
  } catch (error) { next(error); }
});

module.exports = router;
