// FSD2 MongoDB CRUD lab. Run this file in mongosh.
use fsd2lab;

// INSERT: syllabus uses insert(); modern MongoDB also supports insertOne().
db.students.insertOne({ name: 'Rama', branch: 'CSE', year: 3 });
db.students.insertOne({ name: 'Gandhi', branch: 'CSE', year: 3 });

// FIND records.
db.students.find();
db.students.find({ branch: 'CSE' });

// UPDATE: syllabus says update(); modern form is updateOne().
db.students.updateOne({ name: 'Rama' }, { $set: { year: 4 } });

// REMOVE: syllabus says remove(); modern form is deleteOne().
db.students.deleteOne({ name: 'Gandhi' });

// Check the final data.
db.students.find();
