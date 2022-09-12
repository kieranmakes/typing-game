import { createContext, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TypingThroughInput from "../components/TypingThroughInput";
import RacerComponent from "../components/RacerComponent";
import EntryDialogue from "../components/EntryDialogue";

let typingCompletionPercent = createContext();

export default function Home() {
  const [user, setUser] = useState({ displayName: "", userId: "" });
  const [typingCompletion, setTypingCompletion] = useState(0);

  const updateTypingCompletion = (amountCompleted) => {
    setTypingCompletion(amountCompleted);
  };

  const updateUser = (displayName) => {
    setUser({ ...user, displayName });
  };

  const text = "hello I am bradley and I smell like poop";
  // strip string of spaces and new lines
  //   .replace("\n", " ")
  //   .replace(/\s\s+/g, " ");

  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Game</title>
        <meta name="description" content="Typing Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <EntryDialogue onSubmit={updateUser} />
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
