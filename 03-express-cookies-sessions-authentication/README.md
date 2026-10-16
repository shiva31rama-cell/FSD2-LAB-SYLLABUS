# Experiment 03 — ExpressJS Cookies, Sessions and Authentication

The uploaded handout defines two programs; they are separate, so run only the requested part.

## Part (a): Session management using cookies and sessions

**Files needed: 1** — `03-express-cookies-sessions-authentication/app.js`.

```bash
node 03-express-cookies-sessions-authentication/app.js
```

Open `http://localhost:3003/`. Try the Set cookie and Read cookie links. Open `/visit` repeatedly to see the session counter increase; open `/destroy-session` to clear it.

Routes: `/set-cookie`, `/get-cookie`, `/visit`, `/destroy-session`.

## Part (b): Authentication with a hashed password

**Files needed: 3**

```text
03-express-cookies-sessions-authentication/
├── auth-app.js
└── views/
    ├── login.ejs
    └── dashboard.ejs
```

Run:

```bash
node 03-express-cookies-sessions-authentication/auth-app.js
```

Open `http://localhost:3001/login`.

Classroom test credentials: `admin` / `password123`. Successful login redirects to the protected dashboard. Incorrect credentials show an error; Logout destroys the session. The password is checked with bcryptjs against a hash.

> Classroom only: the user list is in memory and the session secret is a development default. Do not reuse these settings in production.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for the exact file/path method and Linux troubleshooting.
