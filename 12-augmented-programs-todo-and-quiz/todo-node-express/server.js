const express = require('express');
const app = express();
const PORT = 3012;
app.use(express.json());
let todos = [];

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});
app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Not found' });
  todo.done = !todo.done;
  res.json(todo);
});
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.json({ message: 'Deleted' });
});

app.get('/', (req, res) => res.send(`<!doctype html><html><body style="font-family:Arial;max-width:700px;margin:40px auto">
<h1>FSD2 To-do</h1><input id="t" placeholder="New task"><button onclick="add()">Add</button><ul id="list"></ul>
<script>
async function load(){const ts=await fetch('/api/todos').then(r=>r.json());list.innerHTML=ts.map(t=>'<li>'+t.text+' <button onclick="toggle('+t.id+')">done</button> <button onclick="del('+t.id+')">delete</button></li>').join('')}
async function add(){if(!t.value.trim())return;await fetch('/api/todos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t.value})});t.value='';load()}
async function toggle(id){await fetch('/api/todos/'+id,{method:'PATCH'});load()}
async function del(id){await fetch('/api/todos/'+id,{method:'DELETE'});load()}
load();
</script></body></html>`));
app.listen(PORT, () => console.log(`To-do app: http://localhost:${PORT}`));
