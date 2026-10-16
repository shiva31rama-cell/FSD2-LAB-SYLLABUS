# Experiment 10 — MongoDB Installation, Atlas Configuration and CRUD

This repository's query file covers the handout's CRUD section. MongoDB installation and Atlas setup are environment steps; follow the uploaded handout for your OS and never commit Atlas credentials.

## Part A — Installation and connection checks

Verify the shell is installed:

```bash
mongod --version
mongosh --version
```

For Atlas, create a database user, allow your current IP in Network Access, copy the cluster connection string, and test it with `mongosh`. Avoid committing passwords or leaving `0.0.0.0/0` enabled outside a controlled lab.

## Part B — CRUD query path

`10-mongodb-installation-configuration-crud/queries.js`

Run from the repository root after connecting to your local server or Atlas:

```bash
mongosh < 10-mongodb-installation-configuration-crud/queries.js
```

The script uses `fsdLab` and a five-student dataset. It demonstrates legacy syllabus methods `insert()`, `find()`, `update()`, `remove()`, plus modern replacements `insertOne/insertMany`, `updateOne/updateMany` and `deleteOne/deleteMany`.

It includes filters, projections, sorting, limit, count, `findOne()`, `$set`, `$inc`, multi-update and upsert examples. Whole-collection/database deletion commands are commented out for safety.
