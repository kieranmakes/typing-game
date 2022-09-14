import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

import TypingThroughInput from "./TypingThroughInput";
import RacerComponent from "./RacerComponent";
import Modal from "./Modal";

let typingCompletionPercent = createContext();

const Game = ({ gameid, displayName }) => {
  const [socket, setSocket] = useState(null);
  const [typingCompletion, setTypingCompletion] = useState(0);

  const [gameState, setGameState] = useState("init");
  const [players, setPlayers] = useState();
  const [playersReadyToStart, setPlayerReadyToStart] = useState();
  const [playersFinished, setPlayersFinished] = useState();

  const [hideModal, setHideModal] = useState(false);

  const updateTypingCompletion = (amountCompleted) => {
    setTypingCompletion(amountCompleted);
  };

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket?" + new URLSearchParams({ gameid, displayName }));

    setSocket(io());
  };

  const handlePlayerReady = async () => {
    socket.emit("start", {});
  };

  const text = "kieran smells like a willy";
  // strip string of spaces and new lines
  //   .replace("\n", " ")
  //   .replace(/\s\s+/g, " ");

  useEffect(() => {
    if (gameid !== undefined) socketInitializer();
  }, [gameid]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("gameid", gameid);
      socket.on("gameState", (msg) => {
        console.log("gameState:", msg);
        setGameState(msg);
      });
      socket.on("players", (msg) => {
        console.log("players:", msg);
        setPlayers(msg);
      });
      socket.on("finishedPlayers", (msg) => {
        console.log("finishedPlayers:", msg);
        setPlayersFinished(msg);
      });
      socket.on("readyPlayers", (msg) => {
        console.log("readyPlayers:", msg);
        setPlayerReadyToStart(msg);
      });
      console.log(socket);
    }
  }, [socket]);

  return (
    <div>
      {hideModal ? (
        ""
      ) : (
        <Modal
          modalType={gameState === "init" ? "ReadyBtn" : "Countdown"}
          onReady={handlePlayerReady}
        />
      )}
      <typingCompletionPercent.Provider
        value={{ typingCompletion, updateTypingCompletion }}
      >
        <div className="overflow-hidden">
          <RacerComponent />
        </div>
        <div className="border-2 p-4 rounded-lg w-1/2 h-1/2 mt-8 mx-auto">
          <h1 className="mb-2">Type Racer</h1>
          <TypingThroughInput text={text} />
        </div>
      </typingCompletionPercent.Provider>
      <div>{JSON.stringify()}</div>
    </div>
  );
};

export default Game;
export { typingCompletionPercent };
