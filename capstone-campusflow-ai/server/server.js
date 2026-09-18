const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const mongoose = require('mongoose');
const crypto = require('crypto');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const announcementRoutes = require('./routes/announcements');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/ai');
const aiActionRoutes = require('./routes/aiActions');
const adminRoutes = require('./routes/admin');
const notificationRoutes = require('./routes/notifications');
const knowledgeRoutes = require('./routes/knowledge');
const courseRoutes = require('./routes/courses');
const attendanceRoutes = require('./routes/attendance');
const { startNotificationWorker, stopNotificationWorker } = require('./services/notificationWorker');
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
