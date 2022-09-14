class Multiplayer {
  constructor() {
    this.players = new Map();
    this.playersReadyToStart = [];
    this.finishedPlayers = [];
    this.gameState = "init"; // init, playing, finished
  }

  addPlayer(playerId, displayName) {
    this.players.set(playerId, { displayName, completion: 0 });
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
    let i = this.playersReadyToStart.indexOf(playerId);
    if (i > -1) {
      this.playersReadyToStart.splice(i, 1);
    }
    this.finishedPlayers = this.finishedPlayers.map((player) => {
      if (player.playerId !== playerId) {
        return player;
      }
    });
  }

  getPlayers() {
    return Object.fromEntries(this.players);
  }

  startGame(playerId) {
    this.playersReadyToStart.push(playerId);
    if (
      Object.keys(this.getPlayers()).sort().join(",") ===
      this.playersReadyToStart.sort().join(",")
    )
      this.gameState = "playing";
  }

  updatePlayerPosition(playerId, position) {
    if (this.getGameState() === "playing") {
      this.players.set(playerId, {
        ...this.players.get(playerId),
        completion: position,
      });
    }
  }

  getPlayersReadyToStart() {
    return this.playersReadyToStart;
  }

  getFinishedPlayers() {
    return this.finishedPlayers;
  }

  playerFinish(playerId, wpm, accuracy, duration) {
    this.finishedPlayers.push({ playerId, wpm, accuracy, duration });
    let players = this.getPlayers();
    let finishedPlayerIds = this.finishedPlayers.map((player) => {
      return player.playerId.toString();
    });
    if (
      Object.keys(players).sort().join(",") ===
      finishedPlayerIds.sort().join(",")
    ) {
      this.gameFinish();
    }
  }

  gameFinish() {
    this.gameState = "finished";
  }

  resetGame() {
    if (this.gameState === "finished") {
      this.gameState = "init";
      this.playersReadyToStart = [];
      this.finishedPlayers = [];
      let players = this.getPlayers();
      Object.keys(players).forEach((playerId) => {
        this.players.set(playerId, {
          ...this.players.get(playerId),
          completion: 0,
        });
      });
    }
  }

  getGameState() {
    return this.gameState;
  }
}

// (function testGame() {
//   const game = new Multiplayer();

//   game.addPlayer(1, "kieran");
//   game.addPlayer(2, "james");
//   game.addPlayer(3, "ryan");
//   console.log(game.getPlayers()); // correct

//   game.removePlayer(1);
//   console.log(game.getPlayers()); // correct

//   game.updatePlayerPosition(2, 50);
//   console.log(game.getPlayers()); // correct

//   game.startGame();
//   console.log(game.getGameState()); // correct

//   game.updatePlayerPosition(2, 100);
//   game.playerFinish(2);
//   console.log(game.getGameState()); // correct

//   game.updatePlayerPosition(3, 100);
//   game.playerFinish(3);
//   console.log(game.getGameState()); // correct

//   game.resetGame();
//   console.log(game.getGameState()); // correct
//   console.log(game.getPlayers());
// })();

export default Multiplayer;
