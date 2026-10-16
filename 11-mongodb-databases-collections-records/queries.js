/**
 * Experiment 11: MongoDB Databases, Collections and Records.
 *
 * Run inside mongosh from repository root:
 *   mongosh < 11-mongodb-databases-collections-records/queries.js
 *
 * Uses the official handout's college database and eight-student dataset.
 */
use college;

// Part A — create databases and collections (safe to run repeatedly).
if (!db.getCollectionNames().includes('students')) db.createCollection('students');
if (!db.getCollectionNames().includes('courses')) db.createCollection('courses');
db.faculty.updateOne(
  { name: 'Dr. Rao' },
  { $set: { name: 'Dr. Rao', dept: 'CSE' } },
  { upsert: true }
);
if (!db.getCollectionNames().includes('logs')) {
  db.createCollection('logs', { capped: true, size: 1048576, max: 100 });
}
print('Database: ' + db.getName());
print('Collections:');
show collections;
print('Databases:');
show dbs;

// Part B — load one consistent sample dataset for all queries.
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

print('Student count (expected 8):');
db.students.countDocuments();

// find() with projection and filters.
db.students.find({ branch: 'CSE' }, { name: 1, cgpa: 1, _id: 0 });
db.students.find({ cgpa: { $gt: 8 }, year: 3 }, { name: 1, cgpa: 1, _id: 0 });
db.students.find(
  { $or: [{ branch: 'ECE' }, { city: 'Tanuku' }] },
  { name: 1, branch: 1, city: 1, _id: 0 }
);
db.students.find({ city: { $in: ['Eluru', 'Tanuku'] } }, { name: 1, city: 1, _id: 0 });
db.students.findOne({ rollNo: 105 }, { name: 1, branch: 1, _id: 0 });

// limit(), skip() and sort().
db.students.find({}, { name: 1, _id: 0 }).limit(3);
db.students.find({}, { name: 1, _id: 0 }).skip(3).limit(3);
db.students.find({}, { name: 1, cgpa: 1, _id: 0 }).sort({ cgpa: -1 });
db.students.find({}, { name: 1, branch: 1, cgpa: 1, _id: 0 }).sort({ branch: 1, cgpa: -1 });

// Indexes, including uniqueness.
db.students.createIndex({ name: 1 });
db.students.createIndex({ branch: 1, cgpa: -1 });
db.students.createIndex({ rollNo: 1 }, { unique: true });
print('Index names:');
db.students.getIndexes().map((index) => index.name);
print('Winning query plan:');
db.students.find({ branch: 'CSE' }).explain('executionStats').queryPlanner.winningPlan;
// This intentionally returns E11000; uncomment only when testing a duplicate-key error:
// db.students.insertOne({ rollNo: 101, name: 'Duplicate', branch: 'IT', year: 1, cgpa: 5 });

// Aggregation: average CGPA per branch.
db.students.aggregate([
  { $group: { _id: '$branch', total: { $sum: 1 }, avgCgpa: { $avg: '$cgpa' } } },
  { $sort: { avgCgpa: -1 } }
]);

// Filter first, then calculate maximum CGPA per branch for third-year students.
db.students.aggregate([
  { $match: { year: 3 } },
  { $group: { _id: '$branch', count: { $sum: 1 }, maxCgpa: { $max: '$cgpa' } } },
  { $sort: { _id: 1 } }
]);

// Top three students with CGPA >= 8.5.
db.students.aggregate([
  { $match: { cgpa: { $gte: 8.5 } } },
  { $project: { _id: 0, name: 1, branch: 1, cgpa: 1 } },
  { $sort: { cgpa: -1 } },
  { $limit: 3 }
]);

// Group student names by city.
db.students.aggregate([
  { $group: { _id: '$city', students: { $push: '$name' }, n: { $sum: 1 } } },
  { $sort: { n: -1, _id: 1 } }
]);

// Count students whose CGPA is above 8; expected result is { above8: 5 }.
db.students.aggregate([
  { $match: { cgpa: { $gt: 8 } } },
  { $count: 'above8' }
]);

// Destructive cleanup from the handout — deliberately commented out.
// Verify db.getName() before manually executing any drop command:
// db.faculty.drop();
// db.logs.drop();
// db.courses.drop();
// db.students.drop();
// db.dropDatabase();
