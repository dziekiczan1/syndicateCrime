const messageHandler = (io: any, socket: any) => {
  const createdMessage = (msg: any) => {
    if (socket.id === msg.recipientSocketId) {
      return;
    }
    socket.broadcast.emit("newIncomingMessage", msg);
  };
  socket.on("createdMessage", createdMessage);
};

export default messageHandler;
