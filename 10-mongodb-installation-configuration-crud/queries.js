/**
 * Experiment 10(b): MongoDB CRUD operations.
 *
 * First connect to local MongoDB or Atlas, then run in mongosh:
 *   mongosh < 10-mongodb-installation-configuration-crud/queries.js
 *
 * Uses the syllabus' fsdLab database and five example students.
 * Destructive collection/database deletion commands stay commented out.
 */
use fsdLab;

// RESET the named lab dataset to avoid accumulating duplicate records on reruns.
db.students.deleteMany({});
db.students.insert([
  { name: 'Anitha', branch: 'CSE', year: 3, cgpa: 8.9 },
  { name: 'Ravi', branch: 'ECE', year: 2, cgpa: 7.8 },
  { name: 'Sneha', branch: 'CSE', year: 3, cgpa: 9.1 },
  { name: 'Kiran', branch: 'MECH', year: 4, cgpa: 6.9 },
  { name: 'Divya', branch: 'CSE', year: 2, cgpa: 8.2 }
]);

// CREATE: the legacy syllabus insert() plus a modern insertOne() example.
db.students.insert({ name: 'Meena', branch: 'ECE', year: 3, cgpa: 8.4 });
// Modern alternatives (uncomment for practice):
// db.students.insertOne({ name: 'Varun', branch: 'CSE', year: 2, cgpa: 7.9 });
// db.students.insertMany([{ name: 'Roshni', branch: 'ECE', year: 3, cgpa: 8.6 }]);

// READ: find all, equality, comparison, $in, AND, OR and projection.
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

// UPDATE: use operators so other fields are not accidentally replaced.
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

// DELETE: legacy remove() and modern replacements. Test with find() first.
db.students.remove({ branch: 'MECH' });
// db.students.remove({ year: 2 }, { justOne: true });
// db.students.deleteOne({ name: 'Kiran' });
// db.students.deleteMany({ branch: 'MECH' });

print('Final documents:');
db.students.find();
print('Final count:');
db.students.countDocuments();

// DANGEROUS cleanup examples—only run manually when you intend to remove all data:
// db.students.remove({});
// db.students.deleteMany({});
// db.students.drop();
// db.dropDatabase();
