# FSD2 Lab — Program Paths

This file is the **single path reference** for the complete FSD2 lab repository.

Use it in VS Code like this:

```text
Open FSD2-LAB-SYLLABUS
        ↓
Choose the experiment
        ↓
Open the exact path below
        ↓
Run the listed command
        ↓
Open the shown URL or read the terminal output
```

## Experiments 01–04 — ExpressJS

| Experiment | Main source path | Supporting path | Run command | Runtime/API path |
|---|---|---|---|---|
| 01 | `01-express-routing-http-methods-middleware/app.js` | — | `node 01-express-routing-http-methods-middleware/app.js` | `http://localhost:3001/` |
| 02 | `02-express-templating-form-data/app.js` | `02-express-templating-form-data/views/index.ejs` | `node 02-express-templating-form-data/app.js` | `http://localhost:3002/` |
| 03 | `03-express-cookies-sessions-authentication/app.js` | — | `node 03-express-cookies-sessions-authentication/app.js` | `http://localhost:3003/` |
| 04 | `04-express-database-rest-api/server.js` | MongoDB connection | `node 04-express-database-rest-api/server.js` | `http://localhost:3004/` |

### Experiment 01 routes

```text
GET    /
GET    /students
GET    /students/:id
GET    /search?name=Rama
GET    /build-url
POST   /students
DELETE /students/:id
```

### Experiment 02 routes

```text
GET  /
POST /submit
```

### Experiment 03 paths

```text
GET  /
POST /login
GET  /profile
GET  /logout
```

### Experiment 04 API paths

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Experiments 05–09 — ReactJS

| Experiment | Main source path | Supporting paths | Run command | Browser path |
|---|---|---|---|---|
| 05 | `05-react-render-html-jsx-components/src/main.jsx` | `05-react-render-html-jsx-components/src/StudentCard.jsx` | `npm run react05` | Vite URL shown in terminal |
| 06 | `06-react-props-states-styles-events/src/main.jsx` | `Counter.jsx`, `Counter.module.css`, `App.scss` | `npm run react06` | Vite URL shown in terminal |
| 07 | `07-react-conditional-lists-forms/src/main.jsx` | — | `npm run react07` | Vite URL shown in terminal |
| 08 | `08-react-router-updating-screen/src/main.jsx` | — | `npm run react08` | Vite URL shown in terminal |
| 09 | `09-react-hooks-sharing-data/src/main.jsx` | — | `npm run react09` | Vite URL shown in terminal |

### Experiment 08 React Router paths

```text
/          → Home
/about     → About
/counter   → Counter
```

---

## Experiments 10–11 — MongoDB

| Experiment | Main source path | Run command | Output |
|---|---|---|---|
| 10 | `10-mongodb-installation-configuration-crud/queries.js` | `mongosh < 10-mongodb-installation-configuration-crud/queries.js` | mongosh terminal / MongoDB Compass |
| 11 | `11-mongodb-databases-collections-records/queries.js` | `mongosh < 11-mongodb-databases-collections-records/queries.js` | mongosh terminal / MongoDB Compass |

---

## Experiment 12 — Augmented Programs

| Program | Main source path | Run command | Runtime path |
|---|---|---|---|
| 12A — Node + Express To-do | `12-augmented-programs-todo-and-quiz/todo-node-express/server.js` | `node 12-augmented-programs-todo-and-quiz/todo-node-express/server.js` | `http://localhost:3012/` |
| 12B — React Quiz | `12-augmented-programs-todo-and-quiz/quiz-react/src/main.jsx` | `npx vite --root 12-augmented-programs-todo-and-quiz/quiz-react` | Vite URL shown in terminal |

### Experiment 12A API paths

```text
GET    /api/todos
POST   /api/todos
PATCH  /api/todos/:id
DELETE /api/todos/:id
```

---

## VS Code path rule

All paths in this file are **relative to the repository root**:

```text
FSD2-LAB-SYLLABUS/
```

For example:

```text
FSD2-LAB-SYLLABUS/
└── 06-react-props-states-styles-events/
    └── src/
        └── main.jsx
```

Open the repository root once in VS Code; then use the relative paths above in the Explorer or terminal.
