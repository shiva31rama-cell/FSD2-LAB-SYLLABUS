# Experiment 02 — ExpressJS Templating and Form Data

## Aim

Render dynamic HTML with EJS, display a form, receive submitted form values and show a rendered result.

## Files needed

**Two files:**

```text
02-express-templating-form-data/
├── app.js
└── views/
    └── index.ejs
```

## Run

From repository root:

```bash
node 02-express-templating-form-data/app.js
```

Open `http://localhost:3002/`. Enter `Anitha`, select `FSD2`, and submit. Expected text on the result page:

```text
Hello Anitha. Course: FSD2
```

## How files connect

- `app.js`: configures EJS, reads form data using `express.urlencoded()`, defines `GET /` and `POST /submit`, and calls `res.render()`.
- `views/index.ejs`: displays the form and server-provided title/message.

**Do not open `index.ejs` directly in the browser**; Express must render it.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for Linux commands and common errors.
