import { useState } from 'react';

export default function HookCounter() {
  const [count, setCount] = useState(0);

  return (
    <section>
      <h2>Function Component: {count}</h2>
      <button onClick={() => setCount((previous) => previous + 1)}>
        Increment
      </button>
    </section>
  );
}
