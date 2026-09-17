# CampusFlow AI — FSD2 Capstone Project

A real-world student productivity and campus information SaaS-style application built directly from the R-23 FSD2 lab pathway.

## Why this project fits the syllabus

| FSD2 topic | CampusFlow implementation |
|---|---|
| Express routing | `/api/auth`, `/api/tasks`, `/api/announcements`, `/api/dashboard`, `/api/ai` |
| HTTP methods | GET, POST, PUT, DELETE REST endpoints |
| Middleware | JSON parser, CORS, session middleware, auth middleware, error middleware |
| Cookies/sessions/authentication | Express session cookie + MongoDB-backed session store + bcrypt password hashing |
| MongoDB + Mongoose | User, Task and Announcement schemas/models |
| REST API | React client consumes Express JSON APIs |
| React JSX/components | Login, Dashboard, Tasks, Announcements, AI Assistant components |
| Props/state/events/forms | Controlled forms, state updates and event handlers |
| Conditional rendering/lists | Login state, loading/error states and mapped task/announcement lists |
| React Router | Dashboard, Tasks, Announcements and AI Assistant routes |
| Hooks | `useState` and `useEffect` |
| MongoDB CRUD | Task and announcement create/read/update/delete flows |
| MongoDB aggregation | Dashboard status and priority statistics |
| AI integration | Server-side OpenAI Responses API with MongoDB task/announcement context |

## Features

- Student registration and login
- Secure password hashing with bcrypt
- MongoDB-backed Express sessions
- Task CRUD with priority, status and due date
- Text-searchable task model and useful indexes
- Campus announcements
- MongoDB aggregation dashboard
- AI productivity assistant that uses the logged-in student's application context
- Responsive React interface
- Demo seed data

## Architecture

```text
React + Vite (5173)
        |
        | fetch + session cookie
        v
Express API (4000)
  |       |        |
  |       |        +--> OpenAI Responses API (optional)
  |       v
  |   Mongoose models
  v
MongoDB / MongoDB Atlas
  |- users
  |- tasks
  |- announcements
  |- sessions
```

The OpenAI key is kept on the server. Do not put it in React source code or commit it to Git.

## Run it in VS Code

### 1. Install dependencies once from repository root

```powershell
npm install
```

### 2. Create server environment file

Copy `server/.env.example` to `server/.env` and set `MONGO_URI`.

Local MongoDB example:

```text
MONGO_URI=mongodb://127.0.0.1:27017/campusflow
```

Atlas example:

```text
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

For Atlas, configure the database user and network access in Atlas and keep the password out of Git.

### 3. Optional demo data

```powershell
node capstone-campusflow-ai/server/seed.js
```

Demo login:

```text
Email: demo@campusflow.local
Password: demo1234
```

### 4. Start backend terminal

```powershell
npm run capstone:server
```

Expected API:

`http://localhost:4000/api/health`

### 5. Start frontend in a second VS Code terminal

```powershell
npm run capstone:client
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### 6. Enable AI

Set `OPENAI_API_KEY` in `server/.env`. The React app calls `/api/ai/assistant`; the browser never receives the API key.

The current OpenAI JavaScript SDK uses the Responses API through `client.responses.create(...)`. The exact model is configurable with `OPENAI_MODEL` so the project can follow the models available to your API account.

## API map

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/announcements`
- `POST /api/announcements`
- `DELETE /api/announcements/:id`
- `GET /api/dashboard/summary`
- `POST /api/ai/assistant`
- `GET /api/health`

## What to demonstrate in a viva

1. Register/login creates an authenticated session.
2. Session data is persisted in MongoDB through `connect-mongo`.
3. Create a task → MongoDB document appears in `tasks`.
4. Change task status → PUT request updates the document.
5. Dashboard → aggregation pipeline calculates counts.
6. Announcement → document is stored and displayed through a populated author reference.
7. AI Assistant → Express fetches MongoDB context and sends it to the AI model from the server.
8. Explain why secrets belong in environment variables, not frontend code.

## Important production upgrades

This is a complete educational capstone baseline. Before production deployment, add rate limiting, CSRF protection appropriate to the chosen cookie strategy, stricter role-based authorization, schema validation at every boundary, centralized logging, HTTPS-only cookies, secret management, automated tests, monitoring and a production-grade session/backup strategy.
