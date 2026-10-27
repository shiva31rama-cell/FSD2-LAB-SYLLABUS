# FSD2 LAB SYLLABUS — Vishnu Institute of Technology

A runnable, exam-oriented implementation of the **R-23 Full Stack Development – 2 syllabus**.

## Start here for your practical exam

**Read the [Exam Handbook](EXAM_HANDBOOK.md) first.** It answers the exam-day questions: how to start in Linux/VS Code, which exact file(s) to create/use for each experiment, how many files a part needs, exact run commands, sample inputs/outputs and commands for common runtime errors.

- [All program paths](LAB_PATHS.md)
- [Quick run guide](RUN_GUIDE.md)
- [Experiment 01 — Express Routes](01-express-routing-http-methods-middleware/README.md)
- [Experiment 03 — Cookies, Sessions, Authentication](03-express-cookies-sessions-authentication/README.md)
- [Experiment 04 — Mongoose CRUD + REST API](04-express-database-rest-api/README.md)
- [Experiment 06 — Props, State, Styling, Events](06-react-props-states-styles-events/README.md)
- [Experiment 07 — Conditional Rendering, Lists, Forms](07-react-conditional-lists-forms/README.md)
- [Experiment 08 — Router + Screen Updates](08-react-router-updating-screen/README.md)
- [Experiment 09 — Hooks + Sharing Data](09-react-hooks-sharing-data/README.md)
- [Experiment 10 — MongoDB/Atlas + CRUD](10-mongodb-installation-configuration-crud/README.md)
- [Experiment 11 — Databases, Collections, Records](11-mongodb-databases-collections-records/README.md)
- [Experiment 12 — To-do + Quiz](12-augmented-programs-todo-and-quiz/README.md)

## One-time Linux setup

```bash
git clone https://github.com/shiva31rama-cell/FSD2-LAB-SYLLABUS.git
cd FSD2-LAB-SYLLABUS
code .
npm install
```

Use `git checkout main && git pull origin main` first if you already cloned the repository before these updates.

## Run React programs separately

```bash
npm run react05
npm run react06
npm run react07
npm run react08a  # Part (a): Student Portal routes
npm run react08b  # Part (b): state updates + live clock
npm run react09a  # Part (a): class counter vs hook counter
npm run react09b  # Part (b): lifting state up + Context
npm run react12b  # React quiz
```

Express programs are run with `node path/to/file.js`; MongoDB query files run in `mongosh`. The Exam Handbook provides every specific command and expected outcome.

## Syllabus coverage

The 12 numbered experiment folders map to the VITB R-23 FSD2 syllabus: Express routing/methods/middleware, EJS/forms, cookies/sessions/authentication, Mongoose CRUD/REST SPA, React rendering/JSX/components, props/state/styles/events, conditional rendering/lists/forms, React Router/screen updates, hooks/data sharing, MongoDB Atlas/CRUD, databases/collections/records/index/aggregation, and the augmented To-do/Quiz/certification options.

## CI

GitHub Actions validates required paths, Node syntax and React builds (including independently runnable Experiment 8 and 9 parts). MongoDB runtime behavior still requires a reachable local server or the user's own valid Atlas connection.

## Extended learning material

The repository also contains course material, previews and other study branches. For practical exam work, start with `EXAM_HANDBOOK.md` and use the matching experiment README.

## Source code formatting

The repository uses Prettier for JavaScript, JSX, CSS/SCSS, HTML, JSON, and Markdown, plus Black for the Python material-generation script.

```bash
npm install
npm run format        # Format supported source and documentation files
npm run format:check  # Check formatting without changing files
python -m pip install black
black tools/generate_materials.py
```

Generated React `dist` bundles and generated PDF/PPT materials are intentionally excluded from source formatting.
