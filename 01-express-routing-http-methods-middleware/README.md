# Experiment 01 — ExpressJS Routing, HTTP Methods and Middleware

## What is this?

This program introduces the basic structure of an ExpressJS server.

## What can it do?

- Start an Express server on port 3001.
- Use custom middleware to log requests.
- Read route parameters such as /students/1.
- Read query parameters such as /search?name=Rama.
- Build a URL dynamically.
- Create, read and delete student records in memory.

## Main concepts

| Concept | Example |
| --- | --- |
| GET | Read data |
| POST | Create data |
| DELETE | Remove data |
| Route parameter | /students/:id |
| Query parameter | /search?name=Rama |
| Middleware | Request logger |
| JSON body | express.json() |

## Run

From the repository root:

```bash
node 01-express-routing-http-methods-middleware/app.js
```

Open:

```text
http://localhost:3001
```

## Basic flow

Client request
→ Middleware
→ Route
→ Route handler
→ Response

## Source file

- app.js — complete ExpressJS example with comments and clear sections.
