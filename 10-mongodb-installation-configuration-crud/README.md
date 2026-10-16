# Experiment 10 — MongoDB Installation, Atlas Configuration and CRUD

## Part (a) — Setup

Install MongoDB Community Server and `mongosh`, or configure a MongoDB Atlas cluster. In Atlas, create a database user, allow the lab computer's current IP address, copy the connection string and test the connection. Never commit a real Atlas password to GitHub or leave broad network access enabled beyond a controlled lab.

Check the tools:

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

Run from the repository root against local MongoDB:

```bash
mongosh --file 10-mongodb-installation-configuration-crud/queries.js
```

For Atlas, pass your own URI directly to mongosh (never paste the actual URI/password into GitHub):

```bash
mongosh "YOUR_ATLAS_URI" --file 10-mongodb-installation-configuration-crud/queries.js
```

The script selects `fsdLab`, loads five sample students and prints the results of `insert()`, `find()`, `update()`, `remove()`, filters, projections, operators and modern replacements. It reloads the sample data to make re-runs predictable. Whole-collection and whole-database deletion commands stay commented out.

## Verify

Look for the final printed documents and count in mongosh. If the shell cannot connect, see the MongoDB troubleshooting section in [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md).
