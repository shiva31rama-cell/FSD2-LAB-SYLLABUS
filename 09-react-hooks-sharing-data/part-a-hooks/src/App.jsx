import ClassCounter from './components/ClassCounter';
import HookCounter from './components/HookCounter';

export default function App() {
  return (
    <main style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Experiment 9(a): Why Hooks?</h1>
      <p>Compare class state and function-component state. Both counters should work the same way.</p>
      <ClassCounter />
      <HookCounter />
    </main>
  );
}
