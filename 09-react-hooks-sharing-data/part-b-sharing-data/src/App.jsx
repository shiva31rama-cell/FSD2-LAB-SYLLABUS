import { ThemeProvider } from './context/ThemeContext';
import Parent from './components/Parent';
import ThemedBox from './components/ThemedBox';

export default function App() {
  return (
    <ThemeProvider>
      <main
        style={{
          maxWidth: 480,
          margin: '40px auto',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1>Experiment 9(b): Sharing Data</h1>
        <Parent />
        <h2>Sharing Data with Context</h2>
        <ThemedBox />
      </main>
    </ThemeProvider>
  );
}
