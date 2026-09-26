import React from 'react';
import { createRoot } from 'react-dom/client';

import StudentCard from './StudentCard';

// ------------------------------------------------------------
// Function component
// ------------------------------------------------------------

function FunctionCard() {
  return (
    <div className="student-card">
      <h2>Function Component</h2>
      <p>This card is returned by a JavaScript function.</p>
    </div>
  );
}

// ------------------------------------------------------------
// Class component
// ------------------------------------------------------------

class ClassCard extends React.Component {
  render() {
    return (
      <div className="student-card">
        <h2>Class Component</h2>
        <p>This card comes from a React class.</p>
      </div>
    );
  }
}

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  const name = 'Rama';

  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
      }}
    >
      <h1>React Render + JSX</h1>

      <p>
        Hello <strong>{name}</strong>. This text is rendered into the HTML
        page.
      </p>

      <FunctionCard />
      <ClassCard />

      {/* StudentCard receives details through props. */}
      <StudentCard
        name="Manda Tirumala Shiva Rama Krishna Gupta"
        branch="CSE"
        year="3rd Year"
        cgpa="8.8"
      />
    </main>
  );
}

// ------------------------------------------------------------
// Render React application
// ------------------------------------------------------------

createRoot(document.getElementById('root')).render(<App />);
