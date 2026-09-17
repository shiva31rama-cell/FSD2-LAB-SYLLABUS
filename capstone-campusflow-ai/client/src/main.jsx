import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import './styles.css';

const API = 'http://localhost:4000/api';

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

function Layout({ user, setUser }) {
  const navigate = useNavigate();
  async function logout() {
    await api('/auth/logout', { method: 'POST' });
    setUser(null);
    navigate('/login');
  }
  return (
    <div className="shell">
      <header className="topbar">
        <div><b>CampusFlow AI</b><span className="muted"> • {user.name}</span></div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/ai">AI Assistant</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/ai" element={<AIAssistant />} />
        </Routes>
      </main>
    </div>
  );
}

function Login({ setUser }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', branch: 'CSE', year: 3 });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault(); setError('');
    try {
      const data = await api(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(form) });
      setUser(data.user); navigate('/');
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="auth-card">
      <h1>CampusFlow AI</h1>
      <p className="muted">Student productivity + campus information + AI assistance.</p>
      <form onSubmit={submit}>
        {mode === 'register' && <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />}
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password (6+ characters)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        {mode === 'register' && <>
          <input placeholder="Branch" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} />
          <input type="number" min="1" max="6" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: Number(e.target.value) })} />
        </>}
        <button className="primary">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <button className="link-button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'New student? Create an account' : 'Already registered? Login'}
      </button>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api('/dashboard/summary').then(setData).catch(console.error); }, []);
  if (!data) return <p>Loading dashboard...</p>;
  const done = data.taskStats.find(x => x._id === 'done')?.count || 0;
  const active = data.taskStats.filter(x => x._id !== 'done').reduce((sum, x) => sum + x.count, 0);
  return <>
    <h1>Dashboard</h1>
    <div className="grid">
      <div className="card"><b>{active}</b><span>Active tasks</span></div>
      <div className="card"><b>{done}</b><span>Completed tasks</span></div>
      <div className="card"><b>{data.announcementCount}</b><span>Announcements</span></div>
    </div>
    <section className="card wide"><h2>Upcoming</h2>
      {data.upcoming.length === 0 ? <p>No upcoming tasks.</p> : data.upcoming.map(task => <div className="row" key={task._id}><span>{task.title}</span><span>{task.priority} • {new Date(task.dueDate).toLocaleDateString()}</span></div>)}
    </section>
  </>;
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [error, setError] = useState('');
  async function load() { setTasks(await api('/tasks')); }
  useEffect(() => { load().catch(e => setError(e.message)); }, []);
  async function add(event) {
    event.preventDefault(); setError('');
    try { await api('/tasks', { method: 'POST', body: JSON.stringify(form) }); setForm({ title: '', description: '', priority: 'medium', dueDate: '' }); await load(); }
    catch (e) { setError(e.message); }
  }
  async function update(id, status) { await api(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }); await load(); }
  async function remove(id) { await api(`/tasks/${id}`, { method: 'DELETE' }); await load(); }
  return <>
    <h1>Tasks</h1>
    <form className="card form-grid" onSubmit={add}>
      <input placeholder="Task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
      <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option>low</option><option>medium</option><option>high</option></select>
      <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      <button className="primary">Add task</button>
    </form>
    {error && <p className="error">{error}</p>}
    <div className="list">{tasks.map(task => <div className="card row" key={task._id}>
      <div><b>{task.title}</b><div className="muted">{task.description || 'No description'} • {task.priority}</div></div>
      <div><select value={task.status} onChange={e => update(task._id, e.target.value)}><option>todo</option><option>in-progress</option><option>done</option></select> <button onClick={() => remove(task._id)}>Delete</button></div>
    </div>)}</div>
  </>;
}

function Announcements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', body: '', category: 'general' });
  async function load() { setItems(await api('/announcements')); }
  useEffect(() => { load().catch(console.error); }, []);
  async function add(e) { e.preventDefault(); await api('/announcements', { method: 'POST', body: JSON.stringify(form) }); setForm({ title: '', body: '', category: 'general' }); await load(); }
  return <>
    <h1>Campus Announcements</h1>
    <form className="card form-grid" onSubmit={add}><input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /><textarea placeholder="Announcement" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} required /><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>general</option><option>academic</option><option>event</option><option>placement</option></select><button className="primary">Publish</button></form>
    {items.map(item => <article className="card" key={item._id}><span className="badge">{item.category}</span><h2>{item.title}</h2><p>{item.body}</p><small>By {item.author?.name || 'Campus'} • {new Date(item.publishedAt).toLocaleString()}</small></article>)}
  </>;
}

function AIAssistant() {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  async function ask(e) {
    e.preventDefault(); setLoading(true); setAnswer('');
    try { const data = await api('/ai/assistant', { method: 'POST', body: JSON.stringify({ message }) }); setAnswer(data.answer); }
    catch (err) { setAnswer(err.message); }
    finally { setLoading(false); }
  }
  return <>
    <h1>CampusFlow AI</h1>
    <p className="muted">The server reads your MongoDB task context and sends only the needed context to the AI model.</p>
    <form className="card" onSubmit={ask}><textarea rows="5" placeholder="Example: Make a realistic plan for my pending tasks this week." value={message} onChange={e => setMessage(e.target.value)} required /><button className="primary" disabled={loading}>{loading ? 'Thinking...' : 'Ask AI'}</button></form>
    {answer && <section className="card ai-answer"><h2>AI response</h2><p>{answer}</p></section>}
  </>;
}

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => { api('/auth/me').then(data => setUser(data.user)).catch(() => setUser(null)); }, []);
  if (user === undefined) return <p className="loading">Loading...</p>;
  if (!user) return <BrowserRouter><Routes><Route path="*" element={<Login setUser={setUser} />} /></Routes></BrowserRouter>;
  return <BrowserRouter><Layout user={user} setUser={setUser} /></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
