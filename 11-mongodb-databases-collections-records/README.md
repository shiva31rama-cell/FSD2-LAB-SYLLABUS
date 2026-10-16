# Experiment 11 — MongoDB Databases, Collections and Records

## File and run command

**One program file:** `11-mongodb-databases-collections-records/queries.js`.

For local MongoDB, run from repository root:

```bash
mongosh --file 11-mongodb-databases-collections-records/queries.js
```

For Atlas:

```bash
mongosh "YOUR_ATLAS_URI" --file 11-mongodb-databases-collections-records/queries.js
```

## Handout coverage

The script selects `college`, creates collections as needed and loads the handout's eight-student dataset (roll numbers 101–108). It prints demonstrations of:

- Creating/listing databases and collections.
- `find()`, `findOne()`, filters, projection and count.
- `limit()`, `skip()` and `sort()`.
- Single, compound and unique indexes, index listing and query plan.
- Aggregation with `$match`, `$group`, `$avg`, `$max`, `$push`, `$project`, `$sort`, `$limit`, and `$count`.

## Rerun and data safety

The script clears and reloads only the `college.students` sample collection on each run so output stays predictable. Database/collection drop commands stay commented out.

If an exam question explicitly asks you to drop collections or the database, first open interactive mongosh, run `db.getName()`, and verify you are in the lab database. Then type the required command, for example `db.courses.drop()` or `db.dropDatabase()`, only when deleting that data is intended. These actions are permanent.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for Linux setup and troubleshooting.
