import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Game from "../../components/Game";

const GamePage = () => {
  const router = useRouter();
  const { gid } = router.query;
  return <Game gameid={gid} displayName="kieran" />;
};

export default GamePage;
