# FSD2 Practical Exam Handbook — Linux + VS Code

This is the exam-time operating guide for the **Vishnu Institute of Technology R-23 FSD2 syllabus**. It follows the syllabus' 12 experiments and the handouts uploaded for Experiments 3, 6, 7, 8, 9, 10 and 11.

## 1. The exam method — do this for every question

1. Read the question and identify the experiment number and syllabus part (a/b/c).
2. Find that experiment in the table below. Use the exact path and command listed; do not invent filenames.
3. Keep the shown folder/file structure. If the program uses more than one file, create every listed file at the exact path.
4. Open VS Code's terminal at the repository root. Install dependencies once using `npm install`.
5. Run the command for only the selected program. Copy the output from the terminal or open the printed localhost URL in the browser.
6. If it fails, use the troubleshooting section near the end before changing any code.

**Do not paste React JSX into a plain Node file, do not run a .jsx file using `node`, do not open an .ejs file directly in a browser, and do not type MongoDB shell syntax into a JavaScript/Node terminal.** The run command depends on the program type.

## 2. One-time Linux lab setup

Open the cloned repository folder in VS Code, then choose **Terminal → New Terminal**.

Check tools:

```bash
node --version
npm --version
git --version
```

Install the root dependencies once:

```bash
npm install
```

If you have not cloned the repository yet:

```bash
git clone https://github.com/shiva31rama-cell/FSD2-LAB-SYLLABUS.git
cd FSD2-LAB-SYLLABUS
code .
npm install
```

If `code .` is not configured in your Linux machine, open VS Code first and select **File → Open Folder**, then choose `FSD2-LAB-SYLLABUS`.

Update an existing checkout before the exam:

```bash
git checkout main
git pull origin main
npm install
```

### Fast command selection

| Technology        | Run style                                                           | Where output appears                      |
| ----------------- | ------------------------------------------------------------------- | ----------------------------------------- |
| Express / Node    | `node path/to/program.js`                                           | Terminal + browser at localhost           |
| React / JSX       | `npm run reactNN`                                                   | Browser at the Vite URL shown in terminal |
| MongoDB shell     | `mongosh --file path/to/queries.js`                                 | mongosh terminal                          |
| Express + MongoDB | Start MongoDB first, then `node path/to/server.js`                  | Terminal + browser/API                    |
| Build/check only  | `node --check path/to/file.js` or `npx vite build <project-folder>` | Terminal                                  |

## 3. Experiment-by-experiment exam index

The "file count" includes the program's own HTML/JS/JSX/CSS/view files; Node modules are installed once at repository root and are not files you manually create. These are the paths committed in this repository.

### Experiment 01 — ExpressJS routing, HTTP methods and middleware

**Aim:** Demonstrate route definitions, route parameters, query parameters, URL building, accepting/retrieving/deleting data, and middleware.

**Files needed:** 1 — `01-express-routing-http-methods-middleware/app.js`.

Run:

```bash
node 01-express-routing-http-methods-middleware/app.js
```

Open `http://localhost:3001/`.

Try these browser URLs:

```text
/                   → FSD2 Express Lab is running
/students           → list of student records
/students/1         → route parameter example
/students/99        → Student not found
/search?name=Rama   → { "searchedName": "Rama" }
/build-url          → URL containing /students/1
```

For the HTTP methods, use the terminal with curl:

```bash
curl http://localhost:3001/students
curl "http://localhost:3001/search?name=Rama"
curl -X POST http://localhost:3001/students -H 'Content-Type: application/json' -d '{"name":"Anitha"}'
curl http://localhost:3001/students
curl -X DELETE http://localhost:3001/students/1
```

Middleware log lines appear in the server terminal, for example `[GET] /`. Data is held in memory and is reset when the Node server restarts.

### Experiment 02 — ExpressJS templating and form data

**Aim:** Use EJS to render HTML and process submitted form values.

**Files needed:** 2 — `02-express-templating-form-data/app.js` and `02-express-templating-form-data/views/index.ejs`.

Run:

```bash
node 02-express-templating-form-data/app.js
```

Open `http://localhost:3002/`. Enter name `Anitha`, select `FSD2`, then submit. Expected result page:

```text
Form Result
Hello Anitha. Course: FSD2
```

**Important:** Keep `views/index.ejs` inside the `views` folder. Do not double-click/open the EJS template as a standalone browser page. Express renders it.

### Experiment 03 — ExpressJS cookies, sessions and authentication

There are **two independently runnable parts** in the repository.

#### 03(a) Cookies and sessions

**Files needed:** 1 — `03-express-cookies-sessions-authentication/app.js`.

```bash
node 03-express-cookies-sessions-authentication/app.js
```

Open `http://localhost:3003/`; click **Set cookie**, then **Read cookie**. The output should include `Cookie value: GuestUser`. Open `/visit` twice: the first visit welcomes you and later visits show an increasing number. Open `/destroy-session` to clear the session.

#### 03(b) Password hashing and protected login

**Files needed:** 3 — `03-express-cookies-sessions-authentication/auth-app.js`, `views/login.ejs`, `views/dashboard.ejs`.

```bash
node 03-express-cookies-sessions-authentication/auth-app.js
```

Open `http://localhost:3001/login`.

Classroom sample login: username `admin`, password `password123`. Successful login redirects to the dashboard. A wrong username/password displays an error. Logout destroys the session.

These are classroom examples, not production authentication. Do not use real passwords in exam demos, and never commit real secrets.

### Experiment 04 — ExpressJS, Mongoose CRUD and RESTful API / SPA

**Aim:** Connect MongoDB with Mongoose, then create/read/update/delete products through a REST API and a browser UI.

**Files needed:** 1 — `04-express-database-rest-api/server.js`.

The default URI is local MongoDB at `mongodb://127.0.0.1:27017/fsd2lab`. If the lab is configured for Atlas, set the connection string in the terminal without committing it:

```bash
export MONGO_URI='paste-your-own-atlas-connection-string-here'
node 04-express-database-rest-api/server.js
```

For a local database, just run:

```bash
node 04-express-database-rest-api/server.js
```

Open `http://localhost:3004/`. Enter product name `Notebook` and price `50`, then click **Add product**. The list should show the item. **Edit** and **Delete** test PUT and DELETE.

API routes:

```text
GET    /api/health
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

If MongoDB is unavailable, the server prints a connection failure and stops instead of pretending the API is connected.

### Experiment 05 — React HTML, JSX, function and class components

**Files needed:** 3 main source files — `05-react-render-html-jsx-components/index.html`, `src/main.jsx`, `src/StudentCard.jsx`.

Run:

```bash
npm run react05
```

Open the Vite URL shown in the terminal. The page shows a React JSX heading, a function component, a class component and a student card receiving props. The sample card displays a CSE student with year and CGPA data.

For the lab-record subparts:

- **HTML in browser:** `index.html` hosts the HTML page and the React root element.
- **JSX markup:** `src/main.jsx` returns JSX from React components.
- **Nested function/class components:** `FunctionCard`, `ClassCard` and `StudentCard` are rendered inside the main App component.

### Experiment 06 — React props, state, styles and events

**Files needed:** 7 — `index.html`, `src/main.jsx`, `src/StudentCard.jsx`, `src/StudentCard.module.css`, `src/Counter.jsx`, `src/Counter.module.css`, `src/App.scss`.

Run:

```bash
npm run react06
```

The browser shows Anitha and Ravi cards using props and a counter starting at 0. Click **Increment**, **Decrement**, and **Reset**. The Sass variable in `App.scss` controls the shared theme color; CSS Modules style the StudentCard and Counter separately.

Remember for viva: **props are read-only inputs from a parent; state is data owned and updated by a component using a setter such as `setCount`.**

### Experiment 07 — React conditional rendering, lists and forms

**Files needed:** 7 — `index.html`, the experiment `package.json`, `src/main.jsx`, `src/App.jsx`, and `src/components/ConditionalDemo.jsx`, `ListDemo.jsx`, `RegistrationForm.jsx`.

Run:

```bash
npm run react07
```

This page demonstrates the handout's key groups:

- **Conditional rendering:** if/else behavior, ternary, `&&`, and a role selection.
- **Lists:** `map()`, stable keys, branch filter and remove.
- **Forms:** controlled name/email/password/age/date/select/radio/checkbox/textarea fields; validation; Submit and Reset.

Try filtering by CSE/ECE, removing a row, hiding/showing details and submitting the form with blank required fields. Fix the validation messages, agree to the checkbox, and submit again.

### Experiment 08 — React Router and updating the screen

The two handout parts each have their **own Vite root**, so you can run either one by itself.

#### 08(a) React Router — Student Portal

**Files needed:** 9. Main root: `08-react-router-updating-screen/part-a-routing/`; contains `index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/Navbar.jsx`, and five files in `src/pages/` (`Home.jsx`, `Students.jsx`, `StudentDetail.jsx`, `About.jsx`, `NotFound.jsx`).

```bash
npm run react08a
```

Use the printed URL. Test Home, Students and About. Click Anitha in the Students list; the URL becomes `/students/1` and her details appear. The Back to Students button demonstrates `useNavigate()`. Try `/xyz` to see the 404 page. The student detail uses `useParams()`.

#### 08(b) Updating the Screen

**Files needed:** 5 — `part-b-updating-screen/index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/Counter.jsx`, `src/components/Clock.jsx`.

```bash
npm run react08b
```

Click **+1 three times (naive)**: the count increases by only one. Click **+1 three times (functional update)**: the count increases by three. Reset it, then watch the clock update every second. The clock's `useEffect` cleanup stops the interval when the component is removed.

### Experiment 09 — React hooks and sharing data

Again, the two handout parts have separate roots.

#### 09(a) Importance of Hooks

**Files needed:** 5 — `part-a-hooks/index.html`, `src/main.jsx`, `src/App.jsx`, `src/components/ClassCounter.jsx`, `src/components/HookCounter.jsx`.

```bash
npm run react09a
```

Both counters start at 0. Click each Increment button; both values increase. Compare class state/`this.setState()` with function component state/`useState()`.

#### 09(b) Sharing Data Between Components

**Files needed:** 8 — `part-b-sharing-data/index.html`, `src/main.jsx`, `src/App.jsx`, `src/context/ThemeContext.jsx`, and `src/components/Parent.jsx`, `Display.jsx`, `Buttons.jsx`, `ThemedBox.jsx`.

```bash
npm run react09b
```

Click Increment. Parent owns the count and passes it to Display, while Buttons calls a callback. Click Toggle Theme to switch between light and dark. ThemedBox reads the shared value via Context, without receiving it through props.

### Experiment 10 — MongoDB installation, Atlas and CRUD

**Program file:** `10-mongodb-installation-configuration-crud/queries.js`.

**Prerequisite:** MongoDB Community Server or a working Atlas cluster, and the `mongosh` executable. The shell commands from the handout run **inside mongosh**, not in the Node REPL.

Check the shell:

```bash
mongosh --version
```

For local MongoDB, start the service and confirm `mongosh` connects:

```bash
sudo systemctl status mongod
sudo systemctl start mongod
mongosh
```

Run the script after exiting any interactive shell, from the repository root:

```bash
mongosh --file 10-mongodb-installation-configuration-crud/queries.js
```

It selects `fsdLab`, loads five sample students, and demonstrates `insert()`, `find()`, filters/projections, `update()` with `$set` / `$inc` / upsert, and `remove()`; modern replacements are shown in comments. Confirm changes with the final `find()` and count.

For Atlas, pass your own URI to `mongosh` before `--file`; do not save your real URI/password in a tracked file. Example: `mongosh "YOUR_ATLAS_URI" --file 10-mongodb-installation-configuration-crud/queries.js`. See the Experiment 10 README for authentication, IP allow-list and DNS fixes.

### Experiment 11 — MongoDB databases, collections and records

**Program file:** `11-mongodb-databases-collections-records/queries.js`.

Run:

```bash
mongosh --file 11-mongodb-databases-collections-records/queries.js
```

The program selects `college`, creates collections as needed and loads the handout's eight students (roll numbers 101–108). It demonstrates:

- create/list databases and collections;
- `find()`, filters, projections, `findOne()`, `countDocuments()`;
- `limit()`, `skip()`, `sort()`;
- name, compound and unique indexes;
- aggregation using `$match`, `$group`, `$max`, `$avg`, `$push`, `$project`, `$sort`, `$limit`, `$count`.

The script reloads only its sample `college.students` data to keep repeated runs predictable. Database/collection drop commands are left commented out because they permanently delete data. If the exam question explicitly asks to drop a collection/database, open an interactive `mongosh`, run `db.getName()` to verify the selected database, then use `db.courses.drop()` or `db.dropDatabase()` only when it is safe to delete that data.

### Experiment 12 — Augmented programs

The R-23 syllabus lists NodeJS + Express To-do, React Quiz and MongoDB University certification as augmented options.

#### 12(a) Node + Express To-do

**File count:** 1 — `12-augmented-programs-todo-and-quiz/todo-node-express/server.js`.

```bash
node 12-augmented-programs-todo-and-quiz/todo-node-express/server.js
```

Open `http://localhost:3012/`. Add a task, toggle it to done, and delete it. The app uses a small in-memory array, so restarting the server resets tasks.

#### 12(b) React Quiz

**Files needed:** 3 — `quiz-react/index.html`, `quiz-react/src/main.jsx` and its project folder; dependencies come from the root package.

```bash
npm run react12b
```

Choose an option for each of three questions. The last screen shows `Final Score: N / 3`.

#### 12(c) MongoDB University

This is the syllabus' certification alternative, not a local program to start with Node. Use the official learning path linked in `12-augmented-programs-todo-and-quiz/CERTIFICATION_GUIDE.md`.

## 4. Exam answer format (write in lab record)

For any experiment, use the following headings if your lab record/practical asks for them:

1. **Aim:** one sentence copied from the experiment objective.
2. **Requirements:** Node.js/Express, React/Vite, or MongoDB/mongosh, as applicable.
3. **Files:** list the exact file paths.
4. **Procedure:** create/open files, install dependencies once, run the exact command.
5. **Program:** use the matching source file(s) from the repository.
6. **Output:** record the terminal message, browser result or mongosh result.
7. **Result:** “Thus the required FSD2 program was implemented and executed successfully.”
8. **Viva:** be prepared to explain the highlighted core concept (middleware, EJS, cookies/session, REST, props/state, controlled inputs, routing, hooks/context, CRUD/index/aggregation).

Do not use a real Atlas URI/password in screenshots or source files.

## 5. Linux + VS Code troubleshooting cookbook

### A. `Cannot find module 'express'` / `Cannot find package 'vite'`

Run from repository root:

```bash
pwd
npm install
npm ls express vite react react-dom mongoose
```

If running from the wrong directory, `cd` to `FSD2-LAB-SYLLABUS`. Root `node_modules` is installed there. Do not run `npm install` in random subfolders.

### B. Syntax error in a Node/Express program

Check the file before running it:

```bash
node --check 01-express-routing-http-methods-middleware/app.js
node --check 02-express-templating-form-data/app.js
node --check 03-express-cookies-sessions-authentication/app.js
node --check 03-express-cookies-sessions-authentication/auth-app.js
node --check 04-express-database-rest-api/server.js
node --check 12-augmented-programs-todo-and-quiz/todo-node-express/server.js
```

Read the reported file and line number. Common causes: missing `)`, `}`, quote, or comma. Fix that line, save, rerun `node --check path/to/file.js`.

### C. React blank screen / import cannot be resolved

1. Read the first red error in the browser Developer Tools Console and the Vite terminal.
2. Check exact case: Linux treats `StudentCard.jsx` and `studentcard.jsx` as different names.
3. Check that every imported file exists at the relative path.
4. Restart Vite with Ctrl+C, then rerun the exact command.
5. If needed, build to see compile errors:

```bash
npx vite build 05-react-render-html-jsx-components
npx vite build 06-react-props-states-styles-events
npx vite build 07-react-conditional-lists-forms
npx vite build 08-react-router-updating-screen/part-a-routing
npx vite build 08-react-router-updating-screen/part-b-updating-screen
npx vite build 09-react-hooks-sharing-data/part-a-hooks
npx vite build 09-react-hooks-sharing-data/part-b-sharing-data
npx vite build 12-augmented-programs-todo-and-quiz/quiz-react
```

### D. `EADDRINUSE: address already in use`

A previous server is still using the port. Find the process (example port 3001):

```bash
sudo lsof -i :3001
```

Stop only the process ID shown by that command:

```bash
kill <PID>
```

Replace `<PID>` with the numeric PID. Or press Ctrl+C in the terminal where that server is already running. Do not blindly kill every Node process, as you could stop another lab.

### E. Browser says site cannot be reached

Check the server terminal first. Ensure it prints the correct URL and remains running. Use `http://localhost:PORT` on the same lab computer. If the server exited, fix its displayed error and start it again.

### F. MongoDB says `ECONNREFUSED 127.0.0.1:27017`

That means the local MongoDB service is not available at the default address. Run:

```bash
sudo systemctl status mongod
sudo systemctl start mongod
mongosh
```

If your lab machine does not have MongoDB installed or you do not have service permissions, use an approved Atlas connection instead; a Node program cannot access Atlas without a valid URI, network access and credentials.

### G. Atlas: authentication failed / timeout / `querySrv ENOTFOUND`

- Authentication failed: verify the Atlas **database user** username/password and URL encoding; it is not necessarily your website login.
- Timeout: allow the lab computer's current public IP in Atlas Network Access and check connectivity.
- `querySrv ENOTFOUND`: copy the cluster hostname again; check for spelling/network DNS issues.
- Never paste the real password into GitHub or this handbook. Use an environment variable in the current terminal.

### H. MongoDB script gives an “already exists” error

The maintained Experiment 11 file checks for the sample collections before creating them and reloads the sample students. If you are manually typing commands, check the selected database first:

```javascript
db.getName()
show collections
```

Do not run `dropDatabase()` just to remove an error; it permanently removes every collection in the selected database.

### I. `npm ci` complains that package.json and package-lock.json disagree

For this repo's exam workflow, use `npm install` to reconcile the lock file with package.json, then retry. Do not delete package-lock just to bypass an error.

### J. Port or command confusion

- Use `npm run` to list available npm scripts.
- `npm run react08a` runs routing; `npm run react08b` runs screen updates.
- `npm run react09a` runs hooks; `npm run react09b` runs data sharing.
- `mongosh` commands belong in mongosh; `node` commands belong in a normal terminal.
- Stop any web server with Ctrl+C before switching experiments if you want to keep the terminal clear.

## 6. Quick checks before exam day

From the repository root:

```bash
npm install
npm run check:node
npm run react05 -- --host 127.0.0.1
```

Stop React with Ctrl+C, then test the command for the experiment being revised. MongoDB experiments should be tested in a reachable local MongoDB or Atlas environment before exam day; CI cannot verify your personal database credentials.

## 7. Related files

- [Lab path map](LAB_PATHS.md)
- [Repository README](README.md)
- [Experiment 03 README](03-express-cookies-sessions-authentication/README.md)
- [Experiment 08 README](08-react-router-updating-screen/README.md)
- [Experiment 09 README](09-react-hooks-sharing-data/README.md)
- [Experiment 10 README](10-mongodb-installation-configuration-crud/README.md)
- [Experiment 11 README](11-mongodb-databases-collections-records/README.md)
