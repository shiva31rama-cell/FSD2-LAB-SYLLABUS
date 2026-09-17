// Run with: mongosh < 04-indexes/indexes.js
use('fsd2course');

// Indexes make common query patterns faster, but they also consume storage
// and add write/update work. Index fields according to real query patterns.

db.users.drop();

db.users.insertMany([
  { name: 'Rama', email: 'rama@example.com', branch: 'CSE', year: 3 },
  { name: 'Anu', email: 'anu@example.com', branch: 'CSE', year: 2 },
  { name: 'Kiran', email: 'kiran@example.com', branch: 'ECE', year: 3 }
]);

// List current indexes.
print('Initial indexes');
db.users.getIndexes().forEach(printjson);

// Single-field index.
db.users.createIndex({ email: 1 });

// Unique index: duplicate email values are rejected.
db.users.createIndex({ email: 1 }, { unique: true, name: 'unique_email' });

// Compound index for a common filter + sort pattern.
db.users.createIndex({ branch: 1, year: -1 }, { name: 'branch_year' });

print('Indexes after creation');
db.users.getIndexes().forEach(printjson);

// Ask MongoDB how it plans to execute a query.
print('Explain plan');
printjson(
  db.users.find({ branch: 'CSE' }).sort({ year: -1 }).explain('executionStats')
);

// Remove an index by name when it is no longer useful.
// db.users.dropIndex('branch_year');
