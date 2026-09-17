// Run with: node mongodb-complete-course/09-mongoose/index.js
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsd2course';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

studentSchema.methods.summary = function () {
  return `${this.name} knows ${this.skills.join(', ') || 'no skills yet'}.`;
};

const Student = mongoose.model('CourseStudent', studentSchema);

async function main() {
  await mongoose.connect(uri);
  await Student.deleteMany({ email: 'mongoose@example.com' });

  const student = await Student.create({
    name: 'Mongoose Learner',
    email: 'mongoose@example.com',
    skills: ['CRUD', 'Aggregation', 'Mongoose']
  });

  console.log(student.summary());
  console.log(await Student.find({ skills: 'Aggregation' }).lean());
  await mongoose.disconnect();
}

main().catch(error => { console.error(error); process.exitCode = 1; });
