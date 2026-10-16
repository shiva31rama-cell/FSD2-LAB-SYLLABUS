# Experiment 03 — ExpressJS Cookies, Sessions and Authentication

This experiment follows the official handout and has two independently runnable parts.

## One-time setup

From the repository root:

```bash
npm install
```

Required packages: Express, cookie-parser, express-session, EJS and bcryptjs.

## Part A — Cookies and sessions

Source path: `03-express-cookies-sessions-authentication/app.js`

```bash
node 03-express-cookies-sessions-authentication/app.js
```

Open `http://localhost:3003`.

| Route | Expected behavior |
|---|---|
| `/` | Link page for the demonstrations |
| `/set-cookie` | Sets an HTTP-only username cookie |
| `/get-cookie` | Displays the stored cookie or “No cookie found.” |
| `/visit` | First visit message, then increments the session visit count |
| `/destroy-session` | Destroys the session |

## Part B — Hashed-password authentication

Sources:
- `03-express-cookies-sessions-authentication/auth-app.js`
- `03-express-cookies-sessions-authentication/views/login.ejs`
- `03-express-cookies-sessions-authentication/views/dashboard.ejs`

Run:

```bash
node 03-express-cookies-sessions-authentication/auth-app.js
```

Open `http://localhost:3001/login`.

Classroom demo credentials: `admin` / `password123`. The in-memory demo user stores a bcrypt hash and login compares the submitted password against that hash. The dashboard is protected by `isAuthenticated`; logout destroys the session.

> This is a teaching demo, not production authentication. It uses an in-memory user list and a development session secret. Set SESSION_SECRET in a real deployment and use a persistent session store.

## Learning outcomes

- Read and set cookies.
- Track visit counts with server-side sessions.
- Hash and verify passwords with bcryptjs.
- Protect routes with middleware and destroy sessions on logout.
