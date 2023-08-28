import messageHandler from "@/lib/messageHandler";
import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket_io",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  const onConnection = (socket: any) => {
    messageHandler(io, socket);
  };

  io.on("connection", onConnection);

  res.end();
}
