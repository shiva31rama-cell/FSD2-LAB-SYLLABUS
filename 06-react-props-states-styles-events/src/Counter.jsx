import { useState } from 'react';

import styles from './Counter.module.css';

/**
 * Counter component
 *
 * Demonstrates:
 * - useState
 * - Click events
 * - Updating state
 * - Conditional button disabling
 */
function Counter() {
  const [count, setCount] = useState(0);

  // Increase the counter by 1.
  function increment() {
    setCount(count + 1);
  }

  // Decrease the counter by 1.
  function decrement() {
    setCount(count - 1);
  }

  // Double the current counter value.
  function double() {
    setCount(count * 2);
  }

  return (
    <section className={styles.counter}>
      <h2>Counter</h2>
      <p>Count: {count}</p>

      <button onClick={increment}>Increment</button>

      <button disabled={count === 0} onClick={decrement}>
        Decrement
      </button>

      <button onClick={double}>Double</button>
    </section>
  );
}

export default Counter;
