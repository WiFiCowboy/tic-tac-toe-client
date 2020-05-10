import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Button } from '../Utils/Utils'
import Context from "../Context/Context";

class LoggedIn extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="logged-in">
        <form>
          <h2>Welcome back!</h2>
          <h3>
            <span>{this.context.user_name}</span>
          </h3>
          <p>
            Welcome Back to Tic-Tac-Toe Championship Edition! Beat the Computer
            by being the first to connect your mark (X) in a row, rows can be
            vertical, horizontal or diagonal, when a player connects 3 in a row
            or all 9 squares are full the game is over.
          </p>
          <div className="Header__not-logged-in">
            <Link to="/game">Start Game</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoggedIn;
