import { useState } from 'react';
import { createRoot } from 'react-dom/client';

const initialStudents = [
  { id: 1, name: 'Anitha', branch: 'CSE' },
  { id: 2, name: 'Ravi', branch: 'ECE' },
  { id: 3, name: 'Sneha', branch: 'CSE' },
];

function ConditionalDemo() {
  const [showDetails, setShowDetails] = useState(true);
  const [status, setStatus] = useState('student');
  return (
    <section>
      <h2>Part A: Conditional Rendering</h2>
      <button onClick={() => setShowDetails((current) => !current)}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
      {showDetails ? <p>Details are visible (ternary operator).</p> : <p>Details are hidden.</p>}
      {status === 'student' && <p>Student status is active (&& operator).</p>}
      <label>Status: <select value={status} onChange={(event) => setStatus(event.target.value)}>
        <option value="student">Student</option><option value="staff">Staff</option><option value="guest">Guest</option>
      </select></label>
      <p>{status === 'student' ? 'Welcome, student.' : status === 'staff' ? 'Welcome, staff member.' : 'Welcome, guest.'}</p>
    </section>
  );
}

function StudentList() {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('ALL');
  const visibleStudents = students.filter((student) => filter === 'ALL' || student.branch === filter);
  return (
    <section>
      <h2>Part B: Rendering and Filtering Lists</h2>
      <label>Filter by branch: <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        <option value="ALL">All branches</option><option value="CSE">CSE</option><option value="ECE">ECE</option>
      </select></label>
      {visibleStudents.length === 0 ? <p>No students match this filter.</p> : (
        <ul>{visibleStudents.map((student) => (
          <li key={student.id}>{student.name} — {student.branch}{' '}
            <button onClick={() => setStudents((current) => current.filter((item) => item.id !== student.id))}>Remove</button>
          </li>
        ))}</ul>
      )}
    </section>
  );
}

function StudentForm() {
  const emptyForm = { name: '', email: '', password: '', age: '', date: '', course: 'FSD2', gender: 'Prefer not to say', agreed: false, comments: '' };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.';
    if (!form.agreed) nextErrors.agreed = 'Please confirm the checkbox.';
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }
  function resetForm() {
    setForm({ ...emptyForm }); setErrors({}); setSubmitted(false);
  }
  return (
    <section>
      <h2>Part C: React Controlled Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <p><label>Name * <input name="name" value={form.name} onChange={updateField} /></label></p>
        {errors.name && <p role="alert">{errors.name}</p>}
        <p><label>Email * <input type="email" name="email" value={form.email} onChange={updateField} /></label></p>
        {errors.email && <p role="alert">{errors.email}</p>}
        <p><label>Password <input type="password" name="password" value={form.password} onChange={updateField} /></label></p>
        <p><label>Age <input type="number" name="age" min="1" max="120" value={form.age} onChange={updateField} /></label></p>
        <p><label>Date <input type="date" name="date" value={form.date} onChange={updateField} /></label></p>
        <p><label>Course <select name="course" value={form.course} onChange={updateField}>
          <option>FSD2</option><option>CN</option><option>OS</option>
        </select></label></p>
        <fieldset><legend>Gender</legend>
          {['Female', 'Male', 'Prefer not to say'].map((value) => (
            <label key={value}><input type="radio" name="gender" value={value} checked={form.gender === value} onChange={updateField} />{value}</label>
          ))}
        </fieldset>
        <p><label><input type="checkbox" name="agreed" checked={form.agreed} onChange={updateField} /> I confirm the information is correct *</label></p>
        {errors.agreed && <p role="alert">{errors.agreed}</p>}
        <p><label>Comments <textarea name="comments" value={form.comments} onChange={updateField} rows="3" /></label></p>
        <button type="submit">Submit</button> <button type="button" onClick={resetForm}>Reset</button>
      </form>
      {submitted && <p role="status">Form submitted successfully for {form.name} ({form.course}).</p>}
    </section>
  );
}

function App() {
  return <main style={{ fontFamily: 'Arial, sans-serif', maxWidth: 850, margin: '30px auto', padding: 20 }}>
    <h1>Experiment 7: Conditional Rendering, Lists and Forms</h1>
    <ConditionalDemo /><StudentList /><StudentForm />
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
