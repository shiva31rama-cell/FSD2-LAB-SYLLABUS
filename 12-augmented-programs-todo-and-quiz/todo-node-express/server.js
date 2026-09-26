/**
 * Experiment 12A: NodeJS + Express To-do List
 *
 * What it demonstrates:
 * - Express JSON middleware
 * - REST API routes
 * - In-memory CRUD
 * - Browser fetch() calls
 */

const express = require('express');

const app = express();
const PORT = 3012;

// ------------------------------------------------------------
// Middleware
// ------------------------------------------------------------

app.use(express.json());

// ------------------------------------------------------------
// In-memory data
// ------------------------------------------------------------

let todos = [];

// ------------------------------------------------------------
// REST API routes
// ------------------------------------------------------------

// GET all todos.
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo.
app.post('/api/todos', (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    done: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

// PATCH: toggle a todo.
app.patch('/api/todos/:id', (req, res) => {
  const todoId = Number(req.params.id);
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found',
    });
  }

  todo.done = !todo.done;

  return res.json(todo);
});

// DELETE a todo.
app.delete('/api/todos/:id', (req, res) => {
  const todoId = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== todoId);

  res.json({
    message: 'Todo deleted',
  });
});

// ------------------------------------------------------------
// Browser client
// ------------------------------------------------------------

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>FSD2 To-do</title>
  </head>

  <body
    style="
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 40px auto;
      padding: 0 20px;
    "
  >
    <h1>FSD2 To-do</h1>

    <input
      id="todoInput"
      type="text"
      placeholder="New task"
    />

    <button onclick="addTodo()">Add</button>

    <ul id="todoList"></ul>

    <script>
      async function loadTodos() {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        const list = document.getElementById('todoList');

        list.innerHTML = '';

        todos.forEach((todo) => {
          const item = document.createElement('li');
          item.textContent = todo.text + (todo.done ? ' (done)' : '');

          const toggleButton = document.createElement('button');
          toggleButton.textContent = 'Toggle';
          toggleButton.onclick = () => toggleTodo(todo.id);

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = () => deleteTodo(todo.id);

          item.append(' ', toggleButton, ' ', deleteButton);
          list.appendChild(item);
        });
      }

      async function addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
          return;
        }

        await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        input.value = '';
        loadTodos();
      }

      async function toggleTodo(id) {
        await fetch('/api/todos/' + id, {
          method: 'PATCH',
        });

        loadTodos();
      }

      async function deleteTodo(id) {
        await fetch('/api/todos/' + id, {
          method: 'DELETE',
        });

        loadTodos();
      }

      loadTodos();
    </script>
  </body>
</html>`);
});

// ------------------------------------------------------------
// Start server
// ------------------------------------------------------------

app.listen(PORT, () => {
  console.log('To-do app: http://localhost:' + PORT);
});
