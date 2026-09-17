// Run with: mongosh < 03-querying/queries.js
use('fsd2course');

db.orders.drop();
db.orders.insertMany([
  { customer: 'Rama', city: 'Bhimavaram', total: 850, status: 'paid', tags: ['student', 'priority'], items: [{ name: 'Book', qty: 2 }, { name: 'Pen', qty: 5 }] },
  { customer: 'Anu', city: 'Vijayawada', total: 1200, status: 'pending', tags: ['student'], items: [{ name: 'Bag', qty: 1 }] },
  { customer: 'Kiran', city: 'Bhimavaram', total: 450, status: 'paid', tags: ['regular'], items: [{ name: 'Pen', qty: 10 }] },
  { customer: 'Meena', city: 'Rajahmundry', total: 2100, status: 'paid', tags: ['priority', 'business'], items: [{ name: 'Laptop Stand', qty: 2 }] }
]);

// Comparison operators.
db.orders.find({ total: { $gte: 1000, $lt: 3000 } }).forEach(printjson);

// Logical operators.
db.orders.find({ $or: [{ city: 'Bhimavaram' }, { total: { $gt: 2000 } }] }).forEach(printjson);

// Projection: 1 includes a field, 0 excludes it.
db.orders.find({ status: 'paid' }, { _id: 0, customer: 1, total: 1 }).forEach(printjson);

// Sort + limit for a simple top-N query.
db.orders.find().sort({ total: -1 }).limit(2).forEach(printjson);

// Pagination pattern: skip N, then take pageSize.
const page = 2;
const pageSize = 2;
db.orders.find().sort({ _id: 1 }).skip((page - 1) * pageSize).limit(pageSize).forEach(printjson);

// Array matching.
db.orders.find({ tags: 'priority' }).forEach(printjson);
db.orders.find({ tags: { $all: ['priority', 'business'] } }).forEach(printjson);

// Embedded-document matching.
db.orders.find({ 'items.name': 'Pen' }).forEach(printjson);

// Regular expression: case-insensitive customer search.
db.orders.find({ customer: { $regex: '^r', $options: 'i' } }).forEach(printjson);

// Distinct values.
print('Cities:', db.orders.distinct('city'));

// Count matching documents.
print('Paid orders:', db.orders.countDocuments({ status: 'paid' }));
