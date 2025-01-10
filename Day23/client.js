import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to the server");
  ws.send("Hello from client");
});

ws.on("message", (message) => {
  console.log(`Received message => ${message}`);
});

ws.on("close", () => {
  console.log("Disconnected from the server");
});

ws.on("error", (error) => {
  console.log(`Error: ${error}`);
});
