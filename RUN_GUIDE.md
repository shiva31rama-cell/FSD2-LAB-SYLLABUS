# FSD2 Lab — Complete Run & Output Guide

This guide explains exactly what to do in VS Code for **every experiment**: where to open the project, which command to run, whether another file/service is required, where to see the output, and how the pieces connect.

The goal is simple: **Open code → install dependencies once → run the correct command → open the shown URL / MongoDB shell → enter the sample input → observe output.**


## Quick path map

Before running a program, use **[LAB_PATHS.md](LAB_PATHS.md)** to see the exact path from the repository root to the required file.

Example:

```text
FSD2-LAB-SYLLABUS
└── 06-react-props-states-styles-events
    └── src
        └── main.jsx
```

The individual experiment README files repeat their exact paths so you can navigate directly in the VS Code Explorer.

---

## 0. One-time setup

### Install these tools

- VS Code
- Node.js + npm
- MongoDB Community Server + `mongosh` for local MongoDB experiments
- A browser such as Chrome or Edge
- Optional: MongoDB Compass for visually inspecting databases
- Optional: Postman or VS Code Thunder Client for REST requests

### Open the repository in VS Code

1. Clone the repository if it is not already on your computer.
2. Open the folder `FSD2-LAB-SYLLABUS` in VS Code.
3. Open **Terminal → New Terminal**.
4. Run once from the repository root:

```bash
npm install
```

You do **not** need to run `npm install` before every experiment.

### General rule

- **Express / Node:** run a `.js` server with `node` and open the printed `localhost` URL.
- **React:** run Vite with the experiment's npm script and open the URL printed by Vite.
- **MongoDB:** run the `queries.js` file using `mongosh` and read the results in the terminal.
- **MongoDB + Express:** MongoDB must be running/accessible first; then start the Express server.

---

# Experiment 1 — Express Routing, HTTP Methods and Middleware

### Main file

`01-express-routing-http-methods-middleware/app.js`

### Run

From the repository root:

```bash
node 01-express-routing-http-methods-middleware/app.js
```

The terminal should show:

```text
Server: http://localhost:3001
```

### Open in browser

```text
http://localhost:3001/
```

### Try the routes

```text
GET  /                 → basic Express response
GET  /students         → all students
GET  /students/1       → route parameter example
GET  /search?name=Rama → query parameter example
GET  /build-url        → URL building example
```

For `POST` and `DELETE`, use Postman/Thunder Client because a normal browser address bar mainly sends GET requests.

Example POST:

```text
POST http://localhost:3001/students
Content-Type: application/json

{"name":"Roshni"}
```

Then open `/students` again to see the new student.

Example DELETE:

```text
DELETE http://localhost:3001/students/1
```

### Files/connections needed

No database or extra file is required. The student data is stored in memory inside `app.js`.

### Workflow

```text
VS Code app.js
     ↓
node app.js
     ↓
Express server :3001
     ↓
Browser / Postman
     ↓
Route + middleware
     ↓
JSON / text response
```

---

# Experiment 2 — Express Templating and Form Data

### Main files

- `02-express-templating-form-data/app.js`
- `02-express-templating-form-data/views/index.ejs`

### Important

`index.ejs` is required. **Do not open the EJS file directly in the browser.** Express loads it through the EJS view engine.

### Run

```bash
node 02-express-templating-form-data/app.js
```

Terminal:

```text
Server: http://localhost:3002
```

### Open

```text
http://localhost:3002/
```

Enter the form data and submit it.

### What happens

```text
Browser form
     ↓ POST /submit
Express app.js
     ↓
express.urlencoded() reads form data
     ↓
req.body.name / req.body.course
     ↓
res.render('index', {...})
     ↓
views/index.ejs
     ↓
Rendered HTML in browser
```

### Files/connections needed

`app.js` automatically finds the `views/index.ejs` template because the project uses EJS as its view engine. Keep the `views` folder beside `app.js`.

---

# Experiment 3 — Cookies, Sessions and Authentication

### Main file

`03-express-cookies-sessions-authentication/app.js`

### Run

```bash
node 03-express-cookies-sessions-authentication/app.js
```

Open:

```text
http://localhost:3003/
```

### Demo login

Use the credentials already provided by the lab program:

```text
Username: student
Password: 1234
```

After login, the program redirects to `/profile`.

### Test the flow

```text
http://localhost:3003/
        ↓
Login form
        ↓
POST /login
        ↓
Session + cookie created
        ↓
/profile
        ↓
Logout
```

### Files/connections needed

No external database is required. The program uses Express, `cookie-parser`, and `express-session`, which are installed by the root `npm install`.

---

# Experiment 4 — Mongoose, MongoDB CRUD and REST API

### Main file

`04-express-database-rest-api/server.js`

### This experiment needs MongoDB

You must have either:

1. MongoDB Community Server running locally, **or**
2. a MongoDB Atlas connection URI.

The program defaults to:

```text
mongodb://127.0.0.1:27017/fsd2lab
```

### Option A — Local MongoDB

Start MongoDB first. Then from the repository root run:

```bash
node 04-express-database-rest-api/server.js
```

Open:

```text
http://localhost:3004/
```

### Option B — MongoDB Atlas

In PowerShell, set the URI for the current terminal before starting the server:

```powershell
$env:MONGO_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
node 04-express-database-rest-api/server.js
```

Do not commit a real password or secret connection string into GitHub.

### REST endpoints

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Example POST body:

```json
{"name":"Pen","price":20}
```

### Workflow

```text
VS Code server.js
      ↓
Node + Express
      ↓
Mongoose
      ↓
MongoDB
      ↓
REST API
      ↓
Browser / Postman
      ↓
JSON output
```

### Files/connections needed

No separate model file is required. The Mongoose schema/model is defined inside `server.js`.

---

# Experiment 5 — React HTML, JSX and Function/Class Components

### Main folder

`05-react-render-html-jsx-components`

### Run

From the repository root:

```bash
npm run react05
```

Vite will print a local URL, normally similar to:

```text
http://localhost:5173/
```

Open the exact URL shown in the terminal.

### Files used

The React entry point is under:

```text
05-react-render-html-jsx-components/src/main.jsx
```

The project also contains reusable component code such as `StudentCard.jsx`.

### Workflow

```text
index.html
   ↓
src/main.jsx
   ↓
React components
   ↓
JSX rendered by React
   ↓
Vite development server
   ↓
Browser
```

### Important

Do **not** double-click `index.html` and expect the React development app to behave normally. Start Vite first.

---

# Experiment 6 — React Props, State, Styles and Events

### Run

```bash
npm run react06
```

Open the Vite URL printed in the terminal.

### What to test

1. Click **Increment** → count increases.
2. At zero, **Decrement** is disabled.
3. Increase the count and click **Decrement**.
4. Click **Double** → current count becomes `count × 2`.
5. Inspect the Counter element in DevTools → its CSS Module class is scoped/hashed.
6. Change `$primary-color` in `src/App.scss` and reload → the theme color is shared by the h2 border, `.section-title` text and Counter border color.

### Files connected

```text
src/main.jsx
   ├── Counter.jsx
   │      └── Counter.module.css
   └── App.scss
```

### Workflow

```text
User click
   ↓
React event handler
   ↓
setCount(...)
   ↓
State changes
   ↓
React re-renders
   ↓
Updated browser output
```

---

# Experiment 7 — Conditional Rendering, Lists and Forms

### Run

```bash
npm run react07
```

Open the Vite URL printed in the terminal.

### What to test

- Conditional rendering section
- Student list
- **Live Name Greeting** input
- React form

For the live greeting, type a name. The output should immediately change to:

```text
Hello, <your name>!
```

There is intentionally **no submit button** for the live greeting.

### Controlled input workflow

```text
Type in input
     ↓
onChange event
     ↓
setName(new value)
     ↓
name state changes
     ↓
React re-renders
     ↓
Hello, name!
```

### Files/connections needed

The React entry point is `07-react-conditional-lists-forms/src/main.jsx`. No database or external service is required.

---

# Experiment 8 — React Router and Updating Screen

### Run

```bash
npm run react08
```

Open the Vite URL printed in the terminal.

### What to test

Click the navigation links/buttons provided by the program and observe the screen changing without manually opening separate HTML files.

### Workflow

```text
Browser click
     ↓
React Router
     ↓
Route matches URL
     ↓
Correct React component
     ↓
Screen updates
```

### Files/connections needed

The project uses `react-router-dom`, already included in the root dependencies. No MongoDB connection is required.

---

# Experiment 9 — React Hooks and Sharing Data

### Run

```bash
npm run react09
```

Open the Vite URL printed in the terminal.

### What to observe

Interact with the controls and watch state/data move between the components according to the program.

### Workflow

```text
User action
    ↓
Hook / state update
    ↓
Parent or shared data changes
    ↓
React re-render
    ↓
Child component receives updated data
    ↓
Browser output changes
```

### Files/connections needed

Only the React project files are required. No database or external server is needed.

---

# Experiment 10 — MongoDB Installation, Configuration and CRUD

### Main file

`10-mongodb-installation-configuration-crud/queries.js`

### Run with mongosh

Make sure MongoDB is running, then from the repository root run:

```bash
mongosh "mongodb://127.0.0.1:27017" 10-mongodb-installation-configuration-crud/queries.js
```

The file itself starts with:

```text
use fsd2lab;
```

so the commands operate on the `fsd2lab` database.

### What the program demonstrates

```text
INSERT
FIND
UPDATE
DELETE
FIND again
```

### Output location

There is no browser page for this experiment. The result appears directly in the **mongosh terminal**.

You can also open MongoDB Compass and inspect the `fsd2lab` database and `students` collection after running the commands.

### Workflow

```text
VS Code queries.js
      ↓
mongosh
      ↓
MongoDB server
      ↓
Database / collection
      ↓
CRUD commands
      ↓
Terminal result
```

### Atlas option

If you use Atlas instead of local MongoDB, replace the connection string:

```bash
mongosh "YOUR_ATLAS_CONNECTION_STRING" 10-mongodb-installation-configuration-crud/queries.js
```

Keep credentials private.

---

# Experiment 11 — MongoDB Databases, Collections and Records

### Main file

`11-mongodb-databases-collections-records/queries.js`

### Run

Local MongoDB:

```bash
mongosh "mongodb://127.0.0.1:27017" 11-mongodb-databases-collections-records/queries.js
```

### What happens

The file creates/uses the `fsd2records` database and demonstrates:

```text
createCollection()
insertMany()
find()
limit()
sort()
createIndex()
aggregate()
```

### Output

The results appear in the **mongosh terminal**. The database and collection can also be inspected in MongoDB Compass.

### Workflow

```text
queries.js
   ↓
mongosh
   ↓
fsd2records database
   ↓
students collection
   ↓
find / limit / sort / index / aggregate
   ↓
Terminal output
```

---

# Experiment 12 — Augmented Programs

This folder contains two runnable augmented programs.

## 12A. Node + Express To-do

### File

`12-augmented-programs-todo-and-quiz/todo-node-express/server.js`

### Run

```bash
node 12-augmented-programs-todo-and-quiz/todo-node-express/server.js
```

Open:

```text
http://localhost:3012/
```

### Test

- Enter a task.
- Click **Add**.
- Click **done** to toggle the task.
- Click **delete** to remove it.

### Important

This version stores todos in memory. Restarting the server clears the current list. No MongoDB connection is required.

### Workflow

```text
Browser
   ↓
HTML/JavaScript UI
   ↓
Express REST endpoint
   ↓
In-memory todos array
   ↓
JSON response
   ↓
Updated browser list
```

## 12B. React Quiz

### Run

From the repository root:

```bash
npx vite --root 12-augmented-programs-todo-and-quiz/quiz-react
```

Open the Vite URL printed in the terminal.

### Workflow

```text
Vite
  ↓
React Quiz components
  ↓
User selects answers
  ↓
React state changes
  ↓
Score/result rendered
  ↓
Browser
```

No MongoDB connection is required for the quiz.

---

# The universal VS Code workflow

Use this same pattern for almost every lab:

```text
1. Open FSD2-LAB-SYLLABUS in VS Code
                 ↓
2. Open Terminal
                 ↓
3. npm install  (only once)
                 ↓
4. Open the required experiment folder
                 ↓
5. Read its README / RUN_GUIDE section
                 ↓
6. Check whether it needs MongoDB or another file
                 ↓
7. Run the exact command
                 ↓
8. Keep the terminal running
                 ↓
9. Open the printed localhost URL OR read mongosh output
                 ↓
10. Enter sample input / click buttons / send API request
                 ↓
11. Observe output
                 ↓
12. Ctrl + C to stop the server when finished
```

---

# Which experiments need what?

| Experiment | Technology | Run method | Extra connection/file | Output |
|---|---|---|---|---|
| 1 | Express | `node .../app.js` | None | Browser + API client |
| 2 | Express + EJS | `node .../app.js` | `views/index.ejs` | Browser |
| 3 | Express + cookies/session | `node .../app.js` | None | Browser |
| 4 | Express + Mongoose | `node .../server.js` | MongoDB | Browser + API client |
| 5 | React + JSX | `npm run react05` | React source files | Browser |
| 6 | React + props/state/events/Sass/CSS Module | `npm run react06` | React source files | Browser |
| 7 | React forms/lists | `npm run react07` | React source files | Browser |
| 8 | React Router | `npm run react08` | React Router dependency | Browser |
| 9 | React Hooks | `npm run react09` | React source files | Browser |
| 10 | MongoDB CRUD | `mongosh ... queries.js` | MongoDB + `mongosh` | Terminal / Compass |
| 11 | MongoDB queries | `mongosh ... queries.js` | MongoDB + `mongosh` | Terminal / Compass |
| 12A | Node + Express | `node .../server.js` | None | Browser |
| 12B | React Quiz | `npx vite --root .../quiz-react` | React source files | Browser |

---

# Common problems and fixes

### `node is not recognized`

Install Node.js and reopen VS Code.

### `npm install` fails

Check the internet connection and run `npm install` again from the repository root.

### `EADDRINUSE` / port already in use

Another server is already using that port. Stop the old terminal with `Ctrl + C`, or close the process using that port.

### React page is blank

Do not open `index.html` directly. Start the correct Vite command and open the URL printed by Vite.

### Express page does not open

Check that the terminal still shows the server running and that you opened the correct port.

### Experiment 4 says MongoDB connection failed

Start MongoDB locally, or set `MONGO_URI` to a valid Atlas connection string before starting the server.

### `mongosh` is not recognized

Install MongoDB Shell (`mongosh`) and reopen VS Code. For local experiments, also make sure the MongoDB server is running.

### MongoDB commands work but data is not visible in Compass

Refresh Compass and check the exact database name used by the experiment (`fsd2lab` for Experiment 10 and `fsd2records` for Experiment 11).

---

# Exam-day shortcut

If the faculty says **"Run Experiment 6"**, for example:

```text
Open VS Code
   ↓
Open FSD2-LAB-SYLLABUS
   ↓
Terminal
   ↓
npm install   (only if you have not already done it)
   ↓
npm run react06
   ↓
Open the Vite localhost URL
   ↓
Test Increment / Decrement / Double
   ↓
Explain props, state, events, Sass and CSS Modules
```

If the faculty says **"Run Experiment 10"**:

```text
Start MongoDB
   ↓
Open VS Code terminal
   ↓
mongosh "mongodb://127.0.0.1:27017" 10-mongodb-installation-configuration-crud/queries.js
   ↓
Watch INSERT / FIND / UPDATE / DELETE results
   ↓
Explain each MongoDB command
```

This is the intended practical workflow for the complete FSD2 lab repository.