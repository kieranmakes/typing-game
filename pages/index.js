import { createContext, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import io from "socket.io-client";
import uniqid from "uniqid";

import styles from "../styles/Home.module.css";
import TypingThroughInput from "../components/TypingThroughInput";
import RacerComponent from "../components/RacerComponent";
import EntryDialogue from "../components/EntryDialogue";

let socket;
let typingCompletionPercent = createContext();

export default function Home() {
  const [user, setUser] = useState({ displayName: "", userId: "" });
  const [typingCompletion, setTypingCompletion] = useState(0);

  const router = useRouter();
  const { pid } = router.query;

  const updateTypingCompletion = (amountCompleted) => {
    setTypingCompletion(amountCompleted);
  };

  const updateUser = (displayName) => {
    setUser({ ...user, displayName });
  };

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  const sendMessage = async () => {
    socket.emit("createdMessage", (msg) => {});
  };

  const text = "hello I am bradley and I smell like poop";
  // strip string of spaces and new lines
  //   .replace("\n", " ")
  //   .replace(/\s\s+/g, " ");

  useEffect(() => {
    setUser({ ...user, userId: uniqid() });
    socketInitializer();
    console.log(pid);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Game</title>
        <meta name="description" content="Typing Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <EntryDialogue updateUser={updateUser} />
        {/* <typingCompletionPercent.Provider */}
        {/*   value={{ typingCompletion, updateTypingCompletion }} */}
        {/* > */}
        {/*   <RacerComponent /> */}
        {/*   <div className="border-2 p-4 rounded-lg w-1/2 h-1/2 mt-8 mx-auto "> */}
        {/*     <h1 className="mb-2">Type Racer</h1> */}
        {/*     <TypingThroughInput text={text} /> */}
        {/*   </div> */}
        {/* </typingCompletionPercent.Provider> */}
      </div>
    </div>
  );
}

export { typingCompletionPercent };
