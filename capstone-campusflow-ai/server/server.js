require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const crypto = require('crypto');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const announcementRoutes = require('./routes/announcements');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/ai');
const { securityHeaders, apiLimiter, authLimiter, aiLimiter } = require('./middleware/security');

const app = express();
const PORT = Number(process.env.PORT || 4000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusflow';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) {
  throw new Error('SESSION_SECRET must be at least 32 characters in production.');
}

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(securityHeaders);
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use((req, res, next) => {
  const requestId = req.get('x-request-id') || crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'development-only-change-this-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24
  }),
  cookie: {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/api/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    ok: databaseConnected,
    app: 'CampusFlow AI',
    version: '1.0.0',
    database: databaseConnected ? 'connected' : 'disconnected',
    requestId: req.requestId
  });
});

app.get('/api/ready', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ ready, requestId: req.requestId });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.', requestId: req.requestId });
});

app.use((err, req, res, next) => {
  console.error(JSON.stringify({
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    error: err.message,
    stack: isProduction ? undefined : err.stack
  }));

  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? 'Internal server error.' : err.message,
    requestId: req.requestId
  });
});

async function start() {
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 20)
  });

  console.log('MongoDB connected:', MONGO_URI.replace(/:\/\/.*?:.*?@/, '://***:***@'));
  const server = app.listen(PORT, () => console.log(`CampusFlow API running on port ${PORT}`));

  const shutdown = async signal => {
    console.log(`${signal}: shutting down gracefully...`);
    server.close(async () => {
      await mongoose.connection.close(false);
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

if (require.main === module) {
  start().catch(error => {
    console.error('Startup failed:', error.message);
    process.exit(1);
  });
}

module.exports = { app, start };
