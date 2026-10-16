/**
 * Experiment 11: MongoDB Databases, Collections and Records
 * Run inside mongosh: mongosh < 11-mongodb-databases-collections-records/queries.js
 * Destructive cleanup commands remain commented out.
 */
use college;

// Part A: database and collection commands.
db.createCollection('students');
db.createCollection('courses');
db.faculty.insertOne({ name: 'Dr. Rao', dept: 'CSE' });
db.createCollection('logs', { capped: true, size: 1048576, max: 100 });
show collections;
show dbs;

// Part B: load the handout's eight-student dataset.
// Clear this sample collection only, making reruns repeatable.
db.students.deleteMany({});
db.students.insertMany([
  { rollNo: 101, name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9, city: 'Bhimavaram' },
  { rollNo: 102, name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.4, city: 'Eluru' },
  { rollNo: 103, name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.2, city: 'Tanuku' },
  { rollNo: 104, name: 'Kiran', branch: 'MECH', year: 4, cgpa: 6.8, city: 'Bhimavaram' },
  { rollNo: 105, name: 'Priya', branch: 'ECE', year: 3, cgpa: 8.1, city: 'Narsapur' },
  { rollNo: 106, name: 'Varun', branch: 'CSE', year: 2, cgpa: 7.9, city: 'Eluru' },
  { rollNo: 107, name: 'Divya', branch: 'MECH', year: 3, cgpa: 8.4, city: 'Tanuku' },
  { rollNo: 108, name: 'Harsha', branch: 'CSE', year: 4, cgpa: 8.6, city: 'Bhimavaram' }
]);

// find(), projections and filters.
db.students.find({ branch: 'CSE' }, { name: 1, cgpa: 1, _id: 0 });
db.students.find({ cgpa: { $gt: 8 }, year: 3 }, { name: 1, cgpa: 1, _id: 0 });
db.students.find({ $or: [{ branch: 'ECE' }, { city: 'Tanuku' }] }, { name: 1, branch: 1, city: 1, _id: 0 });
db.students.find({ city: { $in: ['Eluru', 'Tanuku'] } }, { name: 1, city: 1, _id: 0 });
db.students.findOne({ rollNo: 105 }, { name: 1, branch: 1, _id: 0 });
db.students.countDocuments();

// limit(), skip() and sort().
db.students.find({}, { name: 1, cgpa: 1, _id: 0 }).limit(2);
db.students.find({}, { name: 1, cgpa: 1, _id: 0 }).sort({ cgpa: -1 });
db.students.find({}, { name: 1, cgpa: 1, _id: 0 }).sort({ cgpa: -1 }).skip(2).limit(3);

// Indexes and uniqueness.
db.students.createIndex({ name: 1 });
db.students.createIndex({ branch: 1, cgpa: -1 });
db.students.createIndex({ rollNo: 1 }, { unique: true });
db.students.getIndexes().map((index) => index.name);
db.students.find({ branch: 'CSE' }).explain('executionStats').queryPlanner.winningPlan;
// Intentional duplicate-key demonstration; uncomment to run:
// db.students.insertOne({ rollNo: 101, name: 'Duplicate', branch: 'IT', year: 1, cgpa: 5 });

// Aggregation pipeline examples.
db.students.aggregate([
  { $group: { _id: '$branch', total: { $sum: 1 }, avgCgpa: { $avg: '$cgpa' } } },
  { $sort: { avgCgpa: -1 } }
]);
db.students.aggregate([
  { $match: { cgpa: { $gt: 8 } } },
  { $sort: { cgpa: -1 } },
  { $project: { _id: 0, name: 1, branch: 1, cgpa: 1 } }
]);
db.students.aggregate([
  { $group: { _id: '$city', students: { $push: '$name' }, n: { $sum: 1 } } },
  { $sort: { n: -1, _id: 1 } }
]);
db.students.aggregate([{ $match: { cgpa: { $gt: 8 } } }, { $count: 'above8' }]);

// Optional destructive cleanup from the handout; uncomment only when intended:
// db.faculty.drop(); db.logs.drop(); db.courses.drop(); db.students.drop(); db.dropDatabase();
