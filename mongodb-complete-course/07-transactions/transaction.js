// Transactions require a deployment that supports sessions/transactions.
// Run against a replica set or an appropriate Atlas deployment.
// Run with: node mongodb-complete-course/07-transactions/transaction.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/?replicaSet=rs0';
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const db = client.db('fsd2course');
  const accounts = db.collection('accounts');

  await accounts.deleteMany({});
  await accounts.insertMany([
    { name: 'Rama', balance: 1000 },
    { name: 'Anu', balance: 500 }
  ]);

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      await accounts.updateOne({ name: 'Rama' }, { $inc: { balance: -200 } }, { session });
      await accounts.updateOne({ name: 'Anu' }, { $inc: { balance: 200 } }, { session });
    });
    console.log(await accounts.find().toArray());
  } finally {
    await session.endSession();
    await client.close();
  }
}

run().catch(error => { console.error(error); process.exitCode = 1; });
