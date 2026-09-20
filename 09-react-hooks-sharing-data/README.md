# Experiment 09 — React Hooks and Sharing Data

## What is this?

This experiment demonstrates React hooks and sharing data between components with Context.

## What can it do?

- Store data using useState().
- Run an interval using useEffect().
- Share a name through React Context.
- Read shared data inside a child component with useContext().

## Main concepts

| Hook / API | Purpose |
| --- | --- |
| useState() | Stores component state |
| useEffect() | Runs side effects |
| createContext() | Creates shared data context |
| useContext() | Reads shared context |
| cleanup function | Clears the timer |

## File structure

```text
09-react-hooks-sharing-data/
├── index.html
└── src/
    └── main.jsx
```

## VS Code path

Main React entry path:

```text
09-react-hooks-sharing-data/src/main.jsx
```

Complete experiment folder:

```text
09-react-hooks-sharing-data/
```

## Run

```bash
npm run react09
```

Open the Vite URL shown in the terminal.

## Expected behavior

- Edit the name in the input.
- The child component receives the updated shared name.
- The timer increases every second.

## Why hooks?

Hooks let function components use state, effects and context without switching to class components.
