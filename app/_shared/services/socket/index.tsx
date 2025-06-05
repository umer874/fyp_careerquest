"use client";
import * as io from "socket.io-client";
import { BaseURL } from "utils/endpoints";

let socket: io.Socket;

const initSocket = (userId: number) => {
  socket = io.connect(BaseURL, {
    transports: ["websocket"],
    query: { userId: userId },
  });
  socket = socket.on("connect", () => {
    console.log("Socket Connected");
  });
};
export { initSocket, socket };
