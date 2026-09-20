# Experiment 12 — NodeJS To-do and React Quiz

## What is this?

Experiment 12 contains two small applications that combine the concepts learned in the earlier experiments.

## VS Code path

Experiment 12 contains two separate programs.

### Program A — Node + Express To-do

```text
12-augmented-programs-todo-and-quiz/todo-node-express/server.js
```

### Program B — React Quiz

```text
12-augmented-programs-todo-and-quiz/quiz-react/src/main.jsx
```

Quiz project folder:

```text
12-augmented-programs-todo-and-quiz/quiz-react/
```

## Program A — NodeJS + Express To-do

### What can it do?

- Create a to-do item.
- Display all items.
- Toggle an item's done status.
- Delete an item.
- Use REST endpoints with fetch().

### API

```text
GET    /api/todos
POST   /api/todos
PATCH  /api/todos/:id
DELETE /api/todos/:id
```

### Run

```bash
node 12-augmented-programs-todo-and-quiz/todo-node-express/server.js
```

Open:

```text
http://localhost:3012
```

## Program B — React Quiz

### What can it do?

- Display one question at a time.
- Show multiple-choice options.
- Track the score.
- Move to the next question.
- Display the final score.

### Run

```bash
npx vite --root 12-augmented-programs-todo-and-quiz/quiz-react
```

## File structure

```text
12-augmented-programs-todo-and-quiz/
├── README.md
├── todo-node-express/
│   └── server.js
└── quiz-react/
    ├── index.html
    └── src/
        └── main.jsx
```

## Learning focus

To-do:
Express + REST + fetch()

Quiz:
React + useState() + events + lists
