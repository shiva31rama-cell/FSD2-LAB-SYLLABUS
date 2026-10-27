import Counter from './components/Counter';
import Clock from './components/Clock';

export default function App() {
  return (
    <main
      style={{
        maxWidth: 520,
        margin: '32px auto',
        padding: 16,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Experiment 8(b): Updating the Screen</h1>
      <p>
        A state setter schedules a React re-render. Compare the two update
        methods and watch the clock.
      </p>
      <Counter />
      <Clock />
    </main>
  );
}
