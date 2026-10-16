# Experiment 06 — React Props, State, Styles and Events

## Aim

Use props to pass data, `useState` to update component state, event handlers to respond to clicks, and CSS Modules/Sass to style the UI.

## Files needed

**Seven files:**

```text
06-react-props-states-styles-events/
├── index.html
└── src/
    ├── main.jsx
    ├── StudentCard.jsx
    ├── StudentCard.module.css
    ├── Counter.jsx
    ├── Counter.module.css
    └── App.scss
```

## Run

```bash
npm run react06
```

Open the Vite URL in the terminal. Two StudentCard components show Anitha (CSE) and Ravi (ECE) as prop examples. The counter starts at zero.

- **Increment:** add 1
- **Decrement:** subtract 1
- **Reset:** return to zero

## Core theory

Props are read-only values passed from parent to child. State is component-owned data changed with a setter such as `setCount`. Event handlers call the setter; React re-renders. CSS Modules scope component classes and Sass supplies theme styles.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for file counts and troubleshooting.
