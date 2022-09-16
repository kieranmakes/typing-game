import React, { useEffect, useState, useContext, useRef } from "react";
import Image from "next/image";
import { typingCompletionPercent } from "./Game";

const RacerComponent = ({ players }) => {
  const { typingCompletion } = useContext(typingCompletionPercent);
  const playerElements = useRef([]);
  // const [playerElementState, setPlayerElementState] = useState(playerEl);

  // const updatePlayerPosition = (typingCompletion, playerId) => {
  //   playerEl.current.style.left = typingCompletion.toString() + "%";
  // };

  // useEffect(() => {
  //   console.log(typingCompletion);
  //   updatePlayerPosition(typingCompletion);
  //   console.log(playerEl.current.style.left);
  // }, [typingCompletion]);

  const updatePlayerPosition = (playerId, typingCompletion) => {
    console.log("hellooooooooooooooooooooo");
    console.log(typingCompletion);
    console.log(playerElements.current[playerId]);
    if (playerElements.current[playerId]) {
      playerElements.current[playerId].style.left =
        typingCompletion.toString() + "%";
    }
  };

  useEffect(() => {
    if (players) {
      Object.keys(players).forEach((playerId) => {
        updatePlayerPosition(playerId, players[playerId].completion);
      });
    }
  }, [players]);

  return (
    <div className="border-2 p-4 rounded-lg my-10 w-2/3 mx-auto">
      <div className="px-10 flex justify-between">
        <div
          style={{
            position: "relative",
            width: "120%",
          }}
        >
          {/* <h1 */}
          {/*   ref={playerEl} */}
          {/*   style={{ */}
          {/*     position: "relative", */}
          {/*     width: "100%", */}
          {/*   }} */}
          {/* > */}
          {/* hello */}
          {/* </h1> */}
          {players
            ? Object.keys(players).map((playerId) => {
                return (
                  <p
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                    ref={(element) => {
                      playerElements.current[playerId] = element;
                    }}
                    key={playerId}
                  >
                    {players[playerId].displayName}{" "}
                  </p>
                );
              })
            : null}
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
