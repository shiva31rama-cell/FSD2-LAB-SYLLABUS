# Experiment 09 — React Hooks and Sharing Data Between Components

This experiment has two independently runnable parts, matching the uploaded handout.

## Part (a) — Why hooks?

**Main path:** `09-react-hooks-sharing-data/part-a-hooks/src/main.jsx`

Files (5 total): `index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/ClassCounter.jsx`, `src/components/HookCounter.jsx`.

Run:

```bash
npm run react09a
```

Both counters start at zero. Click Increment in each counter. Compare class `this.state` / `this.setState()` with function component `useState()`.

## Part (b) — Sharing data between components

**Main path:** `09-react-hooks-sharing-data/part-b-sharing-data/src/main.jsx`

Files (8 total): `index.html`, `src/main.jsx`, `src/App.jsx`, `src/context/ThemeContext.jsx`, and `src/components/Parent.jsx`, `Display.jsx`, `Buttons.jsx`, `ThemedBox.jsx`.

Run:

```bash
npm run react09b
```

Click Increment to see the parent-owned count update in Display. Click Toggle Theme to switch the ThemedBox between light and dark using Context without prop-drilling.

## Key concepts

- `useState`: local state in a function component.
- Lifting state up: place shared state in the closest common parent and pass values/callbacks to children.
- `createContext` / `useContext`: share a value across the component tree.
- Class vs function component: two ways shown side-by-side to explain why hooks are useful.

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for exact exam run commands and Linux troubleshooting.
