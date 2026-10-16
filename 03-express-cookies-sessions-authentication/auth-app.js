/**
 * Experiment 03(b): Session-based authentication with bcrypt password hashing.
 * Demo: admin / password123
 * Run from the repository root:
 *   node 03-express-cookies-sessions-authentication/auth-app.js
 * Open: http://localhost:3001/login
 */
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fsd2-auth-classroom-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' },
}));

// Simulated in-memory user database. Password is stored as a hash, not plaintext.
const users = [
  { username: 'admin', password: bcrypt.hashSync('password123', 10) },
];

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  return res.redirect('/login');
}

app.get('/', (_req, res) => res.redirect('/login'));
app.get('/login', (_req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = users.find((item) => item.username === username);
    if (!user) return res.status(401).render('login', { error: 'User not found.' });
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return res.status(401).render('login', { error: 'Incorrect password.' });
    req.session.user = user.username;
    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { username: req.session.user });
});

app.get('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    return res.redirect('/login');
  });
});

app.listen(PORT, () => console.log(`Authentication demo: http://localhost:${PORT}/login`));
