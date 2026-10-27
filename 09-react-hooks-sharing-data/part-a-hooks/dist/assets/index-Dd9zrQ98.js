```jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

// Class Component
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState((previousState) => ({
      count: previousState.count + 1,
    }));
  };

  render() {
    return (
      <section>
        <h2>Class Component: {this.state.count}</h2>

        <button onClick={this.increment}>
          Increment
        </button>
      </section>
    );
  }
}

// Function Component
function FunctionCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <section>
      <h2>Function Component: {count}</h2>

      <button onClick={increment}>
        Increment
      </button>
    </section>
  );
}

// Main Application Component
function App() {
  return (
    <main
      style={{
        maxWidth: 420,
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Experiment 9(a): Why Hooks?</h1>

      <p>
        Compare class state and function-component state.
        Both counters should work the same way.
      </p>

      <ClassCounter />

      <FunctionCounter />
    </main>
  );
}

// Render the Application
createRoot(document.getElementById("root")).render(<App />);
```
