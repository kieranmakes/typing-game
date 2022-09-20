import { useRef, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import uniqid from "uniqid";

// dialogueType = "Create" | "Join"
const EntryDialogue = ({ dialogueType, onUpdate }) => {
  const [id, setId] = useState(uniqid() + Date.now());

  let displayName = useRef("");
  let textForGame = useRef("");
  const updateLocalStorageDisplayName = (displayName) => {
    window.localStorage.setItem("displayName", displayName);
  };

  const updateLocalStorageTextForGame = (text) => {
    text = text.replace("\n", " ").replace(/\s\s+/g, " ");
    window.localStorage.setItem("textForGame&" + id, text);
  };

  const changeToGamePage = () => {
    const { pathname } = Router;
    if (pathname == "/") {
      // Router.push("/");
      Router.push({ pathname: "/game/[gid]", query: { gid: id } }).then(() =>
        Router.reload()
      );
    }
  };

  const handleSubmit = () => {
    let inputValue = displayName.current.value;
    if (inputValue.length > 0) {
      updateLocalStorageDisplayName(inputValue);
      if (dialogueType === "Create") {
        let textForGameValue = textForGame.current.value;
        updateLocalStorageTextForGame(textForGameValue);
        changeToGamePage();
      }
      if (onUpdate) onUpdate();
    }
  };

  const createGameBtn = () => {
    return (
      <button
        className="border-2 p-3 rounded-lg mt-10 hover:border-cyan-500 w-[200px]"
        onClick={handleSubmit}
      >
        Create Game
      </button>
    );
  };

  const joinGameBtn = () => {
    return (
      <button
        className="border-2 p-3 rounded-lg mt-10 hover:border-cyan-500 "
        onClick={handleSubmit}
      >
        Join Game
      </button>
    );
  };

  const textInputForGame = () => {
    return (
      <input
        className="p-5 rounded-lg w-[100%] mt-5"
        ref={textForGame}
        type="text"
        placeholder="Enter text for game..."
      />
    );
  };

  const bottomSection = () => {
    if (dialogueType === "Create") {
      return (
        <div className="flex flex-col w-[100%] items-center">
          {textInputForGame()}
          {createGameBtn()}
        </div>
      );
    }
    if (dialogueType === "Join") {
      return joinGameBtn();
    }
  };

  return (
    <div className="absolute h-screen w-screen z-[100] bg-black">
      <div className="border-2 p-10 rounded-lg mx-auto mt-[150px] w-1/2 flex flex-col items-center">
        <form className="w-[100%]">
          <input
            ref={displayName}
            type="text"
            placeholder="Display Name"
            className="p-5 rounded-lg w-[100%]"
          />
        </form>
        {bottomSection()}
      </div>
    </div>
  );
};

export default EntryDialogue;
