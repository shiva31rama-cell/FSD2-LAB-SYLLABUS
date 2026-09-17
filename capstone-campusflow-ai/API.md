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

## AI assistant

`POST /ai/assistant`

```json
{
  "message": "Help me plan my pending work for this week."
}
```

The API retrieves only the signed-in user's task context plus approved recent announcement context. The model call happens on the server; the browser never receives the OpenAI secret.

## Error contract

Errors are JSON objects such as:

```json
{
  "message": "Please log in first.",
  "requestId": "..."
}
```

The `requestId` should be included when reporting a production incident.
