# CampusFlow AI — Phase 4 Implementation

Phase 4 moves campus knowledge retrieval from single-record embedding into a repeatable document-ingestion pipeline.

## Implemented

### 1. Deterministic text normalization and chunking
- Added `server/services/chunkText.js`.
- Normalizes repeated whitespace while preserving paragraph boundaries.
- Splits long documents into bounded chunks with configurable overlap.
- Prefers paragraph/sentence boundaries when possible.
- Defaults to 900-character chunks with 120-character overlap.

### 2. Chunk-aware knowledge model
- Added `chunkIndex` to `KnowledgeChunk`.
- Added a unique `(sourceId, chunkIndex)` constraint so re-ingestion is idempotent.
- Existing single-item ingestion remains supported as chunk `0`.

### 3. Batched document embedding
- Added `POST /api/knowledge/ingest-document` for faculty/admin users.
- A document is chunked before embedding.
- Embeddings are requested in one batch rather than one API request per chunk.
- Chunks are upserted by `(sourceId, chunkIndex)`.
- Chunks left over from an older, longer version are marked inactive.
- Audit events record document ingestion metadata without storing secrets.

### 4. Vector Search compatibility
- The existing `campusflow_vector_index` targets the dedicated `embedding` field with 1536 dimensions and cosine similarity.
- Semantic search exposes `chunkIndex` so retrieved evidence can identify the exact chunk.

### 5. Verification
- Added unit tests for normalization and chunk boundaries.
- CI syntax-checks the new chunking service and runs the existing Node test suite.

## API

`POST /api/knowledge/ingest-document`

Required fields: `sourceId`, `title`, `content`.

Optional fields: `category`, `url`, `metadata`, `chunkSize`, `chunkOverlap`.

## Atlas verification boundary

The CampusFlow Atlas cluster is available to the connected Atlas integration. The `campusflow` database contains the application collections, and the `campusflow_vector_index` is READY/queryable. Application runtime credentials remain environment secrets and are not committed to GitHub.

No benchmark or research result is claimed by this phase. Evaluation will use measured datasets and reproducible experiments in a later phase.
