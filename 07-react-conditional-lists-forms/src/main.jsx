import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('FSD2');
  const students = ['Rama', 'Gandhi', 'Roshni'];

  function submit(e) {
    e.preventDefault();
    alert(`Name: ${name}\nCourse: ${course}`);
  }

  return <main style={{fontFamily:'Arial',maxWidth:800,margin:'30px auto'}}>
    <h1>Conditional Rendering + Lists + Forms</h1>
    <button onClick={() => setShow(!show)}>Toggle message</button>
    {show && <p>Condition is true, so this message is visible.</p>}
    <h2>Student List</h2>
    <ul>{students.map(student => <li key={student}>{student}</li>)}</ul>
    <h2>React Form</h2>
    <form onSubmit={submit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={course} onChange={e => setCourse(e.target.value)}>
        <option>FSD2</option><option>CN</option><option>OS</option>
      </select>
      <label><input type="checkbox" /> I agree</label>
      <button type="submit">Submit</button>
    </form>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
