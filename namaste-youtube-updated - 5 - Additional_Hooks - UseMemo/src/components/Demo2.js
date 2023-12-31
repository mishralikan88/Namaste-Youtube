import React, { useRef, useState } from "react";

const Demo2 = () => {
  const [y, setY] = useState(0);
  let x = 0;
  const ref = useRef(0); // ref = {current:0}
  return (
    <div className="m-4 p-2 bg-slate-50 border border-black w-96 h-96">
      <div>
        <button
          className="bg-green-200 px-2 m-4"
          onClick={() => {
            x = x + 1;
            console.log("x =", x);
          }}
        >
          Increase x
        </button>
        <span className="font-bold text-xl">let = {x}</span>
      </div>
      <div>
        <button
          className="bg-green-200 px-2 m-4"
          onClick={() => {
            setY(y + 1);
          }}
        >
          Increase y
        </button>
        <span className="font-bold text-xl">state = {y}</span>
      </div>
      <div>
        <button
          className="bg-green-200 px-2 m-4"
          onClick={() => {
            ref.current = ref.current + 1;
            console.log("ref =", ref.current);
          }}
        >
          Increase ref
        </button>
        <span className="font-bold text-xl">ref = {ref.current}</span>
      </div>
    </div>
  );
};

export default Demo2;

// change in state variable triggers reconciliation. State variables maintain their state. 

// change in ref & local variable does not trigger reconciliation . only difference is local variable does not maintain its state when ref variable maintains its state.

// Note - Reconcialiation triggers component rerender cycle.