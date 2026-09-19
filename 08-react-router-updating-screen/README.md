# Experiment 08 — React Router and Updating the Screen

## What is this?

This experiment introduces client-side routing and shows how changing state updates the React screen.

## What can it do?

- Navigate between Home, About and Counter screens.
- Use React Router links without a full page reload.
- Store counter state using useState().
- Re-render the screen when state changes.

## Routes

```text
/          → Home
/about     → About
/counter   → Counter
```

## Main concepts

| Concept | Purpose |
| --- | --- |
| BrowserRouter | Enables client-side routing |
| Link | Navigates between routes |
| Routes | Holds route definitions |
| Route | Connects a path to a component |
| State | Causes the screen to update |

## Run

```bash
npm run react08
```

Open the Vite URL shown in the terminal.

## Basic flow

Click Link
→ React Router changes the route
→ Matching component renders
→ Counter state updates the screen
