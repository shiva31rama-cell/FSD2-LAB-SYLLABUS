// Run with: mongosh < 01-foundations/commands.js
// These commands are safe practice operations in a database named fsd2course.

use('fsd2course');

// Start clean for this learning database.
db.students.drop();

// Create a collection by inserting the first document.
db.students.insertOne({
  name: 'Rama',
  branch: 'CSE',
  year: 3,
  skills: ['Java', 'JavaScript', 'MongoDB']
});

// Read the database name and collections.
print('Database:', db.getName());
print('Collections:', db.getCollectionNames());

// Insert multiple documents.
db.students.insertMany([
  { name: 'Anu', branch: 'CSE', year: 2, marks: 88 },
  { name: 'Kiran', branch: 'ECE', year: 3, marks: 79 },
  { name: 'Meena', branch: 'CSE', year: 4, marks: 94 }
]);

// Basic reads.
print('All students:');
db.students.find().forEach(printjson);

print('CSE students:');
db.students.find({ branch: 'CSE' }).forEach(printjson);

// Count documents.
print('Student count:', db.students.countDocuments());

// Show one document.
print('One student:');
printjson(db.students.findOne({ name: 'Rama' }));

// Drop only the learning collection when you want to reset it.
// db.students.drop();
