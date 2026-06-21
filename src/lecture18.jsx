import { useState } from "react";

function Lecture18() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>

      {
        count === 0 ? <h1>element 0</h1>
        : count === 1 ? <h1>element 1</h1>
        : count === 2 ? <h1>element 2</h1>
        : <h1>other condition</h1>
      }

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Lecture18;