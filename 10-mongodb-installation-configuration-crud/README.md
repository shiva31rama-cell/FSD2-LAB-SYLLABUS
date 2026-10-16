# Experiment 10 — MongoDB Installation, Atlas Configuration and CRUD

## Part (a) — Setup

Install MongoDB Community Server and `mongosh`, or configure a MongoDB Atlas free cluster. Create an Atlas database user, allow the lab computer's current IP address, copy the connection string, and test with `mongosh`. Never commit a real Atlas password to GitHub; avoid leaving broad network access open.

Check the shell:

```bash
mongod --version
mongosh --version
```

For a local MongoDB service on Linux:

```bash
sudo systemctl status mongod
sudo systemctl start mongod
mongosh
```

## Part (b) — CRUD queries

**One program file:** `10-mongodb-installation-configuration-crud/queries.js`.

Run from the repository root:

```bash
mongosh --file 10-mongodb-installation-configuration-crud/queries.js
```

Connect to Atlas first if the script should use cloud data. The script selects `fsdLab`, loads five sample students and demonstrates syllabus methods `insert()`, `find()`, `update()`, `remove()`, together with filters, projections, operators and modern replacements.

The script reloads the sample data to make re-runs predictable. Whole-collection and whole-database deletion commands stay commented out.

## Verify

Look for the final printed documents and document count in mongosh. If the shell cannot connect, see the MongoDB troubleshooting section in [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md).
