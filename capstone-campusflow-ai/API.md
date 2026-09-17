# CampusFlow AI API Contract

Base URL: `http://localhost:4000/api` during local development.

All authenticated endpoints use the HttpOnly session cookie created by `/auth/login`.

## Health

`GET /health`

Returns application/database health and a request ID.

`GET /ready`

Returns readiness for a load balancer or deployment platform.

## Authentication

### Register

`POST /auth/register`

```json
{
  "name": "Rama",
  "email": "rama@example.com",
  "password": "a-strong-password",
  "branch": "CSE",
  "year": 3
}
```

### Login

`POST /auth/login`

```json
{
  "email": "rama@example.com",
  "password": "a-strong-password"
}
```

### Current user

`GET /auth/me`

### Logout

`POST /auth/logout`

## Tasks

`GET /tasks`

`POST /tasks`

```json
{
  "title": "Finish FSD2 project",
  "description": "Complete API integration",
  "priority": "high",
  "status": "todo",
  "dueDate": "2026-10-01T12:00:00.000Z"
}
```

`PUT /tasks/:id`

`DELETE /tasks/:id`

## Announcements

`GET /announcements`

`POST /announcements`

`DELETE /announcements/:id`

## Dashboard

`GET /dashboard/summary`

The response contains status counts, priority counts, upcoming tasks and announcement count generated partly through MongoDB aggregation.

## Courses and enrollment

`GET /courses`

`GET /courses/:id`

`POST /courses` — faculty/admin only

`PUT /courses/:id` — faculty/admin only, with faculty ownership enforcement

`POST /courses/:id/enroll` — student only

`DELETE /courses/:id/enroll` — student only

`GET /courses/:id/roster` — faculty/admin only

## Attendance

`POST /attendance/sessions` — faculty/admin only

`PATCH /attendance/sessions/:id/close` — faculty/admin only

`PUT /attendance/sessions/:id/records` — faculty/admin only

`GET /attendance/courses/:courseId/report` — faculty/admin only

`GET /attendance/me` — student only

## Notifications

`GET /notifications`

`PATCH /notifications/:id/read`

`POST /notifications/read-all`

The optional background worker creates idempotent reminders for active tasks due within 24 hours.

## Campus knowledge / Vector Search

### Ingest one knowledge item

`POST /knowledge/ingest` — faculty/admin only

### Ingest a document

`POST /knowledge/ingest-document` — faculty/admin only

```json
{
  "sourceId": "academic-calendar-2026",
  "title": "Academic Calendar 2026",
  "category": "calendar",
  "url": "https://example.edu/calendar",
  "content": "Approved campus content goes here...",
  "chunkSize": 900,
  "chunkOverlap": 120
}
```

The server normalizes and chunks the document, generates embeddings in one batch, upserts `(sourceId, chunkIndex)` records, and deactivates stale chunks from an updated document. The embedding remains server-side and is not returned by list/search responses.

### Semantic search

`POST /knowledge/search`

```json
{
  "query": "When does the semester begin?",
  "category": "calendar",
  "limit": 5
}
```

Search uses the configured MongoDB Vector Search index and returns relevance scores plus source/chunk metadata.

## AI assistant

`POST /ai/assistant`

```json
{
  "message": "Help me plan my pending work for this week."
}
```

The API retrieves only the signed-in user's task context plus approved campus knowledge and announcement context. The model call happens on the server; the browser never receives the OpenAI secret.

## Error contract

Errors are JSON objects such as:

```json
{
  "message": "Please log in first.",
  "requestId": "..."
}
```

The `requestId` should be included when reporting a production incident.
