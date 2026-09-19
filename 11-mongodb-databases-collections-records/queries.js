/**
 * Experiment 11: MongoDB Databases, Collections and Records
 *
 * Run this file inside mongosh.
 *
 * Demonstrates:
 * - Database and collection creation
 * - Insert many records
 * - Find
 * - Limit
 * - Sort
 * - Index
 * - Aggregation
 */

// ------------------------------------------------------------
// Database and collection
// ------------------------------------------------------------

use fsd2records;

db.createCollection('students');

// ------------------------------------------------------------
// INSERT MANY
// ------------------------------------------------------------

db.students.insertMany([
  {
    name: 'Rama',
    marks: 88,
    branch: 'CSE',
  },
  {
    name: 'Gandhi',
    marks: 76,
    branch: 'CSE',
  },
  {
    name: 'Roshni',
    marks: 92,
    branch: 'ECE',
  },
  {
    name: 'Kiran',
    marks: 81,
    branch: 'CSE',
  },
]);

// ------------------------------------------------------------
// FIND
// ------------------------------------------------------------

db.students.find();

// ------------------------------------------------------------
// LIMIT
// ------------------------------------------------------------

db.students
  .find()
  .limit(2);

// ------------------------------------------------------------
// SORT
// ------------------------------------------------------------

// Sort marks from highest to lowest.
db.students
  .find()
  .sort({
    marks: -1,
  });

// ------------------------------------------------------------
// INDEX
// ------------------------------------------------------------

// Create an index on the branch field.
db.students.createIndex({
  branch: 1,
});

// ------------------------------------------------------------
// AGGREGATION
// ------------------------------------------------------------

// Calculate average marks and count by branch.
db.students.aggregate([
  {
    $group: {
      _id: '$branch',
      averageMarks: {
        $avg: '$marks',
      },
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      averageMarks: -1,
    },
  },
]);

// ------------------------------------------------------------
// OPTIONAL CLEANUP
// ------------------------------------------------------------

// Drop collection:
// db.students.drop();
//
// Drop database:
// db.dropDatabase();
