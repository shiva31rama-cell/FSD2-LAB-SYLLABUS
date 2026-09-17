import React from 'react';
import { createRoot } from 'react-dom/client';

function FunctionCard() {
  return <div><h2>Function Component</h2><p>This card is returned by a JavaScript function.</p></div>;
}

class ClassCard extends React.Component {
  render() {
    return <div><h2>Class Component</h2><p>This card comes from a React class.</p></div>;
  }
}

function App() {
  const name = 'Rama';
  return <main style={{fontFamily:'Arial',maxWidth:800,margin:'40px auto'}}>
    <h1>React Render + JSX</h1>
    <p>Hello <b>{name}</b> — this text is rendered into the HTML page.</p>
    <FunctionCard />
    <ClassCard />
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
