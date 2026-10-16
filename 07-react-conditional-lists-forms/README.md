# Experiment 07 — React Conditional Rendering, Lists and Forms

This experiment follows the three parts in the official handout.

## Main path

`07-react-conditional-lists-forms/src/main.jsx`

## Run

From the repository root:

```bash
npm install
npm run react07
```

Open the Vite URL shown in the terminal.

## Part A — Conditional rendering

Demonstrates login/logout with if/else behavior, a ternary expression for details, logical AND for unread messages, and a role panel for student/faculty/admin.

## Part B — Lists

Renders a student list using `map()` and stable keys, filters students by branch with `filter()`, and removes a student without mutating the previous state array.

## Part C — Controlled form

Demonstrates text, email, password, number, date, select, radio, checkbox and textarea fields. A shared change handler updates React state. Submit validates required name/email/checkbox fields; Reset clears the form.

## What to test

1. Log in and log out in the conditional section.
2. Show and hide details, mark unread messages as read, and switch roles.
3. Filter students by CSE/ECE and remove a student.
4. Submit the form empty to see validation messages; fill required fields and check the agreement to submit successfully.
