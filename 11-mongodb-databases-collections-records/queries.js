// Database and collection operations.
use fsd2records;
db.createCollection('students');

db.students.insertMany([
  { name: 'Rama', marks: 88, branch: 'CSE' },
  { name: 'Gandhi', marks: 76, branch: 'CSE' },
  { name: 'Roshni', marks: 92, branch: 'ECE' },
  { name: 'Kiran', marks: 81, branch: 'CSE' }
]);

// FIND records.
db.students.find();

// LIMIT records.
db.students.find().limit(2);

// SORT by marks, descending.
db.students.find().sort({ marks: -1 });

// INDEX for faster lookup.
db.students.createIndex({ branch: 1 });

// AGGREGATE: average marks by branch.
db.students.aggregate([
  { $group: { _id: '$branch', averageMarks: { $avg: '$marks' }, count: { $sum: 1 } } },
  { $sort: { averageMarks: -1 } }
]);

// To drop the collection when practising: db.students.drop();
// To drop the database when practising: db.dropDatabase();
