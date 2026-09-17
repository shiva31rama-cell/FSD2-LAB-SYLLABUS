// Run with: mongosh < 02-crud/crud.js
use('fsd2course');

db.products.drop();

// CREATE
db.products.insertMany([
  { name: 'Notebook', category: 'Stationery', price: 60, stock: 25 },
  { name: 'Pen', category: 'Stationery', price: 20, stock: 100 },
  { name: 'Bottle', category: 'Utility', price: 250, stock: 12 }
]);

// READ
print('All products');
db.products.find().forEach(printjson);

print('Products costing at least 50');
db.products.find({ price: { $gte: 50 } }).forEach(printjson);

// UPDATE ONE
db.products.updateOne(
  { name: 'Pen' },
  { $set: { price: 25 }, $inc: { stock: 10 } }
);

// UPDATE MANY
db.products.updateMany(
  { category: 'Stationery' },
  { $set: { active: true } }
);

// UPSERT: update if found, insert if not found.
db.products.updateOne(
  { name: 'Bag' },
  { $set: { category: 'Utility', price: 500, stock: 5 } },
  { upsert: true }
);

// DELETE ONE
db.products.deleteOne({ name: 'Bottle' });

// DELETE MANY — example only; remove the comment before using.
// db.products.deleteMany({ stock: { $lte: 0 } });

print('Final products');
db.products.find().sort({ price: 1 }).forEach(printjson);
