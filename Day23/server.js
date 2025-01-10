import { WebSocketServer } from "ws";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.send("Welcometo the websocket server");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Server echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.log(`Error: ${error}`);
  });
});

console.log(`Server running on ws://localhost:${PORT}`);
