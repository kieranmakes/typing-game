import { createContext, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import uniqid from "uniqid";

import styles from "../styles/Home.module.css";
import EntryDialogue from "../components/EntryDialogue";

export default function Home() {
  const [user, setUser] = useState({ displayName: "", userId: "" });

  const updateUser = (displayName) => {
    setUser({ ...user, displayName });
  };

  useEffect(() => {
    setUser({ ...user, userId: uniqid() });
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
      </div>
    </div>
  );
}
