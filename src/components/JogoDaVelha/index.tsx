import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import CheckBtn from "../CheckBtn";

type Props = {
  board: any[];
  makeMove: (indexY: number, indexX: number) => void;
  resetGame: () => void;
  symbol: string;
  currentTurn: string;
};

const JogoDaVelha = ({
  board,
  makeMove,
  resetGame,
  symbol,
  currentTurn,
}: Props) => {
  useEffect(() => {
    if (!terminou) {
      setTerminou(verificaVitoria("X") || verificaVitoria("O"));
      if (
        !terminou &&
        !board[0].includes("") &&
        !board[1].includes("") &&
        !board[2].includes("")
      ) {
        setTerminou(true);
        setVencedor("empate");
      }
    }
  }, [board]);
  const [terminou, setTerminou] = useState(false);
  const [vencedor, setVencedor] = useState("");
  const verificaVitoria = (simbolo: string) => {
    for (let i = 0; i < board.length; i++) {
      //verifica horizontais
      if (
        board[i][0] === simbolo &&
        board[i][1] === simbolo &&
        board[i][2] === simbolo
      ) {
        setVencedor(simbolo);
        return true;
      }
      //verifica verticais
      if (
        board[0][i] === simbolo &&
        board[1][i] === simbolo &&
        board[2][i] === simbolo
      ) {
        setVencedor(simbolo);
        return true;
      }
    }
    //verifica diagonais
    if (
      (board[0][0] === simbolo &&
        board[1][1] === simbolo &&
        board[2][2] === simbolo) ||
      (board[0][2] === simbolo &&
        board[1][1] === simbolo &&
        board[2][0] === simbolo)
    ) {
      setVencedor(simbolo);
      return true;
    }

    return false;
  };

  return (
    <>
      {terminou ? (
        <h2>Jogo Finalizado!</h2>
      ) : (
        <>
          <h2>Você é o jogador {symbol}</h2>
          {currentTurn === symbol ? (
            <h3>É sua vez</h3>
          ) : (
            <h3>É vez do oponente</h3>
          )}
        </>
      )}
      {vencedor === "O" && <h4>O jogador de Circulo ganhou</h4>}
      {vencedor === "X" && <h4>O jogador de Xis ganhou</h4>}
      {vencedor === "empate" && <h4>O jogo terminou em empate</h4>}
      <table>
        <tbody>
          <tr>
            <CheckBtn
              value={board[0][0]}
              setValue={() => {
                if (!terminou) {
                  makeMove(0, 0);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[0][1]}
              setValue={() => {
                if (!terminou) {
                  makeMove(0, 1);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[0][2]}
              setValue={() => {
                if (!terminou) {
                  makeMove(0, 2);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
          </tr>
          <tr>
            <CheckBtn
              value={board[1][0]}
              setValue={() => {
                if (!terminou) {
                  makeMove(1, 0);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[1][1]}
              setValue={() => {
                if (!terminou) {
                  makeMove(1, 1);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[1][2]}
              setValue={() => {
                if (!terminou) {
                  makeMove(1, 2);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
          </tr>
          <tr>
            <CheckBtn
              value={board[2][0]}
              setValue={() => {
                if (!terminou) {
                  makeMove(2, 0);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[2][1]}
              setValue={() => {
                if (!terminou) {
                  makeMove(2, 1);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
            <CheckBtn
              value={board[2][2]}
              setValue={() => {
                if (!terminou) {
                  makeMove(2, 2);
                }
              }}
              EhX={symbol === "X"}
              suaVez={currentTurn === symbol}
            />
          </tr>
        </tbody>
      </table>
      {terminou && (
        <button
          className={styles.resetBtn}
          onClick={() => {
            setTerminou(false);
            setVencedor("");
            resetGame();
          }}
        >
          Resetar Jogo
        </button>
      )}
    </>
  );
};
export default JogoDaVelha;
