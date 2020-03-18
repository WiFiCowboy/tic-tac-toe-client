import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import GameBoard from './GameBoard/GameBoard'
import Header from './Header/Header'
import LoginPage from './routes/LoginPage/LoginPage'
import LoggedIn from './LoggedIn/LoggedInPage'



class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className="App">
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              component={LoginPage}
            />
            <Route
              path={'/LoggedIn'}
              component={LoggedIn}
            />
          </Switch>
        </main>
      </div>
    )
  }
}


export default App;
