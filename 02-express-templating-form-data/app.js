/**
 * Experiment 02: ExpressJS Templating and Form Data
 *
 * What it demonstrates:
 * - EJS templating
 * - HTML form handling
 * - GET and POST routes
 * - Passing data from Express to an EJS view
 */

const express = require('express');

const app = express();
const PORT = 3002;

// ------------------------------------------------------------
// Configuration and middleware
// ------------------------------------------------------------

app.set('view engine', 'ejs');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------

// Display the form.
app.get('/', (req, res) => {
  res.render('index', {
    title: 'FSD2 Form',
    message: '',
  });
});

// Receive form data and display the result.
app.post('/submit', (req, res) => {
  const name = req.body.name || 'Guest';
  const course = req.body.course || 'Not selected';

  res.render('index', {
    title: 'Form Result',
    message: 'Hello ' + name + '. Course: ' + course,
  });
});

// ------------------------------------------------------------
// Start server
// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT);
});
