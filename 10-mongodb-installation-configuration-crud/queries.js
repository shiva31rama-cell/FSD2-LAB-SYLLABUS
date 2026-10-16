/**
 * Experiment 10(b): MongoDB CRUD operations.
 *
 * Connect to local MongoDB or Atlas first, then run inside mongosh:
 *   mongosh < 10-mongodb-installation-configuration-crud/queries.js
 *
 * This uses the handout's fsdLab database and five sample students.
 * Destructive whole-collection deletion is intentionally commented out.
 */
use fsdLab;

// Reset only the sample collection to make repeated runs predictable.
db.students.deleteMany({});
db.students.insertMany([
  { name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9 },
  { name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.8 },
  { name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.1 },
  { name: 'Kiran', branch: 'MECH', year: 4, cgpa: 6.9 },
  { name: 'Divya', branch: 'CSE', year: 2, cgpa: 8.2 }
]);

// CREATE — syllabus legacy insert() and modern equivalents.
db.students.insert({ name: 'Meena', branch: 'ECE', year: 3, cgpa: 8.4 });
// Modern methods (examples; comment out if you do not want extra records):
// db.students.insertOne({ name: 'Varun', branch: 'CSE', year: 2, cgpa: 7.9 });
// db.students.insertMany([{ name: 'Roshni', branch: 'ECE', year: 3, cgpa: 8.6 }]);

// READ — find, filters, projection, sorting, limit, count and findOne.
db.students.find();
db.students.find({ branch: 'CSE' });
db.students.find({ cgpa: { $gt: 8.5 } });
db.students.find({ branch: { $in: ['CSE', 'ECE'] } });
db.students.find({ branch: 'CSE', year: 3 });
db.students.find({ $or: [{ year: 2 }, { cgpa: { $gt: 9 } }] });
db.students.find({ branch: 'CSE' }, { name: 1, cgpa: 1, _id: 0 });
db.students.find().sort({ cgpa: -1 }).limit(3);
db.students.countDocuments({ branch: 'CSE' });
db.students.findOne({ name: 'Sneha' });

// UPDATE — legacy update() and modern updateOne/updateMany examples.
// The sample Ravi record is updated using $set, not document replacement.
db.students.update({ name: 'Ravi' }, { $set: { cgpa: 8.0 } });
db.students.update({ branch: 'CSE' }, { $inc: { year: 1 } }, { multi: true });
db.students.update(
  { name: 'Meena' },
  { $set: { branch: 'IT', year: 1, cgpa: 8.4 } },
  { upsert: true }
);
// Modern equivalents:
// db.students.updateOne({ name: 'Ravi' }, { $set: { cgpa: 8.0 } });
// db.students.updateMany({ branch: 'CSE' }, { $inc: { year: 1 } });

// DELETE — syllabus remove() and modern equivalents.
// Check matching records with find() before running delete commands.
db.students.remove({ branch: 'MECH' });
// db.students.remove({ year: 2 }, { justOne: true });
// Modern equivalents:
// db.students.deleteOne({ name: 'Kiran' });
// db.students.deleteMany({ branch: 'MECH' });

db.students.find();
db.students.countDocuments();

// Destructive cleanup examples: intentionally disabled.
// db.students.remove({});
// db.students.deleteMany({});
// db.students.drop();
// db.dropDatabase();
