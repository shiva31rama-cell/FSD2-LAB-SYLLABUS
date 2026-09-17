// Run from repository root after npm install.
// PowerShell example:
// $env:MONGO_URI="mongodb+srv://<user>:<password>@<cluster>/fsd2course"
// npm run mongo:driver

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function main() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    const db = client.db('fsd2course');
    const notes = db.collection('driverNotes');

    await notes.insertOne({ title: 'Node Driver', done: false, createdAt: new Date() });
    const result = await notes.find({ done: false }).sort({ createdAt: -1 }).limit(10).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
