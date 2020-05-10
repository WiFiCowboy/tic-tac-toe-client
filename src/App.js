import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Game from "./GameBoard/Game";
import Header from "./Header/Header";
import LoginPage from "./routes/LoginPage/LoginPage";
import LoggedIn from "./LoggedIn/LoggedInPage";
import RegistrationPage from "./routes/RegistrationPage/RegistrationPage";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import Context from "./Context/Context";
import bgSound from "../src/Sound/bgMusic.wav";

class App extends Component {
  state = {
    hasError: false,
    username: false,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  setusername = (username) => {
    this.setState({
      username: username,
    });
  };

  componentDidMount() {
    this.audio = new Audio(bgSound);
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

  render() {
    return (
      <Context.Provider
        value={{ username: this.state.username, setusername: this.setusername }}
      >
        <div className="App crt">
          <header className="App__header">
            <Header />
          </header>
          <main className="App__main">
            {this.state.hasError && (
              <p className="red">There was an error! Oh no!</p>
            )}
            <Switch>
              <Route exact path={"/"} component={LoginPage} />
              <Route path={"/loggedin"} component={LoggedIn} />
              <Route path={"/register"} component={RegistrationPage} />
              <Route path={"/game"} component={Game} />
              <Route path={"/leaderboard"} component={LeaderBoard} />
            </Switch>
          </main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
