/**
 * Experiment 03: ExpressJS Cookies, Sessions and Authentication
 *
 * Demo credentials:
 * Username: student
 * Password: 1234
 *
 * What it demonstrates:
 * - Form-data handling
 * - Cookies
 * - Sessions
 * - Login and logout
 * - Protected profile route
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 3003;

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: 'fsd2-demo-secret',
    resave: false,
    saveUninitialized: false,
  }),
);

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------

// Login page.
app.get('/', (req, res) => {
  res.send(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>FSD2 Authentication Demo</title>
  </head>

  <body
    style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 0 20px;
    "
  >
    <h2>FSD2 Authentication Demo</h2>

    <form method="POST" action="/login">
      <label for="username">
        Username
      </label>

      <br />

      <input
        id="username"
        name="username"
        placeholder="username"
        required
      />

      <br />
      <br />

      <label for="password">
        Password
      </label>

      <br />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        required
      />

      <br />
      <br />

      <button type="submit">
        Login
      </button>
    </form>
  </body>
</html>`,
  );
});

// Authenticate the user.
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validLogin =
    username === 'student' &&
    password === '1234';

  if (!validLogin) {
    return res
      .status(401)
      .send('Invalid username or password');
  }

  // Store the logged-in user in the session.
  req.session.user = username;

  // Store a simple role value in a cookie.
  res.cookie('role', 'student', {
    httpOnly: true,
  });

  return res.redirect('/profile');
});

// Protected profile route.
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .send('Please login first');
  }

  res.send(
    '<h2>Welcome ' +
      req.session.user +
      '</h2>' +
      '<p>Session is active.</p>' +
      '<a href="/logout">Logout</a>',
  );
});

// Destroy the session and log out.
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Logged out');
  });
});

// ------------------------------------------------------------
// Start server
// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT);
});
