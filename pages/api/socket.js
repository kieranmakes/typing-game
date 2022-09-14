import { Server } from "socket.io";
import messageHandler from "../utils/sockets/messageHandler";
import Multiplayer from "../utils/Multiplayer/multiplayer";

let games = new Map();

export default function SocketHandler(req, res) {
  let gameid = req.query.gameid;
  let displayName = req.query.displayName;

  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  let game =
    games.get(gameid) !== undefined
      ? games.get(gameid)
      : games.set(gameid, new Multiplayer());

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    messageHandler(io, socket, { gameid, displayName, games });
  };

  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}
