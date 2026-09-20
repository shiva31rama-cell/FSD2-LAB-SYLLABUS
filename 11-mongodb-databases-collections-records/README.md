# Experiment 11 — MongoDB Databases, Collections and Records

## What is this?

This experiment demonstrates database and collection operations together with common MongoDB query features.

## What can it do?

- Create a database context.
- Create a students collection.
- Insert multiple records.
- Find records.
- Limit the number of results.
- Sort by marks.
- Create an index.
- Calculate average marks with aggregation.

## Main concepts

| Feature | Example |
| --- | --- |
| Collection | db.createCollection() |
| Find | find() |
| Limit | limit(2) |
| Sort | sort({ marks: -1 }) |
| Index | createIndex({ branch: 1 }) |
| Aggregation | $group + $sort |

## VS Code path

MongoDB query file:

```text
11-mongodb-databases-collections-records/queries.js
```

Run it with `mongosh` from the repository root.

## Run

Open mongosh and execute:

```bash
mongosh < 11-mongodb-databases-collections-records/queries.js
```

## Aggregation result

The aggregation calculates:

- Average marks for each branch.
- Number of students in each branch.
- Results ordered by average marks.

## Source file

- queries.js — sectioned MongoDB commands with comments.
