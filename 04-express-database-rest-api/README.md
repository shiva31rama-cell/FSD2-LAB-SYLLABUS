# Experiment 04 — ExpressJS, Mongoose, CRUD and REST API

## What is this?

This experiment connects an ExpressJS application to MongoDB using Mongoose and exposes the data through RESTful APIs.

## What can it do?

- Connect to MongoDB.
- Define a Product schema.
- Create products.
- Read all products.
- Update a product.
- Delete a product.
- Display the API data in a simple browser page using fetch().

## Main concepts

| Concept | Purpose |
| --- | --- |
| Mongoose | MongoDB object modeling |
| Schema | Defines document fields |
| Model | Performs database operations |
| REST API | Exposes data through HTTP |
| fetch() | Calls the REST API from the browser |
| CRUD | Create, Read, Update, Delete |

## Setup

Set the MongoDB connection string before running:

Windows PowerShell:

```powershell
$env:MONGO_URI="your-mongodb-uri"
```

Do not commit real database passwords.

## VS Code path

Main server file:

```text
04-express-database-rest-api/server.js
```

REST API paths exposed by this program:

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Run

```bash
node 04-express-database-rest-api/server.js
```

Open:

```text
http://localhost:3004
```

## API endpoints

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Basic flow

Browser
→ fetch()
→ REST route
→ Mongoose
→ MongoDB
→ JSON response
→ Browser
