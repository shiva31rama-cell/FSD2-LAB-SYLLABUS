# CampusFlow AI — Build Phase 2

This phase moves the capstone from a basic production prototype toward a deployable research platform.

## Implemented

- Role-aware authentication middleware (`student`, `faculty`, `admin`).
- Server-side user lookup on every authenticated request.
- Faculty/admin authorization for campus announcements.
- Admin user-role management API.
- Admin audit-log API with request correlation IDs.
- Immutable-style append-only audit records for security-sensitive mutations.
- Strict API field allow-lists for task create/update operations.
- Shared input-validation middleware.
- Persistent notification model and read/read-all API.
- Campus knowledge model for retrieval-augmented generation.
- OpenAI embedding ingestion for approved faculty/admin knowledge sources.
- MongoDB Vector Search retrieval endpoint.
- AI assistant grounding against retrieved campus knowledge plus the signed-in user's tasks and recent announcements.
- AI source references returned to the client.
- Unit tests and CI execution for validation utilities.
- Atlas Vector Search index definition template.

## Important deployment boundary

The repository contains implementation and configuration templates, not real credentials or a claimed public deployment. Production operation still requires a properly secured MongoDB Atlas deployment, Vector Search index, OpenAI server-side credentials, HTTPS, domain configuration, backup/restore policy, monitoring, and an approved operational process for faculty/admin knowledge ingestion.

## Next implementation phase

1. Expand test coverage to authenticated integration tests.
2. Add attendance/course/enrollment domain models and faculty workflows.
3. Add notification scheduling and idempotent background jobs.
4. Add document ingestion/chunking for larger source files.
5. Add AI structured actions with explicit confirmation boundaries.
6. Add observability metrics and error tracking.
7. Add research evaluation datasets and automated retrieval/grounding metrics.
8. Perform security, load, accessibility and failure-mode testing.
9. Only after implementation stabilizes: produce the final technical documentation, reproducibility package and research paper based on measured results.
