import { createRoot } from 'react-dom/client';
import Counter from './Counter';
import StudentCard from './StudentCard';
import './App.scss';

function App() {
  return (
    <main className="app">
      <h1>Experiment 6: Props, State, Styles and Events</h1>
      <p>Props are passed from a parent; state belongs to a component and changes through its setter.</p>
      <section>
        <h2>StudentCard (Props Demo)</h2>
        <StudentCard name="Anitha" branch="CSE" year={3} cgpa={8.9} />
        <StudentCard name="Ravi" branch="ECE" year={2} cgpa={7.4} />
      </section>
      <section>
        <h2>Counter (State and Event Demo)</h2>
        <Counter />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
