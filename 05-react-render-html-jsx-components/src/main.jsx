import React from 'react';
import { createRoot } from 'react-dom/client';
import StudentCard from './StudentCard';

function FunctionCard() {
  return (
    <div className="student-card">
      <h2>Function Component</h2>
      <p>This card is returned by a JavaScript function.</p>
    </div>
  );
}

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

function App() {
  const name = 'Rama';

  return (
    <main style={{ fontFamily: 'Arial', maxWidth: 800, margin: '40px auto' }}>
      <h1>React Render + JSX</h1>
      <p>Hello <b>{name}</b> — this text is rendered into the HTML page.</p>

      <FunctionCard />
      <ClassCard />

      {/* Third StudentCard: details are passed as props. */}
      <StudentCard
        name="Manda Tirumala Shiva Rama Krishna Gupta"
        branch="CSE"
        year="3rd Year"
        cgpa="8.8"
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
