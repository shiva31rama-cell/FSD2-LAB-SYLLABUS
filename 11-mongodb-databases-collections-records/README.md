# Experiment 11 — MongoDB Databases, Collections and Records

This version follows the supplied handout's database/collection exercises and eight-student dataset.

## Source and run

Path: `11-mongodb-databases-collections-records/queries.js`

Run from the repository root:

```bash
mongosh < 11-mongodb-databases-collections-records/queries.js
```

Use a local MongoDB connection or connect with `mongosh` to Atlas first if your environment requires an explicit connection string.

## What the program demonstrates

- Select `college`; create/list databases and collections.
- Explicit and implicit collection creation, including an optional capped `logs` collection.
- Load the handout's eight students (roll numbers 101–108, with name, branch, year, CGPA and city).
- `find()`, projections, filters, `findOne()`, `countDocuments()`, `limit()`, `skip()` and `sort()`.
- Single-field, compound and unique indexes, index inspection, and query-plan inspection.
- Aggregation with `$match`, `$group`, `$avg`, `$max`, `$push`, `$sort`, `$project`, `$limit` and `$count`.

## Safety and repeat runs

The sample student collection is cleared and reloaded so the result set remains predictable. Cleanup commands such as `drop()` and `dropDatabase()` are left commented out because they permanently delete data. Review the current database with `db.getName()` before manually running destructive commands.
