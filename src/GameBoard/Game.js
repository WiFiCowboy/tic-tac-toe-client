import React from "react";
import Board from "./Board";
import TokenService from "../services/token-service";
import config from "../config";
import "./Game.css";
import { Button } from "../Utils/Utils";
import audio from "../Sound/wave2.wav";

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      endGame: false,
    };
  }

  componentDidMount() {
    this.audio = new Audio(audio);
    this.audio.load();
    this.playAudio();
  }

  playAudio() {
    const audioPromise = this.audio.play();
    if (audioPromise !== undefined) {
      audioPromise
        .then((_) => {
          // autoplay started
        })
        .catch((err) => {
          // catch dom exception
          console.info(err);
        });
    }
  }

  calculateWinner(squares) {
    //
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  saveGame(winner) {
    fetch(`${config.API_ENDPOINT}/users/game`, {
      body: JSON.stringify({
        game: winner === "X" ? true : false,
      }),
      method: "post",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    });
  }

  newGame = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      endGame: false,
    });
  };

  handleClick(i) {
    this.playAudio();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.endGame === true) {
      return;
    }

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const winner = this.calculateWinner(squares);
    let endGame = this.state.endGame;
    if (winner) {
      this.saveGame(winner);
      endGame = true;
    }
    this.setState(
      {
        endGame,
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      },
      (c) => {
        if (!this.state.xIsNext) {
          this.computerPlayer(squares);
        }
      }
    );
  }
  // Attack mode
  computerPlayer(squares) {
    const freePositions = [];
    squares.forEach((square, index) => {
      if (!square) {
        freePositions.push(index);
      }
    });
    const computerPositions = [];
    squares.forEach((square, index) => {
      if (square === "O") {
        computerPositions.push(index);
      }
    });
    let position = Math.floor(Math.random() * freePositions.length);
    let maxTotal = 0;
    let lineFound;
    lines.forEach((line) => {
      let freeFound = false;
      let total = 0;
      line.forEach((pos) => {
        computerPositions.forEach((c) => {
          if (c === pos) {
            total++;
          }
        });

        freePositions.forEach((c) => {
          if (c === pos) {
            freeFound = true;
          }
        });
      });
      if (total > maxTotal && freeFound) {
        lineFound = line;
      }
    });
    if (lineFound) {
      lineFound.forEach((l) => {
        let found = false;

        freePositions.forEach((free) => {
          if (free === l) {
            found = true;
          }
        });
        if (found === true) {
          position = l;
        }
      });
    }

    this.handleClick(position);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Your Move: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        {this.state.endGame ? (
          <Button className="new-game-btn" onClick={this.newGame}>
            new game
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Game;
