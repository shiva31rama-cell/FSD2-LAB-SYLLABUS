# MongoDB Complete Course — Beginner → Advanced

This branch is a dedicated MongoDB learning track that extends Experiments 4, 10 and 11 of the FSD2 syllabus into a practical course.

## What you will learn

1. MongoDB mental model: database, collection, document, field, ObjectId and BSON
2. Local MongoDB and MongoDB Atlas
3. `mongosh` connection and command-line workflow
4. CRUD: insert, find, update, delete and bulk operations
5. Query operators, projections, sorting, pagination and regular expressions
6. Arrays and embedded documents
7. Schema design: embed vs reference, cardinality and access patterns
8. Indexes and `explain()`
9. Aggregation pipelines: match, project, group, sort, limit, unwind, lookup, facet and set
10. Transactions and sessions
11. Node.js official MongoDB driver
12. Mongoose schemas, models, validation, middleware and populate
13. Atlas connection, security, monitoring and deployment concepts
14. Atlas Search / Vector Search concepts for AI-enabled applications
15. Atlas database and scheduled triggers for event-driven automation
16. Backup, performance, production-readiness and troubleshooting
17. Capstone integration with Express + React + MongoDB + AI

## Course folders

- `01-foundations` — shell commands and database basics
- `02-crud` — CRUD practice
- `03-querying` — filters, projections, arrays and pagination
- `04-indexes` — indexes and query plans
- `05-aggregation` — reusable aggregation pipelines
- `06-schema-design` — modeling notes and examples
- `07-transactions` — transaction example
- `08-node-driver` — official Node.js driver example
- `09-mongoose` — Mongoose schema/model example
- `10-atlas` — Atlas setup and connection checklist
- `11-search-vector` — Search and Vector Search learning notes
- `12-triggers` — database and scheduled automation examples
- `13-security-performance` — security and production checklist
- `14-project-integration` — how MongoDB maps to the capstone

## Quick start in VS Code

```powershell
npm install
mongosh
```

For Atlas, create a cluster, database user and network access rule in Atlas, then place the connection string in an environment variable. Never commit a real password or API key.

```powershell
$env:MONGO_URI="mongodb+srv://<username>:<password>@<cluster>/<database>"
```

Then run the examples from their folders. The course deliberately keeps every example small enough to type, run and understand.

## Official concepts used

MongoDB Atlas is the managed cloud deployment platform; the official Node.js driver supports Atlas, Enterprise and Community deployments. Mongoose adds schema-based application modeling on top of MongoDB. Aggregation pipelines process documents through ordered stages. Atlas Triggers can react to database events or schedules.

See the linked official documentation in `10-atlas`, `11-search-vector` and `12-triggers` for current platform details.

## Mastery path

**Level 1:** commands → CRUD → queries  
**Level 2:** arrays → schema design → indexes → aggregation  
**Level 3:** Node driver → Mongoose → REST API  
**Level 4:** Atlas → security → monitoring → transactions  
**Level 5:** Search/Vector Search → triggers → AI integration → capstone
