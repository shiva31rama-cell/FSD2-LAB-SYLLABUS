import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  // These calls use the same count value from the current render.
  function addThreeNaive() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  // Each updater receives the latest queued state.
  function addThreeFixed() {
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }

  return (
    <section
      style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <h2>Counter: {count}</h2>
      <button onClick={addThreeNaive}>+1 three times (naive)</button>{' '}
      <button onClick={addThreeFixed}>
        +1 three times (functional update)
      </button>{' '}
      <button onClick={() => setCount(0)}>Reset</button>
    </section>
  );
}
