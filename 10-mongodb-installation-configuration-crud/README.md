# Experiment 10 — MongoDB Installation, Configuration and CRUD

## What is this?

This experiment introduces MongoDB shell commands for basic CRUD operations.

## What can it do?

- Select a database.
- Insert student documents.
- Find all documents.
- Filter documents by branch.
- Update a document.
- Delete a document.
- Display the final collection.

## Main CRUD operations

| Operation | Modern command |
| --- | --- |
| Create | insertOne() |
| Read | find() |
| Update | updateOne() |
| Delete | deleteOne() |

The original syllabus may use the older names insert(), update() and remove(). The program uses modern equivalents.

## Run

Open mongosh and execute:

```bash
mongosh < 10-mongodb-installation-configuration-crud/queries.js
```

## Database

The example uses:

```text
fsd2lab
```

## Source file

- queries.js — readable, sectioned mongosh commands.
