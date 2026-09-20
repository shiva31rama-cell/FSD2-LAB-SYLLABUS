# Experiment 05 — ReactJS, HTML, JSX and Components

## What is this?

This experiment introduces the React rendering process and shows how JSX and reusable components work.

## What can it do?

- Render React into the HTML root element.
- Display JavaScript values inside JSX.
- Create function components.
- Create a class component.
- Reuse StudentCard as a child component.
- Pass student information through props.

## Main concepts

| Concept | Meaning |
| --- | --- |
| JSX | HTML-like syntax inside JavaScript |
| Function component | JavaScript function that returns JSX |
| Class component | React component based on a class |
| Props | Data passed from parent to child |
| createRoot() | Connects React to the HTML page |

## File structure

```text
05-react-render-html-jsx-components/
├── index.html
└── src/
    ├── main.jsx
    └── StudentCard.jsx
```

## VS Code path

React project:

```text
05-react-render-html-jsx-components/
├── index.html
└── src/
    ├── main.jsx
    └── StudentCard.jsx
```

Main React entry path:

```text
05-react-render-html-jsx-components/src/main.jsx
```

Reusable component path:

```text
05-react-render-html-jsx-components/src/StudentCard.jsx
```

## Run

From the repository root:

```bash
npm run react05
```

Open the Vite URL shown in the terminal.

## Expected output

You should see:

- A React heading.
- A function component card.
- A class component card.
- A StudentCard showing the supplied props.

## Source files

- main.jsx — application entry point and components.
- StudentCard.jsx — reusable component.
- index.html — React root page.
