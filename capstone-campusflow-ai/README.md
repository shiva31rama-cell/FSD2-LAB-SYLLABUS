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
- React Router, hooks, forms, lists, events and conditional UI
- Server-side OpenAI Responses API integration
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

## FSD2 coverage

| FSD2 topic | CampusFlow implementation |
|---|---|
| Express routing | `/api/auth`, `/api/tasks`, `/api/announcements`, `/api/dashboard`, `/api/ai` |
| HTTP methods | GET, POST, PUT, DELETE REST endpoints |
| Middleware | JSON parser, CORS, sessions, auth, security, rate limits, errors |
| Cookies/sessions/authentication | HttpOnly session cookie + MongoDB session store + bcrypt |
| MongoDB + Mongoose | User, Task and Announcement models |
| REST API | React client consumes Express JSON APIs |
| React JSX/components | Login, Dashboard, Tasks, Announcements, AI Assistant |
| Props/state/events/forms | Controlled forms and state updates |
| Conditional rendering/lists | Auth, loading/error states and mapped records |
| React Router | Application screens |
| Hooks | `useState`, `useEffect` |
| MongoDB CRUD | Tasks and announcements |
| MongoDB aggregation | Dashboard statistics |
| AI integration | Server-side OpenAI Responses API with application context |

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
  |--- Dashboard Aggregation
  |--- AI Assistant
  |
  v
MongoDB / MongoDB Atlas
  |--- users
  |--- tasks
  |--- announcements
  |--- sessions
  |--- future knowledge + embeddings
  |
  +---------------------> OpenAI model layer
```

## AI architecture

The OpenAI API key stays on the server and is loaded from an environment variable. The browser never receives it. The application currently sends the signed-in user's task context plus approved recent announcements to the Responses API. The model name is configurable with `OPENAI_MODEL`.

The next research-grade AI layer is MongoDB Vector Search RAG: ingest approved campus knowledge, chunk and embed it, retrieve authorized context, then generate answers with source references. MongoDB documents Vector Search as a way to combine semantic retrieval with filtering and RAG.

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
```

For Atlas, replace `MONGO_URI` with the Atlas connection string and keep credentials out of Git.

### 3. Seed demo data

```powershell
node capstone-campusflow-ai/server/seed.js
```

Demo login:

```text
Email: demo@campusflow.local
Password: demo1234
```

### 4. Backend

```powershell
npm run capstone:server
```

Check:

```text
http://localhost:4000/api/health
http://localhost:4000/api/ready
```

### 5. Frontend

Open a second terminal:

```powershell
npm run capstone:client
```

Use the Vite URL shown in the terminal, normally `http://localhost:5173`.

### 6. AI

Put a valid OpenAI API key in `server/.env`. Never put it in React source code or commit it to Git. OpenAI's API documentation explicitly treats API keys as secrets that should be loaded server-side.

## Docker local production-like run

From `capstone-campusflow-ai`:

```powershell
docker compose up --build
```

The API is exposed on port 4000 and MongoDB on 27017. Replace the example session secret before using the stack beyond local testing.

## API documentation

See [`API.md`](API.md) for the request/response contract.

## Research documentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — system and AI/RAG architecture
- [`RESEARCH_PROTOCOL.md`](RESEARCH_PROTOCOL.md) — research questions, baselines, metrics and reproducibility
- [`THREAT_MODEL.md`](THREAT_MODEL.md) — security boundaries and AI-specific threats
- [`PRODUCTION_READINESS.md`](PRODUCTION_READINESS.md) — production launch gates

## Important production distinction

This branch is a **full production prototype**, not a claim that a public deployment is already production-ready. A real institutional launch still needs deployment-specific secrets, HTTPS/domain configuration, Atlas backup/restore testing, monitoring, vulnerability scanning, authorization tests, privacy approval and a security review.
