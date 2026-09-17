const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json()); // Read JSON request bodies.

// Simple custom middleware: runs before the route handler.
app.use((req, res, next) => {
  console.log(req.method, req.url); // Show method and URL in terminal.
  next(); // Continue to the next middleware/route.
});

let students = [{ id: 1, name: 'Rama' }];

app.get('/', (req, res) => {
  res.send('FSD2 Express Lab is running');
});

// Route parameter: /students/1
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  res.json(student || { message: 'Student not found' });
});

// Query parameter: /search?name=Rama
app.get('/search', (req, res) => {
  res.json({ searchedName: req.query.name || 'nothing' });
});

// URL building example: create a URL for a known student.
app.get('/build-url', (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/students/1`;
  res.json({ url });
});

// HTTP POST: accept data and create a resource.
app.post('/students', (req, res) => {
  const student = { id: Date.now(), name: req.body.name };
  students.push(student);
  res.status(201).json(student);
});

// HTTP GET: retrieve all resources.
app.get('/students', (req, res) => res.json(students));

// HTTP DELETE: remove a resource.
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id !== Number(req.params.id));
  res.json({ message: 'Student deleted' });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
