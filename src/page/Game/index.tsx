import JogoDaVelha from "../../components/JogoDaVelha";
import { useState, useEffect } from "react";

function Game() {
  const [ws, setWs] = useState<null | WebSocket>(null);
  const [symbol, setSymbol] = useState("");
  const [currentTurn, setCurrentTurn] = useState("");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [status, setStatus] = useState("Aguardando conexão...");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => console.log("Conectado ao servidor");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "full") {
        setStatus("Sala cheia. Tente novamente mais tarde.");
      }
      if (data.type === "joined") {
        setSymbol(data.symbol);
        setStatus(`Você é o jogador ${data.symbol}`);
      }
      if (data.type === "start") {
        setStatus(`Jogo iniciado! Turno do jogador ${data.currentTurn}`);
        setCurrentTurn(data.currentTurn);
      }
      if (data.type === "move") {
        const newBoard: string[][] = data.board;
        newBoard[data.indexX][data.indexY] = data.symbol;
        console.log(newBoard);

        setBoard(newBoard);
      }
      if (data.type === "turn") {
        setCurrentTurn(data.currentTurn);
        setStatus(`Turno do jogador ${data.currentTurn}`);
      }
      if (data.type === "reset") {
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
        setCurrentTurn("X");
        setStatus("Partida encerrada. Sala liberada.");
      }
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  const makeMove = (indexX: number, indexY: number) => {
    if (!ws) return;
    ws.send(JSON.stringify({ type: "move", indexY, indexX, symbol, board }));
  };

  const resetGame = () => {
    if (!ws) return;
    ws.send(JSON.stringify({ type: "reset" }));
  };

  return (
    <main>
      {currentTurn === "" ? (
        <h2>{status}</h2>
      ) : (
        <JogoDaVelha
          board={board}
          makeMove={makeMove}
          resetGame={resetGame}
          currentTurn={currentTurn}
          symbol={symbol}
        />
      )}
    </main>
  );
}

export default Game;
