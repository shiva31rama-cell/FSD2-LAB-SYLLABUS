# FSD2 Lab — Complete Program Path Map

Read **[EXAM_HANDBOOK.md](EXAM_HANDBOOK.md)** first for file counts, exactly how to run each part, sample input/output and Linux troubleshooting.

Every path below is relative to repository root `FSD2-LAB-SYLLABUS/`. Install dependencies once from that root with `npm install`.

| Experiment | Syllabus part(s) | Main file(s) | Run command |
|---|---|---|---|
| 01 Express routes/methods/middleware | a, b, c in one demo | `01-express-routing-http-methods-middleware/app.js` | `node 01-express-routing-http-methods-middleware/app.js` |
| 02 Express template/form | a, b in one demo | `02-express-templating-form-data/app.js`, `views/index.ejs` | `node 02-express-templating-form-data/app.js` |
| 03a Cookies/sessions | a | `03-express-cookies-sessions-authentication/app.js` | `node 03-express-cookies-sessions-authentication/app.js` |
| 03b Authentication | b | `03-express-cookies-sessions-authentication/auth-app.js`, `views/login.ejs`, `views/dashboard.ejs` | `node 03-express-cookies-sessions-authentication/auth-app.js` |
| 04 Mongoose CRUD + REST SPA | a, b together | `04-express-database-rest-api/server.js` | `node 04-express-database-rest-api/server.js` |
| 05 React HTML/JSX/components | a, b, c in one demo | `05-react-render-html-jsx-components/index.html`, `src/main.jsx`, `src/StudentCard.jsx` | `npm run react05` |
| 06 Props/state/styles/events | a, b, c in one demo | `06-react-props-states-styles-events/src/main.jsx` plus Counter, StudentCard and styles | `npm run react06` |
| 07 Conditional/list/form | a, b, c in one demo | `07-react-conditional-lists-forms/src/main.jsx` | `npm run react07` |
| 08a React Router | a | `08-react-router-updating-screen/part-a-routing/` | `npm run react08a` |
| 08b Screen updates | b | `08-react-router-updating-screen/part-b-updating-screen/` | `npm run react08b` |
| 09a Importance of Hooks | a | `09-react-hooks-sharing-data/part-a-hooks/` | `npm run react09a` |
| 09b Sharing data | b | `09-react-hooks-sharing-data/part-b-sharing-data/` | `npm run react09b` |
| 10a MongoDB/Atlas setup | a | Manual setup in Experiment 10 README/handbook | `mongod --version`, `mongosh --version` |
| 10b CRUD queries | b | `10-mongodb-installation-configuration-crud/queries.js` | `mongosh < 10-mongodb-installation-configuration-crud/queries.js` |
| 11a Database/collection lifecycle | a | `11-mongodb-databases-collections-records/queries.js` (Part A section) | `mongosh < 11-mongodb-databases-collections-records/queries.js` |
| 11b Record queries/index/aggregation | b | Same `queries.js` (Part B section) | `mongosh < 11-mongodb-databases-collections-records/queries.js` |
| 12a To-do | a | `12-augmented-programs-todo-and-quiz/todo-node-express/server.js` | `node 12-augmented-programs-todo-and-quiz/todo-node-express/server.js` |
| 12b Quiz | b | `12-augmented-programs-todo-and-quiz/quiz-react/` | `npm run react12b` |
| 12c MongoDB learning certification | c | `12-augmented-programs-todo-and-quiz/CERTIFICATION_GUIDE.md` | Follow the documented online learning path |

## Local URLs

| Program | URL |
|---|---|
| Experiment 01 | `http://localhost:3001` |
| Experiment 02 | `http://localhost:3002` |
| Experiment 03(a) | `http://localhost:3003` |
| Experiment 03(b) | `http://localhost:3001/login` |
| Experiment 04 | `http://localhost:3004` |
| React 05–09 and React Quiz | Use the Vite URL printed in the terminal |
| Experiment 12(a) | `http://localhost:3012` |

## Safe exam reminders

- React `.jsx` files are run by Vite, **not** by `node`.
- `.ejs` files are rendered by Express; do not open them directly.
- MongoDB query files run in `mongosh`, not in a normal JavaScript REPL.
- Run one server at a time when reusing a port. Stop with Ctrl+C.
- See [EXAM_HANDBOOK.md](EXAM_HANDBOOK.md) for commands to diagnose `MODULE_NOT_FOUND`, `EADDRINUSE`, syntax, Vite import, local MongoDB and Atlas problems.
