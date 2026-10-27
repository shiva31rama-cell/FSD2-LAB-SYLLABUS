import { useState } from 'react';
import Display from './Display';
import Buttons from './Buttons';

export default function Parent() {
  const [count, setCount] = useState(0);
  return (
    <section>
      <h2>Lifting State Up</h2>
      <p>
        The parent owns the count and passes the value and callback to children.
      </p>
      <Display count={count} />
      <Buttons onIncrement={() => setCount((previous) => previous + 1)} />
    </section>
  );
}
