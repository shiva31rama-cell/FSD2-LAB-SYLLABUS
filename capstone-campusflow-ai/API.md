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

`POST /knowledge/ingest` — faculty/admin only

`POST /knowledge/ingest-document` — faculty/admin only

```json
{
  "sourceId": "academic-calendar-2026",
  "title": "Academic Calendar 2026",
  "category": "calendar",
  "content": "Approved campus content goes here...",
  "chunkSize": 900,
  "chunkOverlap": 120
}
```

The document endpoint normalizes and chunks content, generates embeddings in one batch, upserts `(sourceId, chunkIndex)` records, and deactivates stale chunks from an updated document.

`POST /knowledge/search`

```json
{
  "query": "When does the semester begin?",
  "category": "calendar",
  "limit": 5
}
```

## AI assistant

`POST /ai/assistant`

The assistant retrieves signed-in user task context plus approved campus knowledge and announcement context. Model execution happens on the server; the browser never receives the OpenAI secret.

## Controlled AI actions

AI actions **never execute directly from model output**. The client must explicitly request a proposal, show the preview to the user, and then submit the short-lived confirmation token.

### Propose

`POST /ai/actions/propose`

```json
{
  "actionType": "complete_task",
  "payload": { "taskId": "<owned-task-id>" }
}
```

Supported actions: `create_task`, `complete_task`, `update_task`.

The response contains a human-readable `preview`, a one-time `confirmationToken`, and a five-minute expiry.

### Confirm

`POST /ai/actions/confirm`

```json
{
  "confirmationToken": "<one-time-token>"
}
```

The server re-validates the signed-in user, token state, expiry, target ownership and current task state before applying the action. The token becomes unusable after confirmation.

### Cancel

`POST /ai/actions/cancel`

```json
{
  "confirmationToken": "<one-time-token>"
}
```

All proposal, confirmation and cancellation events are audit logged.

## Authenticated Atlas integration test

`server/tests/atlas.integration.test.js` starts the real Express application against the configured MongoDB URI and exercises registration, session authentication, task creation, AI proposal, pre-confirmation non-execution, confirmation, replay rejection, cancellation and cleanup.

Run it only against a dedicated test database/cluster:

```powershell
$env:MONGO_URI="<dedicated-test-atlas-uri>"
$env:SESSION_SECRET="<32+ character test secret>"
$env:RUN_ATLAS_INTEGRATION="true"
node --test capstone-campusflow-ai/server/tests/atlas.integration.test.js
```

Do not use production data for the integration suite.

## Error contract

Errors are JSON objects such as:

```json
{
  "message": "Please log in first.",
  "requestId": "..."
}
```

The `requestId` should be included when reporting a production incident.
