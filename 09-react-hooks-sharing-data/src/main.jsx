import React, { createContext, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const NameContext = createContext('Guest');

function Child() {
  const name = useContext(NameContext); // Read shared data without prop drilling.
  return <p>Child component received shared name: <b>{name}</b></p>;
}

function App() {
  const [name, setName] = useState('Rama');
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const id = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(id); }, []);

  return <NameContext.Provider value={name}>
    <main style={{fontFamily:'Arial',maxWidth:800,margin:'40px auto'}}>
      <h1>Hooks + Shared Data</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child />
      <p>Timer using useEffect: {seconds}s</p>
      <p><b>Why hooks?</b> They let function components use state, effects and shared context with simple functions.</p>
    </main>
  </NameContext.Provider>;
}
createRoot(document.getElementById('root')).render(<App />);
