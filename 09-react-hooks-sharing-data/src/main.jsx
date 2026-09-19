import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { createRoot } from 'react-dom/client';

// ------------------------------------------------------------
// Shared context
// ------------------------------------------------------------

const NameContext = createContext('Guest');

// ------------------------------------------------------------
// Child component
// ------------------------------------------------------------

function Child() {
  const name = useContext(NameContext);

  return (
    <p>
      Child component received shared
      name: <strong>{name}</strong>
    </p>
  );
}

// ------------------------------------------------------------
// Main App component
// ------------------------------------------------------------

function App() {
  const [name, setName] = useState('Rama');
  const [seconds, setSeconds] = useState(0);

  // Update the timer every second.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) =>
        currentSeconds + 1,
      );
    }, 1000);

    // Clean up the interval when the
    // component is removed.
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <NameContext.Provider value={name}>
      <main
        style={{
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          margin: '40px auto',
          padding: '0 20px',
        }}
      >
        <h1>
          Hooks + Shared Data
        </h1>

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <Child />

        <p>
          Timer using useEffect: {seconds}s
        </p>

        <p>
          <strong>Why hooks?</strong>{' '}
          Hooks let function components use
          state, effects and shared context.
        </p>
      </main>
    </NameContext.Provider>
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
