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
  const [action, setAction] = useState(null);

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
    <div className="list">
      {tasks.map(task => <div className="card task-card" key={task._id}>
        <div className="row">
          <div><b>{task.title}</b><div className="muted">{task.description || 'No description'} • {task.priority}</div></div>
          <div className="task-controls">
            <select value={task.status} onChange={e => update(task._id, e.target.value)}><option>todo</option><option>in-progress</option><option>done</option></select>
            <button onClick={() => setAction({ type: 'complete_task', task })} disabled={task.status === 'done'}>AI Complete</button>
            <button onClick={() => remove(task._id)}>Delete</button>
          </div>
        </div>
        {task.dueDate && <small className="muted">Due {new Date(task.dueDate).toLocaleDateString()}</small>}
      </div>)}
    </div>
    {action && <AIActionDialog action={action} onClose={() => setAction(null)} onConfirmed={load} />}
  </>;
}

function AIActionDialog({ action, onClose, onConfirmed }) {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  async function propose() {
    setLoading(true); setError('');
    try {
      const payload = action.type === 'complete_task'
        ? { taskId: action.task._id }
        : action.payload;
      const data = await api('/ai/actions/propose', {
        method: 'POST',
        body: JSON.stringify({ actionType: action.type, payload })
      });
      setProposal(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function confirm() {
    if (!proposal?.confirmationToken) return;
    setLoading(true); setError('');
    try {
      await api('/ai/actions/confirm', {
        method: 'POST',
        body: JSON.stringify({ confirmationToken: proposal.confirmationToken })
      });
      setDone(true);
      await onConfirmed?.();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function cancel() {
    if (!proposal?.confirmationToken) return onClose();
    setLoading(true); setError('');
    try {
      await api('/ai/actions/cancel', {
        method: 'POST',
        body: JSON.stringify({ confirmationToken: proposal.confirmationToken })
      });
      onClose();
    } catch (err) { setError(err.message); setLoading(false); }
  }

  useEffect(() => { propose(); }, []);

  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="ai-action-title">
      <div className="row">
        <h2 id="ai-action-title">AI action confirmation</h2>
        <button onClick={onClose} aria-label="Close">×</button>
      </div>
      <p className="muted">AI actions never change your tasks directly. Review the proposal, then explicitly confirm it.</p>
      {loading && !proposal && <p>Preparing secure proposal...</p>}
      {proposal && !done && <>
        <div className="proposal"><span className="badge">Pending confirmation</span><h3>{proposal.preview}</h3><small>Expires {new Date(proposal.expiresAt).toLocaleTimeString()}</small></div>
        <div className="action-buttons">
          <button className="primary" onClick={confirm} disabled={loading}>Confirm & apply</button>
          <button onClick={cancel} disabled={loading}>Cancel</button>
        </div>
      </>}
      {done && <div className="success"><b>Action confirmed.</b><p>Your task was updated and the action was recorded in the audit log.</p><button className="primary" onClick={onClose}>Close</button></div>}
      {error && <p className="error">{error}</p>}
    </section>
  </div>;
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
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [action, setAction] = useState(null);
  const [actionForm, setActionForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [actionError, setActionError] = useState('');

  useEffect(() => { api('/tasks').then(setTasks).catch(console.error); }, []);

  async function ask(e) {
    e.preventDefault(); setLoading(true); setAnswer(''); setSources([]);
    try {
      const data = await api('/ai/assistant', { method: 'POST', body: JSON.stringify({ message }) });
      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (err) { setAnswer(err.message); }
    finally { setLoading(false); }
  }

  function openAction(type) {
    setActionError('');
    if (type === 'create_task') setActionForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    setAction({ type });
  }

  function proposeFromForm(e) {
    e.preventDefault();
    if (!actionForm.title.trim()) return setActionError('Task title is required.');
    setAction({ type: 'create_task', payload: { ...actionForm, title: actionForm.title.trim() } });
  }

  return <>
    <h1>CampusFlow AI</h1>
    <p className="muted">Ask questions using your verified campus context. AI-generated task changes require a separate preview and explicit confirmation.</p>
    <form className="card" onSubmit={ask}><textarea rows="5" placeholder="Example: Make a realistic plan for my pending tasks this week." value={message} onChange={e => setMessage(e.target.value)} required /><button className="primary" disabled={loading}>{loading ? 'Thinking...' : 'Ask AI'}</button></form>
    {answer && <section className="card ai-answer"><h2>AI response</h2><p>{answer}</p>{sources.length > 0 && <div className="sources"><b>Verified knowledge used</b>{sources.map(source => <div key={source.id || source._id || source.chunkIndex}>[{source.id || `K${source.chunkIndex + 1}`}] {source.title || source.sourceId || 'Campus knowledge'}</div>)}</div>}</section>}

    <section className="card action-center">
      <div className="row action-heading"><div><h2>Controlled AI actions</h2><p className="muted">Create or complete tasks through a secure propose → review → confirm flow.</p></div><span className="badge">Explicit confirmation</span></div>
      <div className="action-grid">
        <button onClick={() => openAction('create_task')}>＋ Propose new task</button>
        <button onClick={() => openAction('complete_task')} disabled={!tasks.some(task => task.status !== 'done')}>✓ Propose task completion</button>
      </div>
      {action?.type === 'create_task' && <form className="action-form" onSubmit={proposeFromForm}>
        <h3>New task proposal</h3>
        <input placeholder="Task title" value={actionForm.title} onChange={e => setActionForm({ ...actionForm, title: e.target.value })} required />
        <input placeholder="Description" value={actionForm.description} onChange={e => setActionForm({ ...actionForm, description: e.target.value })} />
        <div className="form-two"><select value={actionForm.priority} onChange={e => setActionForm({ ...actionForm, priority: e.target.value })}><option>low</option><option>medium</option><option>high</option></select><input type="date" value={actionForm.dueDate} onChange={e => setActionForm({ ...actionForm, dueDate: e.target.value })} /></div>
        {actionError && <p className="error">{actionError}</p>}
        <button className="primary">Review proposal</button>
      </form>}
      {action?.type === 'complete_task' && <div className="action-form"><h3>Choose a task</h3>{tasks.filter(task => task.status !== 'done').map(task => <button className="task-choice" key={task._id} onClick={() => setAction({ type: 'complete_task', task })}>{task.title}<span>{task.status} • {task.priority}</span></button>)}<button onClick={() => setAction(null)}>Close</button></div>}
    </section>
    {action?.type === 'create_task' && action.payload && <AIActionDialog action={action} onClose={() => setAction(null)} />}
    {action?.type === 'complete_task' && action.task && <AIActionDialog action={action} onClose={() => setAction(null)} onConfirmed={() => api('/tasks').then(setTasks)} />}
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
