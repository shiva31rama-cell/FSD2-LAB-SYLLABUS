const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, branch: user.branch, year: user.year, role: user.role };
}

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, branch, year } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters.' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email is already registered.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash, branch, year });
    req.session.userId = user._id.toString();
    res.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    req.session.userId = user._id.toString();
    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Not logged in.' });
    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Session user no longer exists.' });
    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out.' });
  });
});

module.exports = router;
