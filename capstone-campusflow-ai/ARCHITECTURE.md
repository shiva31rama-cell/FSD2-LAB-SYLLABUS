# CampusFlow AI — Research-Grade Production Prototype Architecture

## 1. Product boundary

CampusFlow AI is a multi-role campus productivity platform for students, faculty and administrators. The prototype combines task management, campus announcements, analytics, authentication and an AI assistant grounded in application data.

## 2. Runtime architecture

```text
Browser / Mobile Web
        |
        | HTTPS + HttpOnly session cookie
        v
React + Vite
        |
        | REST/JSON
        v
Express API
  |       |       |       |
 Auth    Tasks  Campus   AI
  |       |       |       |
  +-------+-------+-------+
                  |
               Mongoose
                  |
            MongoDB / Atlas
             |     |     |
          CRUD  Aggregation  Search
                            |
                     Vector Search / RAG
                            |
                       AI model layer
```

## 3. Core bounded domains

- **Identity:** users, roles, sessions and account lifecycle.
- **Productivity:** tasks, priorities, status, due dates and analytics.
- **Campus knowledge:** announcements and future knowledge documents.
- **AI:** contextual assistant, retrieval and future tool-calling workflows.
- **Observability:** request IDs, health/readiness checks and structured server errors.

## 4. Production principles

1. The browser never receives the AI API key.
2. Session state is stored in MongoDB, not process memory.
3. Production cookies are Secure + HttpOnly and use a deliberate SameSite policy.
4. API, authentication and AI endpoints have rate limits.
5. HTTP security headers are enabled through Helmet.
6. Database access uses connection pooling and bounded request payloads.
7. Health and readiness endpoints are separate so a load balancer can distinguish a live process from a database-ready process.
8. Graceful shutdown closes the HTTP server and MongoDB connection.
9. Every request receives a correlation ID for diagnostics.
10. Secrets are environment variables or a deployment secret manager; never Git.

## 5. AI/RAG evolution

Phase A — contextual assistant:
- retrieve the signed-in user's tasks;
- retrieve recent campus announcements;
- send only the required context to the server-side AI call.

Phase B — knowledge ingestion:
- upload approved campus documents;
- extract text;
- chunk documents;
- store metadata and embeddings in MongoDB;
- version every source document.

Phase C — retrieval-augmented generation:
- create a query embedding;
- retrieve relevant documents with MongoDB Vector Search;
- filter by tenant, visibility and document status;
- pass citations/context to the AI model;
- return answer plus source references.

Phase D — controlled agents:
- define explicit server-side tools such as `createTask`, `searchAnnouncements` and `summarizeSchedule`;
- validate tool arguments;
- authorize every tool call;
- log tool usage;
- require user confirmation for consequential actions.

MongoDB documents that Vector Search can support semantic search, hybrid search and RAG, while production deployments should be sized separately from a free testing cluster. See the MongoDB Vector Search and RAG documentation in the project research notes.

## 6. Research extension

The implementation can support a publishable evaluation around:

- task-planning quality;
- retrieval precision/recall;
- hallucination rate on campus-specific questions;
- response latency;
- AI cost per successful task plan;
- user task-completion rate;
- usability and accessibility;
- security and privacy controls.

The research protocol must define the population, consent process, metrics, baselines, statistical method and limitations before collecting human-subject data.
