const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const PORT = 3003;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Reads cookies from the request.
app.use(session({
  secret: 'fsd2-demo-secret',
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  res.send(`<h2>FSD2 Authentication Demo</h2>
    <form method="post" action="/login">
      <input name="username" placeholder="username"><br>
      <input name="password" type="password" placeholder="password"><br>
      <button>Login</button>
    </form>`);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'student' && password === '1234') {
    req.session.user = username; // Store logged-in user in the session.
    res.cookie('role', 'student', { httpOnly: true }); // Store a simple cookie.
    return res.redirect('/profile');
  }
  res.status(401).send('Invalid username or password');
});

app.get('/profile', (req, res) => {
  if (!req.session.user) return res.status(401).send('Please login first');
  res.send(`Welcome ${req.session.user}. Session is active. <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.send('Logged out'));
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
