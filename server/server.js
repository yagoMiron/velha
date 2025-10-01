import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let players = [];
let currentTurn = null;

wss.on("connection", (ws) => {
  if (players.length >= 2) {
    ws.send(JSON.stringify({ type: "full" }));
    console.log("cheio");

    ws.close();
    return;
  }

  const symbol = players.length === 0 ? "X" : "O";
  players.push({ ws, symbol });
  console.log(
    "player " + players.length + " de simbolo " + symbol + " conectado ao jogo"
  );

  ws.send(JSON.stringify({ type: "joined", symbol }));
  if (players.length === 2) {
    currentTurn = "X";
    broadcast({ type: "start", currentTurn });
  }
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "move" && data.symbol === currentTurn) {
      broadcast(data);
      currentTurn = currentTurn === "X" ? "O" : "X";
      broadcast({ type: "turn", currentTurn });
    }
    if (data.type === "reset") {
      broadcast({ type: "reset" });
      currentTurn = "X";
    }
  });
  ws.on("close", () => {
    players = players.filter((p) => p.ws !== ws);
    broadcast({ type: "reset" });
  });
});
function broadcast(msg) {
  players.forEach((p) => {
    p.ws.send(JSON.stringify(msg));
  });
}
console.log("Servidor WebSocket rodando emws://localhost:8080");
