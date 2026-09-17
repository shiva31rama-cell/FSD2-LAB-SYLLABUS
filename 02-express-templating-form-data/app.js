const express = require('express');
const app = express();
const PORT = 3002;

app.set('view engine', 'ejs'); // Tell Express to use EJS templates.
app.use(express.urlencoded({ extended: true })); // Read form data.

app.get('/', (req, res) => {
  res.render('index', { title: 'FSD2 Form', message: '' });
});

app.post('/submit', (req, res) => {
  // Values are received from the HTML form.
  const name = req.body.name || 'Guest';
  const course = req.body.course || 'Not selected';
  res.render('index', { title: 'Form Result', message: `Hello ${name}. Course: ${course}` });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
