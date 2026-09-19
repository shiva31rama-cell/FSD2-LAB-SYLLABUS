# Experiment 07 — Conditional Rendering, Lists and React Forms

## What is this?

This experiment demonstrates how React conditionally displays content, renders arrays as lists and handles controlled form inputs.

## What can it do?

- Show or hide a message.
- Render a student list using map().
- Track input values with useState().
- Display a live greeting while typing.
- Handle a form submission.
- Read the selected course.

## Main concepts

| Concept | Purpose |
| --- | --- |
| Conditional rendering | Show content when a condition is true |
| map() | Convert array data into JSX |
| Controlled input | React controls the input value |
| onChange | Updates state from user input |
| onSubmit | Handles form submission |

## File structure

```text
07-react-conditional-lists-forms/
├── index.html
├── package.json
└── src/
    └── main.jsx
```

## Run

```bash
npm run react07
```

Open the Vite URL shown in the terminal.

## Expected behavior

Type a name into the live greeting field:

```text
Hello, <name>!
```

Use Toggle Message to demonstrate conditional rendering.
