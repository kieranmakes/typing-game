import Multiplayer from "../Multiplayer/multiplayer";

const messageHandler = (io, socket, options) => {
  let gameId = options.gameid;
  let game = options.games.get(gameId);
  // let displayName = options.displayName;

  const setGame = () => {
    console.log(gameId);
    options.games.set(gameId, game);
    game = options.games.get(gameId);
  };

  const createdMessage = (msg) => {
    socket.to(gameId).emit("newIncomingMessage", msg);
  };

  const onDisconnect = () => {
    if (game) {
      console.log(game);
      game.removePlayer(socket.id);
      setGame();
      io.in(gameId).emit("players", game.getPlayers());
      io.in(gameId).emit("readyPlayers", game.getPlayersReadyToStart());
      io.in(gameId).emit("finishedPlayers", game.getFinishedPlayers());
      // Handle clean up of game in the games Map to remove when all players leave
      if (Object.keys(game.getPlayers()).length === 0) {
        options.games.delete(gameId);
      }
    }
  };

  const onStart = (pos) => {
    game.startGame(socket.id);
    setGame();
    io.in(gameId).emit("readyPlayers", game.getPlayersReadyToStart());
    if (game.getGameState() === "playing") {
      io.in(gameId).emit("gameState", game.getGameState());
    }
  };

  const onPosUpdate = (pos) => {
    game.updatePlayerPosition(socket.id, pos);
    setGame();
    socket.to(gameId).emit("players", game.getPlayers());
    console.log(game);
  };

  const onPlayerFinish = ({ wpm, accuracy, duration }) => {
    console.log("in on finish");
    if (
      game
        .getFinishedPlayers()
        .map((e) => e.playerId)
        .indexOf(socket.id) === -1
    ) {
      game.playerFinish(socket.id, wpm, accuracy, duration);
      setGame();
      socket.to(gameId).emit("finishedPlayers", game.getFinishedPlayers());
      let gameState = game.getGameState();
      if (gameState === "finished") {
        socket.to(gameId).emit("gameState", gameState);
      }
    }
  };

  const onReset = () => {
    if (game.getGameState() === "finished") {
      game.resetGame();
      setGame();
      io.in(gameId).emit("players", game.getPlayers());
      io.in(gameId).emit("readyPlayers", game.getPlayersReadyToStart());
      io.in(gameId).emit("gameState", game.getGameState());
      io.in(gameId).emit("finishedPlayers", game.getFinishedPlayers());
      io.in(gameId).emit("reset");
    }
  };

  socket.on("gameid", ({ gameid, displayName }) => {
    console.log("here");
    gameId = gameid;
    displayName = displayName;
    game = options.games.get(gameId);
    if (!game) {
      game = new Multiplayer();
      setGame();
    }
    socket.leaveAll();

    socket.join(gameId);
    if (game.getGameState() === "init") {
      game.addPlayer(socket.id, displayName);
      setGame();
    }
    io.in(gameId).emit("players", game.getPlayers());
    io.in(gameId).emit("readyPlayers", game.getPlayersReadyToStart());
    io.in(gameId).emit("gameState", game.getGameState());
  });

  socket.on("disconnect", onDisconnect);
  // socket.on("disconnecting", onDisconnect);
  socket.on("start", onStart);
  socket.on("posUpdate", onPosUpdate);
  socket.on("playerFinish", onPlayerFinish);
  socket.on("reset", onReset);
};

export default messageHandler;
