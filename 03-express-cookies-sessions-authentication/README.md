# Experiment 03 — Cookies, Sessions and Authentication

## What is this?

This experiment demonstrates a simple login system using ExpressJS sessions and cookies.

## What can it do?

- Display a login form.
- Check demo username and password.
- Store the logged-in user in a session.
- Store a role value in a cookie.
- Protect the profile route.
- Destroy the session during logout.

## Demo login

```text
Username: student
Password: 1234
```

## Main concepts

| Concept | Purpose |
| --- | --- |
| Cookie | Stores small client-side values |
| Session | Stores server-side login state |
| Authentication | Checks user credentials |
| Protected route | Allows access only after login |
| Logout | Destroys the active session |

## Run

```bash
node 03-express-cookies-sessions-authentication/app.js
```

Open:

```text
http://localhost:3003
```

## Basic flow

Login form
→ POST /login
→ Validate credentials
→ Create session
→ Redirect to /profile
→ Logout destroys session

> This is a classroom demonstration. The hard-coded credentials and session secret are intentionally simple for learning.
