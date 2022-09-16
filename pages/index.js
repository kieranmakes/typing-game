import { createContext, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import EntryDialogue from "../components/EntryDialogue";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Game</title>
        <meta name="description" content="Typing Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <EntryDialogue dialogueType="Create" />
      </div>
    </div>
  );
}
