```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Naive updates: all three use the same captured count.
  function handleNaiveUpdate() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  // Functional updates: each update uses the previous state.
  function handleFunctionalUpdate() {
    setCount((previousCount) => previousCount + 1);
    setCount((previousCount) => previousCount + 1);
    setCount((previousCount) => previousCount + 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <section style={styles.section}>
      <h2>Counter: {count}</h2>

      <button onClick={handleNaiveUpdate}>
        +1 three times (naive)
      </button>{" "}

      <button onClick={handleFunctionalUpdate}>
        +1 three times (functional update)
      </button>{" "}

      <button onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section style={styles.section}>
      <h2>Live Clock</h2>
      <p>{time.toLocaleTimeString()}</p>
    </section>
  );
}

function App() {
  return (
    <main style={styles.main}>
      <h1>Experiment 8(b): Updating the Screen</h1>

      <p>
        A state setter schedules a React re-render.
        Compare the two update methods and watch the clock.
      </p>

      <Counter />
      <LiveClock />
    </main>
  );
}

const styles = {
  main: {
    maxWidth: 520,
    margin: "32px auto",
    padding: 16,
    fontFamily: "Arial, sans-serif",
  },

  section: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
};

export default App;
```
