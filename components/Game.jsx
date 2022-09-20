import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";

import TypingThroughInput from "./TypingThroughInput";
import RacerComponent from "./RacerComponent";
import Modal from "./Modal";
import EntryDialogue from "./EntryDialogue";

let typingCompletionPercent = createContext();

const Game = ({ gameid }) => {
  const [socket, setSocket] = useState(null);
  const [typingCompletion, setTypingCompletion] = useState(0);
  const [finishedStats, setFinishedStats] = useState({});

  const [gameState, setGameState] = useState("init");
  const [players, setPlayers] = useState();
  const [playersReadyToStart, setPlayerReadyToStart] = useState();
  const [playersFinished, setPlayersFinished] = useState([]);

  const [hideModal, setHideModal] = useState(false);
  const [waitForNextGame, setWaitForNextGame] = useState(false);
  const [resetBtnPressed, setResetBtnPressed] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [getDisplayName, setGetDisplayName] = useState(false);

  const updateTypingCompletion = (amountCompleted) => {
    setTypingCompletion(amountCompleted);
    socket.emit("posUpdate", amountCompleted);
  };

  const updateFinishedStats = ({ wpm, accuracy, duration }) => {
    let id = socket.id;
    setFinishedStats({ ...finishedStats, [id]: { wpm, accuracy, duration } });
  };

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket?" + new URLSearchParams({ gameid, displayName }));

    setSocket(io());
  };

  const handlePlayerReady = async () => {
    socket.emit("start", {});
  };

  const text = "kieran";
  // strip string of spaces and new lines
  //   .replace("\n", " ")
  //   .replace(/\s\s+/g, " ");

  useEffect(() => {
    if (gameid !== undefined) socketInitializer();
  }, [gameid]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("gameid", { gameid, displayName });
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
      socket.on("reset", (msg) => {
        location.reload();
      });
      console.log(socket);
    }
  }, [socket]);

  useEffect(() => {
    if (socket && players) {
      console.log(playersReadyToStart.indexOf(socket.id));
      if (
        (gameState === "playing" || gameState === "finished") &&
        playersReadyToStart.indexOf(socket.id) === -1
      ) {
        setWaitForNextGame(true);
      }
    }
  }, [socket, playersReadyToStart]);

  useEffect(() => {
    console.log("finishedStatsBefore", finishedStats);
    if (socket && finishedStats[socket.id]) {
      console.log("finishedStats", finishedStats);
      if (finishedStats[socket.id].wpm) {
        console.log("finishedStatsAfter", finishedStats);
        console.log("playersFinished", playersFinished);
        let i = playersFinished.map((e) => e.playerId).indexOf(socket.id);
        if (i === -1) {
          let pf = playersFinished;
          pf.push({
            playerId: socket.id,
            wpm: finishedStats[socket.id].wpm,
            duration: finishedStats[socket.id].duration,
            accuracy: finishedStats[socket.id].accuracy,
          });

          i = playersFinished.map((e) => e.playerId).indexOf(socket.id);
          setPlayersFinished(pf);
          socket.emit("playerFinish", playersFinished[i]);
        }
      }
    }
  }, [socket, finishedStats, playersFinished]);

  useEffect(() => {
    let displayName = window.localStorage.getItem("displayName");
    if (displayName) {
      setDisplayName(displayName);
    } else {
      setGetDisplayName(true);
    }
  }, []);

  return (
    <div>
      {getDisplayName ? (
        <EntryDialogue
          dialogueType="Join"
          onUpdate={() => setGetDisplayName(false)}
        />
      ) : (
        ""
      )}
      {gameState === "finished" ? (
        <Modal
          modalType="Finished"
          finishedStats={playersFinished}
          players={players}
          onReset={() => {
            // setPlayersFinished([]);
            // setFinishedStats({});
            // setPlayerReadyToStart([]);
            // setPlayers({});
            // setWaitForNextGame(false);
            socket.emit("reset");
            location.reload();
          }}
        />
      ) : (
        ""
      )}
      {waitForNextGame ? (
        <Modal modalType="Wait" />
      ) : (
        <Modal
          modalType={gameState === "init" ? "ReadyBtn" : "Countdown"}
          onReady={handlePlayerReady}
        />
      )}
      <typingCompletionPercent.Provider
        value={{
          typingCompletion,
          updateTypingCompletion,
          finishedStats,
          updateFinishedStats,
        }}
      >
        <div className="overflow-hidden">
          <RacerComponent players={players} />
        </div>
        <div className="border-2 p-4 rounded-lg w-1/2 h-1/2 mt-8 mx-auto">
          <h1 className="mb-2">Type Racer</h1>
          <TypingThroughInput text={text} />
        </div>
      </typingCompletionPercent.Provider>
      <div>{JSON.stringify(finishedStats)}</div>
    </div>
  );
};

export default Game;
export { typingCompletionPercent };
