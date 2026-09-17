import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Student({ name }) { return <p>Prop received by child: {name}</p>; }

function App() {
  const [count, setCount] = useState(0); // State remembers the current value.
  const box = { fontFamily:'Arial', maxWidth:700, margin:'40px auto', padding:24, border:'2px solid #333', borderRadius:12 };
  // Sass idea: .box { padding: 24px; &:hover { transform: scale(1.01); } }
  return <main style={box}>
    <h1>Props + State + Events</h1>
    <Student name="Rama" />
    <p>Button clicks change state:</p>
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    <p style={{marginTop:20}}>The style above is normal CSS-in-JS syntax. A Sass equivalent is shown in the source comment.</p>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
