import React, { useState } from "react";

export default function Counter() {
  // State init for the counter
  const [counter, setCounter] = useState(0);

  // Counter func where we pass the argument of "incr" or "decr" to determine action
  const counterFunc = (action) => {
    if (action === "increment") {
      setCounter(counter + 1);
    } else if (action === "decrement") {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => counterFunc("increment")}>
        Increment counter
      </button>
      <button onClick={() => counterFunc("decrement")}>
        Decrement counter
      </button>
    </div>
  );
}
