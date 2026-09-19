import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// ------------------------------------------------------------
// Controlled input + live greeting
// ------------------------------------------------------------

function EventDemo() {
  const [name, setName] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <section>
      <h2>
        Live Name Greeting
      </h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />

      <p>
        Hello, {name}!
      </p>
    </section>
  );
}

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('FSD2');

  const students = [
    'Rama',
    'Gandhi',
    'Roshni',
  ];

  function toggleMessage() {
    setShow(!show);
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert(
      'Name: ' +
        name +
        '\nCourse: ' +
        course,
    );
  }

  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '30px auto',
        padding: '0 20px',
      }}
    >
      <h1>
        Conditional Rendering + Lists + Forms
      </h1>

      {/* Conditional rendering */}
      <button onClick={toggleMessage}>
        Toggle Message
      </button>

      {show && (
        <p>
          Condition is true, so this
          message is visible.
        </p>
      )}

      {/* Rendering a list */}
      <h2>
        Student List
      </h2>

      <ul>
        {students.map((student) => (
          <li key={student}>
            {student}
          </li>
        ))}
      </ul>

      {/* Additional controlled-input example */}
      <EventDemo />

      {/* React form */}
      <h2>
        React Form
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <select
          value={course}
          onChange={(event) =>
            setCourse(event.target.value)
          }
        >
          <option value="FSD2">
            FSD2
          </option>

          <option value="CN">
            CN
          </option>

          <option value="OS">
            OS
          </option>
        </select>

        <label>
          <input type="checkbox" />
          {' '}I agree
        </label>

        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

// ------------------------------------------------------------
// Render React application
// ------------------------------------------------------------

createRoot(
  document.getElementById('root'),
).render(
  <App />,
);
