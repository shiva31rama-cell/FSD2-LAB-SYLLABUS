# Experiment 11 — MongoDB Databases, Collections and Records

## File and run command

**One program file:** `11-mongodb-databases-collections-records/queries.js`.

Run from the repository root in a local MongoDB environment:

```bash
mongosh --file 11-mongodb-databases-collections-records/queries.js
```

For Atlas use `mongosh "YOUR_ATLAS_URI" --file 11-mongodb-databases-collections-records/queries.js`.

## Handout coverage

The query script selects `college`, creates collections where needed and loads the handout's eight-student dataset (roll numbers 101–108). It shows:

- creating/listing databases and collections;
- `find()`, `findOne()`, filters, projection and count;
- `limit()`, `skip()` and `sort()`;
- single, compound and unique indexes, index listing and query plan;
- aggregation with `$match`, `$group`, `$avg`, `$max`, `$push`, `$project`, `$sort`, `$limit`, and `$count`.

## Rerun and data safety

The script clears and reloads only the `college.students` sample collection on each run so the outputs are predictable. Commands that permanently drop collections/database remain commented out. Check `db.getName()` before manual cleanup.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for Linux setup and troubleshooting.
