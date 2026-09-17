# ReactJS Props, State, Styles and Events

## Syllabus tasks
- Work with props and states.
- Add CSS and Sass styling and display data.
- Respond to events.

## Additional code implemented
1. **Double button** — sets `count` to `count * 2`.
2. **Disable Decrement at zero** — uses `disabled={count === 0}` so the count cannot go negative.
3. **Sass theme color** — `$primary-color` is defined in `App.scss` and is shared through `--primary-color` with the Counter CSS Module.
4. **Second CSS Module** — `Counter.module.css` replaces the old global `demo-box` styling. Vite scopes the generated class name in the browser.

> Note: changing `$primary-color` changes the h2 border, `.section-title` text, and Counter border color together. The Counter `border-radius` is a separate size property, so changing a color does not change its radius.

## Run
`npm run react06` → open the URL shown by Vite.
