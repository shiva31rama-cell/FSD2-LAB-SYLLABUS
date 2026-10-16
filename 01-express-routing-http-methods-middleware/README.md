# Experiment 01 — ExpressJS Routing, HTTP Methods and Middleware

## Aim

Demonstrate route definition/handling, route parameters, query parameters, URL building, GET/POST/DELETE HTTP methods, and middleware.

## Files needed

**One file:** `01-express-routing-http-methods-middleware/app.js`.

## Run on Linux / VS Code

From the repository root:

```bash
node 01-express-routing-http-methods-middleware/app.js
```

Open `http://localhost:3001/`.

## Try the examples

```text
/                   → FSD2 Express Lab is running
/students           → records in JSON
/students/1         → route parameter
/search?name=Rama   → query parameter
/build-url          → dynamically generated student URL
```

Test POST and DELETE with `curl`:

```bash
curl -X POST http://localhost:3001/students -H 'Content-Type: application/json' -d '{"name":"Anitha"}'
curl http://localhost:3001/students
curl -X DELETE http://localhost:3001/students/1
```

Every request prints a method and URL line in the server terminal, demonstrating middleware.

## Core flow

Request → logging middleware → route handler → text/JSON response. The sample data is in memory, not MongoDB.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for copy/run steps and common Linux fixes.
