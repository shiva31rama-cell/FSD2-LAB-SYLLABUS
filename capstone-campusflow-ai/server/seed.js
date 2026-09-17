require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');
const Announcement = require('./models/Announcement');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusflow';

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({ email: 'demo@campusflow.local' });
  const passwordHash = await bcrypt.hash('demo1234', 12);
  const user = await User.create({ name: 'Demo Student', email: 'demo@campusflow.local', passwordHash, branch: 'CSE', year: 3 });

  await Task.deleteMany({ user: user._id });
  await Task.insertMany([
    { user: user._id, title: 'Complete MongoDB aggregation lab', priority: 'high', status: 'in-progress', dueDate: new Date(Date.now() + 86400000) },
    { user: user._id, title: 'Prepare CN notes', priority: 'medium', status: 'todo', dueDate: new Date(Date.now() + 3 * 86400000) },
    { user: user._id, title: 'Submit FSD2 project', priority: 'high', status: 'todo', dueDate: new Date(Date.now() + 5 * 86400000) }
  ]);

  await Announcement.deleteMany({ title: 'CampusFlow demo announcement' });
  await Announcement.create({ title: 'CampusFlow demo announcement', body: 'This is sample data created by the seed script.', category: 'general', author: user._id });

  console.log('Seed complete. Login with demo@campusflow.local / demo1234');
  await mongoose.disconnect();
}

seed().catch(error => { console.error(error); process.exitCode = 1; });
