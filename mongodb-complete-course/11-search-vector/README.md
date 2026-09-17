# MongoDB Search and Vector Search

This module connects MongoDB learning with modern AI applications.

## MongoDB Search

Use Atlas Search when an application needs richer text search than a simple equality filter. Learn:

- Search indexes
- Field mappings
- Text/autocomplete search
- Filters and facets
- Relevance scoring

Typical architecture:

```text
React search box
      ↓
Express API
      ↓
MongoDB aggregation pipeline
      ↓
MongoDB Search index
      ↓
ranked documents
```

## Vector Search

Vector Search stores or queries embeddings so semantically similar content can be retrieved. A common AI retrieval workflow is:

```text
Document
  ↓
chunk text
  ↓
embedding model
  ↓
vector stored in MongoDB
  ↓
Vector Search index
  ↓
retrieve relevant chunks
  ↓
send retrieved context to an AI model
```

The capstone can evolve its AI assistant into this Retrieval-Augmented Generation (RAG) architecture after the basic CRUD + AI workflow is understood.

## Learning exercise

Create a `knowledge` collection with:

```js
{
  title: 'MongoDB Aggregation',
  text: 'Aggregation processes documents through pipeline stages.',
  embedding: [/* generated embedding values */],
  tags: ['mongodb', 'aggregation']
}
```

Then create an appropriate Atlas Vector Search index and query it with `$vectorSearch` according to the current Atlas documentation and your embedding model's dimensions.

Do not hard-code fake embedding dimensions into production configuration; the vector index must match the embedding model you actually use.

Official references:
- https://www.mongodb.com/docs/atlas/atlas-search/
- https://www.mongodb.com/docs/atlas/atlas-vector-search/
