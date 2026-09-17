// Run with: mongosh < 05-aggregation/pipelines.js
use('fsd2course');

db.sales.drop();
db.sales.insertMany([
  { product: 'Pen', category: 'Stationery', price: 20, qty: 10, city: 'Bhimavaram' },
  { product: 'Notebook', category: 'Stationery', price: 60, qty: 5, city: 'Bhimavaram' },
  { product: 'Bag', category: 'Utility', price: 500, qty: 2, city: 'Vijayawada' },
  { product: 'Pen', category: 'Stationery', price: 20, qty: 20, city: 'Vijayawada' },
  { product: 'Bottle', category: 'Utility', price: 250, qty: 4, city: 'Rajahmundry' }
]);

// 1. $match filters documents early.
print('1. Match');
db.sales.aggregate([
  { $match: { category: 'Stationery' } }
]).forEach(printjson);

// 2. $project calculates a new field.
print('2. Project revenue');
db.sales.aggregate([
  { $project: { _id: 0, product: 1, city: 1, revenue: { $multiply: ['$price', '$qty'] } } }
]).forEach(printjson);

// 3. $group calculates totals per category.
print('3. Group by category');
db.sales.aggregate([
  { $group: {
      _id: '$category',
      totalUnits: { $sum: '$qty' },
      revenue: { $sum: { $multiply: ['$price', '$qty'] } },
      averagePrice: { $avg: '$price' }
  } },
  { $sort: { revenue: -1 } }
]).forEach(printjson);

// 4. $sort + $limit gives a top-N report.
print('4. Top products by row revenue');
db.sales.aggregate([
  { $set: { revenue: { $multiply: ['$price', '$qty'] } } },
  { $sort: { revenue: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, product: 1, city: 1, revenue: 1 } }
]).forEach(printjson);

// 5. $facet produces multiple reports in one pipeline.
print('5. Faceted report');
db.sales.aggregate([
  { $facet: {
      byCategory: [
        { $group: { _id: '$category', revenue: { $sum: { $multiply: ['$price', '$qty'] } } } },
        { $sort: { revenue: -1 } }
      ],
      byCity: [
        { $group: { _id: '$city', units: { $sum: '$qty' } } },
        { $sort: { units: -1 } }
      ]
  } }
]).forEach(printjson);

// 6. $lookup joins related collections.
db.customers.drop();
db.customers.insertMany([
  { customerId: 1, name: 'Rama' },
  { customerId: 2, name: 'Anu' }
]);
db.invoices.drop();
db.invoices.insertMany([
  { customerId: 1, amount: 850 },
  { customerId: 2, amount: 1200 },
  { customerId: 1, amount: 300 }
]);

print('6. Lookup');
db.invoices.aggregate([
  { $lookup: {
      from: 'customers',
      localField: 'customerId',
      foreignField: 'customerId',
      as: 'customer'
  } },
  { $unwind: '$customer' },
  { $project: { _id: 0, amount: 1, customerName: '$customer.name' } }
]).forEach(printjson);
