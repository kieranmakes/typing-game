import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import { typingCompletionPercent } from "../pages/index.js";

const RacerComponent = () => {
  const { typingCompletion } = useContext(typingCompletionPercent);
  const playerEl = useRef(null);
  const [playerElementState, setPlayerElementState] = useState(playerEl);

  const updatePlayerPosition = (typingCompletion) => {
    playerEl.current.style.left = typingCompletion.toString() + "%";
    setPlayerElementState(playerEl);
  };

  useEffect(() => {
    console.log(typingCompletion);
    updatePlayerPosition(typingCompletion);
    console.log(playerEl.current.style.left);
  }, [typingCompletion]);
  return (
    <div className="border-2 p-4 rounded-lg my-10 w-2/3 mx-auto">
      <div className="px-10 flex justify-between">
        <div
          style={{
            position: "relative",
            width: "120%",
          }}
        >
          <h1>hello</h1>
          <h1
            ref={playerEl}
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            hello
          </h1>
          <h1>hello</h1>
          <h1>hello</h1>
          <h1>hello</h1>
        </div>
        <Image
          src="/finishline.png"
          alt="finish line"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default RacerComponent;
