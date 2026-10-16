/**
 * Experiment 11: MongoDB Databases, Collections and Records.
 *
 * Run from repository root:
 *   mongosh --file 11-mongodb-databases-collections-records/queries.js
 * For Atlas:
 *   mongosh "YOUR_ATLAS_URI" --file 11-mongodb-databases-collections-records/queries.js
 *
 * Uses the official handout's college database and eight-student dataset.
 */
db = db.getSiblingDB('college');

print('PART A: database is ' + db.getName());
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
print('Collections:');
printjson(db.getCollectionNames());

// Part B: clear and reload only the sample students, to make reruns predictable.
db.students.deleteMany({});
print('Insert the eight handout records:');
printjson(db.students.insertMany([
  { rollNo: 101, name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9, city: 'Bhimavaram' },
  { rollNo: 102, name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.4, city: 'Eluru' },
  { rollNo: 103, name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.2, city: 'Tanuku' },
  { rollNo: 104, name: 'Kiran', branch: 'MECH', year: 4, cgpa: 6.8, city: 'Bhimavaram' },
  { rollNo: 105, name: 'Priya', branch: 'ECE', year: 3, cgpa: 8.1, city: 'Narsapur' },
  { rollNo: 106, name: 'Varun', branch: 'CSE', year: 2, cgpa: 7.9, city: 'Eluru' },
  { rollNo: 107, name: 'Divya', branch: 'MECH', year: 3, cgpa: 8.4, city: 'Tanuku' },
  { rollNo: 108, name: 'Harsha', branch: 'CSE', year: 4, cgpa: 8.6, city: 'Bhimavaram' }
]));
print('Count (expected 8):');
printjson(db.students.countDocuments());

// find(), findOne(), filters and projections.
print('CSE students:');
printjson(db.students.find({ branch: 'CSE' }, { name: 1, cgpa: 1, _id: 0 }).toArray());
print('Third-year students with CGPA > 8:');
printjson(db.students.find({ cgpa: { $gt: 8 }, year: 3 }, { name: 1, cgpa: 1, _id: 0 }).toArray());
print('ECE students or students from Tanuku:');
printjson(db.students.find(
  { $or: [{ branch: 'ECE' }, { city: 'Tanuku' }] },
  { name: 1, branch: 1, city: 1, _id: 0 }
).toArray());
print('Students from Eluru or Tanuku:');
printjson(db.students.find({ city: { $in: ['Eluru', 'Tanuku'] } }, { name: 1, city: 1, _id: 0 }).toArray());
print('findOne() for roll number 105:');
printjson(db.students.findOne({ rollNo: 105 }, { name: 1, branch: 1, _id: 0 }));

// limit(), skip() and sort().
print('First three names:');
printjson(db.students.find({}, { name: 1, _id: 0 }).limit(3).toArray());
print('Page 2 (skip 3, limit 3):');
printjson(db.students.find({}, { name: 1, _id: 0 }).skip(3).limit(3).toArray());
print('Highest CGPA first:');
printjson(db.students.find({}, { name: 1, cgpa: 1, _id: 0 }).sort({ cgpa: -1 }).toArray());
print('Sort branch A-Z, then CGPA descending:');
printjson(db.students.find({}, { name: 1, branch: 1, cgpa: 1, _id: 0 }).sort({ branch: 1, cgpa: -1 }).toArray());

// Indexes, uniqueness and query plan.
print('Create indexes:');
printjson(db.students.createIndex({ name: 1 }));
printjson(db.students.createIndex({ branch: 1, cgpa: -1 }));
printjson(db.students.createIndex({ rollNo: 1 }, { unique: true }));
print('Index names:');
printjson(db.students.getIndexes().map((index) => index.name));
print('Winning plan for branch filter:');
printjson(db.students.find({ branch: 'CSE' }).explain('executionStats').queryPlanner.winningPlan);
// Uncomment to demonstrate MongoServerError E11000 for the duplicate unique rollNo:
// db.students.insertOne({ rollNo: 101, name: 'Duplicate', branch: 'IT', year: 1, cgpa: 5 });

// aggregate(): average CGPA by branch.
print('Average CGPA by branch:');
printjson(db.students.aggregate([
  { $group: { _id: '$branch', total: { $sum: 1 }, avgCgpa: { $avg: '$cgpa' } } },
  { $sort: { avgCgpa: -1 } }
]).toArray());

// $match + $group: maximum CGPA for third-year students.
print('Third-year counts and maximum CGPA by branch:');
printjson(db.students.aggregate([
  { $match: { year: 3 } },
  { $group: { _id: '$branch', count: { $sum: 1 }, maxCgpa: { $max: '$cgpa' } } },
  { $sort: { _id: 1 } }
]).toArray());

// $project, $sort, $limit: top students with CGPA >= 8.5.
print('Top students with CGPA >= 8.5:');
printjson(db.students.aggregate([
  { $match: { cgpa: { $gte: 8.5 } } },
  { $project: { _id: 0, name: 1, branch: 1, cgpa: 1 } },
  { $sort: { cgpa: -1 } },
  { $limit: 3 }
]).toArray());

// $push: group student names by city.
printjson(db.students.aggregate([
  { $group: { _id: '$city', students: { $push: '$name' }, n: { $sum: 1 } } },
  { $sort: { n: -1, _id: 1 } }
]).toArray());

// $count: expected { above8: 5 }.
print('Number of students with CGPA > 8:');
printjson(db.students.aggregate([
  { $match: { cgpa: { $gt: 8 } } },
  { $count: 'above8' }
]).toArray());

// Database/collection cleanup is in the handout but intentionally disabled.
// Check db.getName() before manually executing any destructive command:
// db.faculty.drop();
// db.logs.drop();
// db.courses.drop();
// db.students.drop();
// db.dropDatabase();
