import React from "react";
import "./Greeting.css";

function Greeting() {
  return (
    <div className="greeting">
      <p>
        Welcome to tic-tac-toe championship edition! Please sign in to start a
        game and see if you have what it takes to be the champion. Don't have an
        account, go ahead and create one using the register button. Want to
        check out the current high-scores select the leaderboard button. Play as
        a guest using the credentials below
      </p>
      <ul>
        <li>Username = WOPR</li>
        <li>Password = Play$85$</li>
      </ul>
    </div>
  );
}

export default Greeting;
