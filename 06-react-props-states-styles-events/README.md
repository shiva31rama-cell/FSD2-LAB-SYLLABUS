# Experiment 06 — React Props, State, Styles and Events

This experiment follows the handout's three goals: props, state/event handling, and styling with CSS Modules plus Sass.

## Main paths

- `06-react-props-states-styles-events/src/main.jsx` — app entry and props examples
- `06-react-props-states-styles-events/src/StudentCard.jsx` — reusable component receiving props
- `06-react-props-states-styles-events/src/StudentCard.module.css` — component-scoped styles
- `06-react-props-states-styles-events/src/Counter.jsx` — `useState` and click events
- `06-react-props-states-styles-events/src/Counter.module.css` — counter styles
- `06-react-props-states-styles-events/src/App.scss` — Sass variables and layout styles

## Run

From the repository root:

```bash
npm install
npm run react06
```

Open the Vite URL shown in the terminal.

## Expected behavior

- Two StudentCard instances display Anitha and Ravi using props.
- Counter begins at 0.
- Increment adds one; Decrement subtracts one; Reset returns the value to zero.
- CSS Modules scope card/counter styles; Sass supplies reusable theme variables.

## Key distinction

Props are read-only values passed from the parent. State is owned by a component and updated through a setter such as `setCount`.
