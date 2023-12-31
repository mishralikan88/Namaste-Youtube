import React, { useState } from "react";
import { findNthPrime } from "../utils/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  //   console.log("Rendering ... ");

  //   heavy operation for DOM
  //   const prime = findNthPrime(text);
  const prime = () => {
    console.log("calculate prime number of ", text);
    return findNthPrime(text);
  };

  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black" +
        (isDarkTheme && " bg-black text-red-700")
      }
    >
      <div>
        <button
          className="m-10 p-2 bg-green-200"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          Toggle
        </button>
      </div>
      <div>
        <input
          className="border border-black w-72 px-2"
          type="number"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <h1>nth Prime:{prime()}</h1>
    </div>
  );
};

export default Demo;
