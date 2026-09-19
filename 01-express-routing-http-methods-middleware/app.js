/**
 * Experiment 01: ExpressJS Routing, HTTP Methods and Middleware
 *
 * What it demonstrates:
 * - Express server setup
 * - Custom middleware
 * - Route parameters and query parameters
 * - URL building
 * - GET, POST and DELETE methods
 */

const express = require('express');

const app = express();
const PORT = 3001;

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ------------------------------------------------------------
// Sample data
// ------------------------------------------------------------

let students = [
  {
    id: 1,
    name: 'Rama',
  },
];

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------

// Home route.
app.get('/', (req, res) => {
  res.send('FSD2 Express Lab is running');
});

// GET a student using a route parameter.
// Example: /students/1
app.get('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);

  const student = students.find(
    (item) => item.id === studentId,
  );

  res.json(
    student || {
      message: 'Student not found',
    },
  );
});

// GET using a query parameter.
// Example: /search?name=Rama
app.get('/search', (req, res) => {
  const searchedName = req.query.name || 'nothing';

  res.json({
    searchedName,
  });
});

// Build a URL for a known student.
app.get('/build-url', (req, res) => {
  const url =
    req.protocol +
    '://' +
    req.get('host') +
    '/students/1';

  res.json({
    url,
  });
});

// POST: create a new student.
app.post('/students', (req, res) => {
  const student = {
    id: Date.now(),
    name: req.body.name,
  };

  students.push(student);

  res.status(201).json(student);
});

// GET: retrieve all students.
app.get('/students', (req, res) => {
  res.json(students);
});

// DELETE: remove a student.
app.delete('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);

  students = students.filter(
    (student) => student.id !== studentId,
  );

  res.json({
    message: 'Student deleted',
  });
});

// ------------------------------------------------------------
// Start server
// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT);
});
