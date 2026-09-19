/**
 * Experiment 10: MongoDB Installation, Configuration and CRUD
 *
 * Run this file inside mongosh.
 *
 * Demonstrates:
 * - Database selection
 * - Insert
 * - Find
 * - Update
 * - Delete
 */

// ------------------------------------------------------------
// Select database
// ------------------------------------------------------------

use fsd2lab;

// ------------------------------------------------------------
// CREATE
// ------------------------------------------------------------

db.students.insertOne({
  name: 'Rama',
  branch: 'CSE',
  year: 3,
});

db.students.insertOne({
  name: 'Gandhi',
  branch: 'CSE',
  year: 3,
});

// ------------------------------------------------------------
// READ
// ------------------------------------------------------------

// Find all students.
db.students.find();

// Find only CSE students.
db.students.find({
  branch: 'CSE',
});

// ------------------------------------------------------------
// UPDATE
// ------------------------------------------------------------

db.students.updateOne(
  {
    name: 'Rama',
  },
  {
    $set: {
      year: 4,
    },
  },
);

// ------------------------------------------------------------
// DELETE
// ------------------------------------------------------------

db.students.deleteOne({
  name: 'Gandhi',
});

// ------------------------------------------------------------
// VERIFY
// ------------------------------------------------------------

// View the final data.
db.students.find();

// Syllabus terminology:
// insert(), update() and remove()
//
// Modern MongoDB methods:
// insertOne(), updateOne() and deleteOne()
