# Experiment 02 — ExpressJS Templating and Form Data

## What is this?

This experiment shows how ExpressJS can render dynamic HTML using the EJS templating engine.

## What can it do?

- Display an HTML form.
- Accept name and course values.
- Read POST form data.
- Send the submitted values back to the EJS template.
- Display a dynamic result page.

## Main concepts

| Concept | Purpose |
| --- | --- |
| EJS | Dynamic HTML templates |
| view engine | Tells Express to use EJS |
| express.urlencoded() | Reads HTML form data |
| GET | Displays the form |
| POST | Receives the form |

## VS Code path

This experiment uses two connected files:

```text
02-express-templating-form-data/
├── app.js
└── views/
    └── index.ejs
```

Main server path:

```text
02-express-templating-form-data/app.js
```

Template path:

```text
02-express-templating-form-data/views/index.ejs
```

## Run

```bash
node 02-express-templating-form-data/app.js
```

Open:

```text
http://localhost:3002
```

## File structure

```text
02-express-templating-form-data/
├── app.js
└── views/
    └── index.ejs
```

## Basic flow

HTML form
→ POST /submit
→ Express reads req.body
→ EJS receives data
→ HTML response

## Source files

- app.js — Express configuration and routes.
- views/index.ejs — readable EJS template.
