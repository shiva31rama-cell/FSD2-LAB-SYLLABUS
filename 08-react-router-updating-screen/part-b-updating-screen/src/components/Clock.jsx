import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    // Stop the timer if React removes this component.
    return () => clearInterval(timerId);
  }, []);

  return (
    <section style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
      <h2>Live Clock</h2>
      <p>{time.toLocaleTimeString()}</p>
    </section>
  );
}
