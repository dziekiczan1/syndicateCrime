import messageHandler from "@/lib/messageHandler";
import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  try {
    // if (res.socket.server.io) {
    //   res.end();
    //   return;
    // }

    // alert("workings");

    res.send("Hello, world!");

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
  } catch (error) {
    console.error("WebSocket initialization error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
