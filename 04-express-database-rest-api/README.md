# Experiment 04 — ExpressJS + Mongoose CRUD + RESTful API

## Aim

Connect Express to MongoDB using Mongoose, implement CRUD REST routes, and let a single-page browser interface call the API using `fetch()`.

## Files needed

One main program file: `04-express-database-rest-api/server.js`. The package dependencies are installed once from the repository root.

## Run on Linux / VS Code

Make sure local MongoDB is running, or set an Atlas URI first:

```bash
export MONGO_URI='your-own-mongodb-connection-string'
node 04-express-database-rest-api/server.js
```

For a local database, omit the export command. Open `http://localhost:3004/`.

## Expected behavior

Enter `Notebook` as product name and `50` as price, then click **Add product**. It should appear in the product list. Use **Edit** and **Delete** to try update/delete operations.

## REST API endpoints

| Method | Route | Meaning |
|---|---|---|
| GET | `/api/health` | Check API |
| GET | `/api/products` | Read all products |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Program flow

Browser form → `fetch()` → Express route → Mongoose model → MongoDB → JSON response → browser updates.

## Common fixes

- `ECONNREFUSED`: start local MongoDB or supply a correct Atlas URI.
- Invalid URI / Atlas timeout: recheck connection string and Atlas Network Access.
- Invalid product ID: API returns a 400 response.
- Missing dependency: from repository root run `npm install`.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for exact Linux debugging commands.
