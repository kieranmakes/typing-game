import { useRef, useState } from "react";
import Link from "next/link";
import Router from "next/router";

import uniqid from "uniqid";

// dialogueType = "Create" | "Join"
const EntryDialogue = ({ dialogueType, onUpdate }) => {
  let displayName = useRef("");

  const updateLocalStorageDisplayName = (displayName) => {
    window.localStorage.setItem("displayName", displayName);
  };

  const changeToGamePage = () => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/");
      Router.push("/game/" + uniqid());
    }
  };

  const handleSubmit = () => {
    let inputValue = displayName.current.value;
    if (inputValue.length > 0) {
      updateLocalStorageDisplayName(inputValue);
      if (dialogueType === "Create") changeToGamePage();
      if (onUpdate) onUpdate();
    }
  };

  const createGameBtn = () => {
    return (
      <button
        className="border-2 p-3 rounded-lg mt-10 hover:border-cyan-500 "
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

  const submitBtn = () => {
    if (dialogueType === "Create") {
      return createGameBtn();
    }
    if (dialogueType === "Join") {
      return joinGameBtn();
    }
  };

  return (
    <div className="absolute h-screen w-screen z-[100] bg-black">
      <div className="border-2 p-10 p-b-15 rounded-lg mx-auto mt-[150px] w-1/2 flex flex-col items-center">
        <form className="w-[100%]">
          <input
            ref={displayName}
            type="text"
            placeholder="Display Name"
            className="p-5 rounded-lg w-[100%]"
          />
        </form>
        {submitBtn()}
      </div>
    </div>
  );
};

export default EntryDialogue;
