/**
 * Experiment 03(a): Cookie and session management.
 *
 * Run: node 03-express-cookies-sessions-authentication/app.js
 * Open: http://localhost:3003
 *
 * Try /set-cookie, /get-cookie, /visit and /destroy-session.
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = 3003;

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fsd2-classroom-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60_000 },
}));

app.get('/', (_req, res) => {
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Cookies and Sessions</title></head>
<body style="font-family:Arial,sans-serif;max-width:650px;margin:40px auto">
  <h1>Experiment 3(a): Cookies and Sessions</h1>
  <ul>
    <li><a href="/set-cookie">Set cookie</a></li>
    <li><a href="/get-cookie">Read cookie</a></li>
    <li><a href="/visit">Visit counter</a></li>
    <li><a href="/destroy-session">Destroy session</a></li>
  </ul>
  <p>Try the links more than once to observe the difference between cookies and sessions.</p>
</body></html>`);
});

app.get('/set-cookie', (_req, res) => {
  res.cookie('username', 'GuestUser', { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'lax' });
  res.send('Cookie has been set! <a href="/get-cookie">Check cookie</a>');
});

app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(username ? `Cookie value: ${username}` : 'No cookie found.');
});

app.get('/visit', (req, res) => {
  if (req.session.views) {
    req.session.views += 1;
    return res.send(`You have visited this page ${req.session.views} times.`);
  }
  req.session.views = 1;
  return res.send('Welcome! This is your first visit.');
});

app.get('/destroy-session', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    res.send('Session destroyed. <a href="/visit">Visit again</a>');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
