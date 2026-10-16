# Experiment 08 — React Router and Updating the Screen

This experiment has two independently runnable programs, matching parts (a) and (b) in the uploaded handout. Both use the root repository dependencies; do not install packages inside these subfolders.

## Part (a) — Student Portal using React Router

**Main path:** `08-react-router-updating-screen/part-a-routing/src/main.jsx`

Files (9 total): `index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/Navbar.jsx`, and `src/pages/Home.jsx`, `Students.jsx`, `StudentDetail.jsx`, `About.jsx`, `NotFound.jsx`.

Run:

```bash
npm run react08a
```

Try `/`, `/students`, `/students/1`, `/about` and a made-up route such as `/xyz`. The student detail reads the dynamic `:id` with `useParams()`; Back to Students uses `useNavigate()`. Unknown paths show the 404 component.

## Part (b) — Updating the Screen

**Main path:** `08-react-router-updating-screen/part-b-updating-screen/src/main.jsx`

Files (5 total): `index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/Counter.jsx`, `src/components/Clock.jsx`.

Run:

```bash
npm run react08b
```

Click the naive +1 three-times button and watch the count increase by only one. Click the functional-updater button and watch it increase by three. The live clock updates once per second with `useEffect()` and stops its timer during cleanup.

## Quick output

- Router program: Home / Students / About navigation, student detail pages and 404 page.
- Screen update program: counter plus a live clock.

## Linux / build check

```bash
npm install
npx vite build 08-react-router-updating-screen/part-a-routing
npx vite build 08-react-router-updating-screen/part-b-updating-screen
```

See [EXAM_HANDBOOK.md](../EXAM_HANDBOOK.md) for the complete exam workflow and error remedies.
