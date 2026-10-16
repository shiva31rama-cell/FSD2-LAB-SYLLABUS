# FSD2 Lab Run Guide

## Recommended order

1. Open the repository root `FSD2-LAB-SYLLABUS` in VS Code.
2. Open **Terminal → New Terminal**.
3. Run `npm install` once.
4. Find the question's experiment and syllabus part in [LAB_PATHS.md](LAB_PATHS.md).
5. Run the exact command from that table; don't run React JSX with Node or MongoDB shell syntax in the Node REPL.

## The complete guide

**[Open EXAM_HANDBOOK.md](EXAM_HANDBOOK.md)** for the complete exam workflow, file counts, expected outputs, sample values, all 12 experiments, separate Experiment 8/9 part commands, Linux commands, MongoDB/Atlas setup and error fixes.

## Quick commands

```bash
# Install dependencies once, from the repository root
npm install

# React programs
npm run react05
npm run react06
npm run react07
npm run react08a
npm run react08b
npm run react09a
npm run react09b
npm run react12b

# Check Node program syntax before running it
node --check 01-express-routing-http-methods-middleware/app.js

# MongoDB shell programs
mongosh < 10-mongodb-installation-configuration-crud/queries.js
mongosh < 11-mongodb-databases-collections-records/queries.js
```

## Common rules

- Express/Node files run with `node` and print a localhost URL.
- React/JSX apps run with Vite; open the URL printed by Vite.
- EJS files must be rendered by Express, not opened directly.
- MongoDB query files run in `mongosh`; MongoDB must be reachable.
- Use Ctrl+C to stop a running server before switching programs.

For `MODULE_NOT_FOUND`, run `npm install` at repository root. For a syntax error, run `node --check path/to/file.js`. For a port conflict, inspect `sudo lsof -i :PORT` and stop only the process using that port. For database/Atlas issues, follow the MongoDB troubleshooting section in the Exam Handbook.
