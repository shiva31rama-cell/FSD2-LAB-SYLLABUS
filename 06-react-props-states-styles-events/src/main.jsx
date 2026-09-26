import React from 'react';
import { createRoot } from 'react-dom/client';

import Counter from './Counter';
import './App.scss';

// ------------------------------------------------------------
// Child component: receives a prop
// ------------------------------------------------------------

function Student({ name }) {
  return <p>Prop received by child: {name}</p>;
}

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  return (
    <main className="app">
      <h1>Props + State + Styles + Events</h1>

      <Student name="Rama" />

      <h2 className="section-title">Counter Experiment</h2>
      <Counter />

      <p>
        <strong>Theme:</strong> change <code>$primary-color</code> in{' '}
        <code>App.scss</code>.
      </p>

      <p>
        The h2 border, section title text, and Counter border use the same
        theme color.
      </p>
    </main>
  );
}

// ------------------------------------------------------------
// Render React application
// ------------------------------------------------------------

createRoot(document.getElementById('root')).render(<App />);
