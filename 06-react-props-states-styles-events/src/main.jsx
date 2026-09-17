import React from 'react';
import { createRoot } from 'react-dom/client';
import Counter from './Counter';
import './App.scss';

function Student({ name }) {
  return <p>Prop received by child: {name}</p>;
}

function App() {
  return (
    <main className="app">
      <h1>Props + State + Styles + Events</h1>
      <Student name="Rama" />

      <h2 className="section-title">Counter Experiment</h2>
      <Counter />

      <p>
        <b>Theme:</b> change <code>$primary-color</code> in App.scss.
        The h2 border, section title text, and Counter border color use the same theme color.
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
