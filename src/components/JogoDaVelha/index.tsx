import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import CheckBtn from "../CheckBtn";

const JogoDaVelha = () => {
  const [gameTable, setTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isX, setIsX] = useState(true);
  useEffect(() => {
    if (!terminou) {
      setTerminou(verificaVitoria("X") || verificaVitoria("O"));
      if (
        !terminou &&
        !gameTable[0].includes("") &&
        !gameTable[1].includes("") &&
        !gameTable[2].includes("")
      ) {
        setTerminou(true);
        setVencedor("empate");
      }
    }
  }, [gameTable]);
  const [terminou, setTerminou] = useState(false);
  const [vencedor, setVencedor] = useState("");
  const verificaVitoria = (simbolo: string) => {
    for (let i = 0; i < gameTable.length; i++) {
      //verifica horizontais
      if (
        gameTable[i][0] === simbolo &&
        gameTable[i][1] === simbolo &&
        gameTable[i][2] === simbolo
      ) {
        setVencedor(simbolo);
        return true;
      }
      //verifica verticais
      if (
        gameTable[0][i] === simbolo &&
        gameTable[1][i] === simbolo &&
        gameTable[2][i] === simbolo
      ) {
        setVencedor(simbolo);
        return true;
      }
    }
    //verifica diagonais
    if (
      (gameTable[0][0] === simbolo &&
        gameTable[1][1] === simbolo &&
        gameTable[2][2] === simbolo) ||
      (gameTable[0][2] === simbolo &&
        gameTable[1][1] === simbolo &&
        gameTable[2][0] === simbolo)
    ) {
      setVencedor(simbolo);
      return true;
    }

    return false;
  };
  const markInTable = (y: number, x: number) => {
    const actualTable: string[][] = [
      [gameTable[0][0], gameTable[0][1], gameTable[0][2]],
      [gameTable[1][0], gameTable[1][1], gameTable[1][2]],
      [gameTable[2][0], gameTable[2][1], gameTable[2][2]],
    ];
    if (actualTable[y][x] === "") {
      actualTable[y][x] = isX ? "X" : "O";
      setIsX(!isX);
    } else {
      actualTable[y][x] = "";
    }
    setTable(actualTable);
  };

  return (
    <>
      {terminou && <h2>Jogo Finalizado!</h2>}
      {vencedor === "O" && <h4>O jogador de Circulo ganhou</h4>}
      {vencedor === "X" && <h4>O jogador de Xis ganhou</h4>}
      {vencedor === "empate" && <h4>O jogo terminou em empate</h4>}
      <table>
        <tbody>
          <tr>
            <CheckBtn
              value={gameTable[0][0]}
              setValue={() => {
                if (!terminou) {
                  markInTable(0, 0);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[0][1]}
              setValue={() => {
                if (!terminou) {
                  markInTable(0, 1);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[0][2]}
              setValue={() => {
                if (!terminou) {
                  markInTable(0, 2);
                }
              }}
              EhX={isX}
            />
          </tr>
          <tr>
            <CheckBtn
              value={gameTable[1][0]}
              setValue={() => {
                if (!terminou) {
                  markInTable(1, 0);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[1][1]}
              setValue={() => {
                if (!terminou) {
                  markInTable(1, 1);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[1][2]}
              setValue={() => {
                if (!terminou) {
                  markInTable(1, 2);
                }
              }}
              EhX={isX}
            />
          </tr>
          <tr>
            <CheckBtn
              value={gameTable[2][0]}
              setValue={() => {
                if (!terminou) {
                  markInTable(2, 0);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[2][1]}
              setValue={() => {
                if (!terminou) {
                  markInTable(2, 1);
                }
              }}
              EhX={isX}
            />
            <CheckBtn
              value={gameTable[2][2]}
              setValue={() => {
                if (!terminou) {
                  markInTable(2, 2);
                }
              }}
              EhX={isX}
            />
          </tr>
        </tbody>
      </table>

      <button
        className={styles.resetBtn}
        onClick={() => {
          setTable([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ]);
          setIsX(true);
          setTerminou(false);
          setVencedor("");
        }}
      >
        Resetar Jogo
      </button>
    </>
  );
};
export default JogoDaVelha;
