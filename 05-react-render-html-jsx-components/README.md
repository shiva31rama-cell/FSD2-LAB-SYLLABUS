# Experiment 05 — React HTML, JSX and Function/Class Components

## Aim

Render a page with React, write markup in JSX, and create/nest function and class components.

## Files needed

**Three core files:**

```text
05-react-render-html-jsx-components/
├── index.html
└── src/
    ├── main.jsx
    └── StudentCard.jsx
```

## Run

From repository root:

```bash
npm run react05
```

Open the Vite URL printed in the terminal.

## What you should see

- Heading: `React Render + JSX`
- A greeting for Rama
- A function component card
- A class component card
- A StudentCard showing a sample name, branch, year and CGPA

## Which file does what?

- `index.html` includes the root element where React displays the UI.
- `src/main.jsx` contains JSX and the function/class components; it calls `createRoot(...).render(...)`.
- `src/StudentCard.jsx` is a reusable component that receives props.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for the exam structure and quick fixes.
