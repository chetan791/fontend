import { useRef, useState } from "react";

export const Counter = () => {
  const renderCount = useRef(0);
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
    renderCount.current += 1;
  };
  return (
    <div>
      <h1>count{count}</h1>
      <h1>ref count {renderCount.current}</h1>
      <button onClick={increaseCount}>increase</button>
    </div>
  );
};
