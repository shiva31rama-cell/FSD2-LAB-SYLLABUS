# CampusFlow AI — FSD2 Capstone / Production Prototype

CampusFlow AI is the capstone application for the R-23 FSD2 syllabus: a real-world campus productivity SaaS prototype combining React, Express, MongoDB/Mongoose, sessions, REST APIs, analytics and a server-side AI assistant.

> **Research-grade direction:** this repository is structured so the software can support a serious experimental study. Calling it a PhD contribution would require a novel research question, reproducible experiments, baselines and evidence; the software itself is the prototype platform.

## Core capabilities

- Student/faculty/admin role field in the identity model
- Registration, login, logout and authenticated sessions
- bcrypt password hashing
- MongoDB-backed session storage
- Task CRUD with status, priority and due dates
- Campus announcements
- Dashboard analytics using MongoDB aggregation
- Course, enrollment and attendance workflows
- Persistent notifications with idempotent task-due worker
- Campus document chunking and batched embedding ingestion
- MongoDB Vector Search retrieval with source/chunk references
- Grounded server-side AI assistant
- Explicit-confirmation AI task actions; AI output cannot directly mutate tasks
- One-time, five-minute action confirmation tokens
- Audit logging for AI proposals, confirmations and cancellations
- Request correlation IDs
- Helmet security headers
- API, authentication and AI rate limits
- bounded JSON request bodies
- CORS allow-list
- health and readiness endpoints
- graceful shutdown
- centralized 404/error responses
- Docker production-like API image and local Compose stack
- CI syntax validation and React production build
- Optional authenticated end-to-end test suite against a dedicated Atlas test database

## FSD2 coverage

| FSD2 topic | CampusFlow implementation |
|---|---|
| Express routing | `/api/auth`, `/api/tasks`, `/api/announcements`, `/api/dashboard`, `/api/ai`, `/api/courses`, `/api/attendance` |
| HTTP methods | GET, POST, PUT, PATCH, DELETE REST endpoints |
| Middleware | JSON parser, CORS, sessions, auth, security, rate limits, errors |
| Cookies/sessions/authentication | HttpOnly session cookie + MongoDB session store + bcrypt |
| MongoDB + Mongoose | User, Task, Announcement, Course, Enrollment, Attendance, Knowledge and AI action models |
| REST API | React client consumes Express JSON APIs |
| React JSX/components | Login, Dashboard, Tasks, Announcements, AI Assistant |
| Props/state/events/forms | Controlled forms and state updates |
| Conditional rendering/lists | Auth, loading/error states and mapped records |
| React Router | Application screens |
| Hooks | `useState`, `useEffect` |
| MongoDB CRUD | Tasks, announcements, courses and attendance |
| MongoDB aggregation | Dashboard and attendance statistics |
| AI integration | Server-side OpenAI Responses API + MongoDB Vector Search RAG |

## Architecture

```text
Browser
  |
  | HTTPS + HttpOnly session cookie
  v
React + Vite
  |
  | REST/JSON
  v
Express API
  |--- Auth / Sessions
  |--- Tasks / Announcements
  |--- Courses / Enrollment / Attendance
  |--- Dashboard Aggregation
  |--- Knowledge Ingestion / Vector Search
  |--- AI Assistant / Explicit Actions
  |
  v
MongoDB / MongoDB Atlas
  |--- users
  |--- tasks
  |--- announcements
  |--- courses / enrollments
  |--- attendance sessions / records
  |--- knowledgechunks + embeddings
  |--- aiactions
  |--- auditlogs / notifications / sessions
  |
  +---------------------> OpenAI model + embedding layer
```

## AI safety architecture

The assistant is split into two different capabilities:

1. **Answering:** the model receives authorized application context and retrieved campus knowledge. It can explain and plan, but does not receive a database write tool.
2. **Actions:** an action must first be proposed by the authenticated user flow. CampusFlow validates ownership and fields, creates a short-lived confirmation token, and returns a human-readable preview. Only a separate confirmation request can execute the action. Tokens are one-time and all state changes are audit logged.

Supported controlled actions are `create_task`, `complete_task`, and `update_task`.

## Local VS Code run

### 1. Install

```powershell
npm install
```

### 2. Environment

Copy `capstone-campusflow-ai/server/.env.example` to `capstone-campusflow-ai/server/.env`.

For local MongoDB:

```text
MONGO_URI=mongodb://127.0.0.1:27017/campusflow
SESSION_SECRET=replace-with-a-long-random-development-secret
CLIENT_URL=http://localhost:5173
PORT=4000
NODE_ENV=development
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
MONGODB_VECTOR_INDEX=campusflow_vector_index
```

For Atlas, replace `MONGO_URI` with the Atlas connection string and keep credentials out of Git.

### 3. Backend

```powershell
npm run capstone:server
```

Check `http://localhost:4000/api/health` and `http://localhost:4000/api/ready`.

### 4. Frontend

Open a second terminal:

```powershell
npm run capstone:client
```

Use the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Authenticated Atlas end-to-end testing

Use a **dedicated test database/cluster**, not institutional production data. The integration test starts the real Express application, connects it to Atlas, registers a test student, verifies the authenticated session, creates a task, proposes an AI action, verifies that no mutation occurred before confirmation, confirms it, verifies one-time replay rejection, tests cancellation, verifies cancelled actions do not execute, checks audit events, and cleans up its test records.

```powershell
$env:MONGO_URI="<dedicated-test-atlas-uri>"
$env:SESSION_SECRET="<32+ character test secret>"
$env:RUN_ATLAS_INTEGRATION="true"
node --test capstone-campusflow-ai/server/tests/atlas.integration.test.js
```

CI runs this suite automatically when the repository has `CAMPUSFLOW_TEST_MONGO_URI` and `CAMPUSFLOW_TEST_SESSION_SECRET` secrets configured.

## Research boundary

The implementation provides the platform and instrumentation needed for later experiments. It does **not** claim benchmark improvements, user-study results, or a research contribution until those are actually measured and documented.

This branch is a **production-level prototype**, not a claim that a public institutional deployment is already production-ready. A real launch still needs deployment-specific secrets, HTTPS/domain configuration, Atlas backup/restore testing, monitoring, vulnerability scanning, authorization tests, privacy approval and security review.
