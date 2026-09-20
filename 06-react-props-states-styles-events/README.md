# Experiment 06 — ReactJS Props, State, Styles and Events

## What is this?

This experiment demonstrates how React components receive data, store state, respond to events and use CSS/Sass.

## What can it do?

- Receive a prop in the Student component.
- Store counter data using useState().
- Increment, decrement and double the counter.
- Prevent decrement below zero.
- Apply Sass theme styling.
- Use a CSS Module for Counter-specific styles.

## Main concepts

| Concept | Example |
| --- | --- |
| Props | name="Rama" |
| State | useState(0) |
| Event | onClick |
| Sass | $primary-color |
| CSS Module | Counter.module.css |

## Important behavior

The Decrement button is disabled when the count is zero.

The Double button changes:

```text
count → count × 2
```

The theme color is shared through:

```text
Sass variable
→ CSS custom property
→ Counter CSS Module
```

## File structure

```text
06-react-props-states-styles-events/
├── index.html
└── src/
    ├── main.jsx
    ├── Counter.jsx
    ├── Counter.module.css
    └── App.scss
```

## VS Code path

React project:

```text
06-react-props-states-styles-events/
├── index.html
└── src/
    ├── main.jsx
    ├── Counter.jsx
    ├── Counter.module.css
    └── App.scss
```

Main React entry path:

```text
06-react-props-states-styles-events/src/main.jsx
```

Counter component path:

```text
06-react-props-states-styles-events/src/Counter.jsx
```

## Run

```bash
npm run react06
```

Open the Vite URL shown in the terminal.
