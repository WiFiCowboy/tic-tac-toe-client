import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Utils/Utils'

class LoggedIn extends Component {
  render() {
    return (
      <div className="logged-in">
        <form>
          <h2>Welcome back!</h2>
          <h3><span>Username</span></h3>
          <p>Welcome to Tic-Tac-Toe Championship Edition, Be the first player to connect your mark X or O in a row, rows can be vertical horizontal or diagonal, when all 9 squares are full the game is over.</p>
          {/* <Button type='submit'>
            Start Game
          </Button> */}
          <div className='Header__not-logged-in'>
            <Link
              to='/game'>
              Start Game
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default LoggedIn