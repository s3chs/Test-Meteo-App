import React, { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

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
