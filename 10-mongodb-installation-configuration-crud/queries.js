/**
 * Experiment 10(b): MongoDB CRUD operations.
 *
 * Run from the repository root:
 *   mongosh --file 10-mongodb-installation-configuration-crud/queries.js
 * To use Atlas, pass your connection URI before --file:
 *   mongosh "YOUR_ATLAS_URI" --file 10-mongodb-installation-configuration-crud/queries.js
 *
 * This script uses its own fsdLab sample database and prints important results.
 */
db = db.getSiblingDB('fsdLab');

// Recreate predictable sample state by clearing only this lab collection.
db.students.deleteMany({});
print('CREATE: insert five sample students');
printjson(
  db.students.insert([
    { name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9 },
    { name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.8 },
    { name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.1 },
    { name: 'Kiran', branch: 'MECH', year: 4, cgpa: 6.9 },
    { name: 'Divya', branch: 'CSE', year: 2, cgpa: 8.2 },
  ]),
);

// Modern create example; remove the comment to create an extra sample student.
// printjson(db.students.insertOne({ name: 'Varun', branch: 'CSE', year: 2, cgpa: 7.9 }));

print('READ: all students');
printjson(db.students.find().toArray());
print('Filter: CSE students');
printjson(db.students.find({ branch: 'CSE' }).toArray());
print('Filter: CGPA > 8.5');
printjson(db.students.find({ cgpa: { $gt: 8.5 } }).toArray());
print('Filter with $in');
printjson(db.students.find({ branch: { $in: ['CSE', 'ECE'] } }).toArray());
print('AND filter: CSE, third year');
printjson(db.students.find({ branch: 'CSE', year: 3 }).toArray());
print('OR filter: year 2 or CGPA > 9');
printjson(
  db.students.find({ $or: [{ year: 2 }, { cgpa: { $gt: 9 } }] }).toArray(),
);
print('Projection: name and CGPA only');
printjson(
  db.students.find({ branch: 'CSE' }, { name: 1, cgpa: 1, _id: 0 }).toArray(),
);
print('Top three by CGPA');
printjson(db.students.find().sort({ cgpa: -1 }).limit(3).toArray());
print('Find one student');
printjson(db.students.findOne({ name: 'Sneha' }));

print('UPDATE: change Ravi CGPA using $set');
printjson(db.students.update({ name: 'Ravi' }, { $set: { cgpa: 8.0 } }));
print('UPDATE: move all CSE students up one year using $inc');
printjson(
  db.students.update({ branch: 'CSE' }, { $inc: { year: 1 } }, { multi: true }),
);
print('UPSERT: update Meena if found, otherwise insert');
printjson(
  db.students.update(
    { name: 'Meena' },
    { $set: { branch: 'IT', year: 1, cgpa: 8.4 } },
    { upsert: true },
  ),
);
// Modern equivalents:
// printjson(db.students.updateOne({ name: 'Ravi' }, { $set: { cgpa: 8.0 } }));
// printjson(db.students.updateMany({ branch: 'CSE' }, { $inc: { year: 1 } }));

print('DELETE: remove MECH students');
printjson(db.students.remove({ branch: 'MECH' }));
// Modern equivalents:
// printjson(db.students.deleteOne({ name: 'Kiran' }));
// printjson(db.students.deleteMany({ branch: 'MECH' }));

print('FINAL DOCUMENTS');
printjson(db.students.find().toArray());
print('FINAL COUNT');
printjson(db.students.countDocuments());

// Do not uncomment without checking the selected database first:
// db.students.remove({});
// db.students.deleteMany({});
// db.students.drop();
// db.dropDatabase();
