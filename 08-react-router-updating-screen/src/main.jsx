import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

// ------------------------------------------------------------
// Route components
// ------------------------------------------------------------

function Home() {
  return (
    <>
      <h2>Home</h2>
      <p>This is the home route.</p>
    </>
  );
}

function About() {
  return (
    <>
      <h2>About</h2>
      <p>This is another route.</p>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <h2>Updating the Screen</h2>

      <button onClick={increment}>Count: {count}</button>

      <p>State changes cause React to render the new value.</p>
    </>
  );
}

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  return (
    <main
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
      }}
    >
      <h1>React Router</h1>

      <nav
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/counter">Counter</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </main>
  );
}

// ------------------------------------------------------------
// Render React application
// ------------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
