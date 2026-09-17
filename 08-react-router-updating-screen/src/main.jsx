import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function Home() { return <><h2>Home</h2><p>This is the home route.</p></>; }
function About() { return <><h2>About</h2><p>This is another route.</p></>; }
function Counter() {
  const [count, setCount] = useState(0);
  return <><h2>Updating the Screen</h2><button onClick={() => setCount(count + 1)}>Count: {count}</button><p>State changes cause React to render the new value.</p></>;
}
function App() {
  return <main style={{fontFamily:'Arial',maxWidth:800,margin:'40px auto'}}>
    <h1>React Router</h1>
    <nav><Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/counter">Counter</Link></nav>
    <Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/counter" element={<Counter />} /></Routes>
  </main>;
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
