import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import './Header.css'
import Context from '../Context/Context'

export default class Header extends Component {
  static contextType = Context
  state = {
    leaderboard: true,
    registered: false,
  }

  handleLogoutClick = () => {
    this.context.setusername()
    TokenService.clearAuthToken()
  }

  handleLeaderboardClick = () => {
    this.setState({
      leaderboard: !this.state.leaderboard
    })
  }

  handleRegisterClick = () => {
    this.setState({
      registered: !this.state.registered
    })
  }

  handleLeaderBoardButtons() {
    if (this.state.leaderboard) {
      return this.renderLeaderBoardLink()
    } else {
      if (this.context.username) {
        return this.renderLeaderBoardStartGame()
      } else {
        return this.renderLeaderBoardBackLink()
      }
    }
  }

  renderHeaderButtons() {

    if (!this.context.username) {
      return this.renderRegisterButtons()
    } else {
      return this.renderLogoutLink()
    }
  }

  renderRegisterButtons() {
    if (!this.state.registered) {
      return this.renderRegisterLink()
    } else {
      return this.renderRegisterBackLink()
    }
  }

  renderLeaderBoardLink() {
    return (
      <div className='leaderBoard'>
        <Link
          onClick={this.handleLeaderboardClick}
          to='/leaderboard' >
          Leaderboard
        </Link>
      </div>
    )
  }

  renderLeaderBoardBackLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLeaderboardClick}
          to='/'>
          Back
        </Link>
      </div>
    )
  }

  renderLeaderBoardStartGame() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLeaderboardClick}
          to='/game'>
          Game
        </Link>
      </div>
    )
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderRegisterLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          onClick={this.handleRegisterClick}
          to='/register'>
          Register
        </Link>
      </div>
    )
  }


  renderRegisterBackLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleRegisterClick}
          to='/'>
          Back
        </Link>
      </div>
    )
  }

  render() {


    return <>
      <nav className='Header'>
        <div className='title'>
          <h1>
            Tic-Tac-Toe Championship Edition
          </h1>
        </div>
        <div className="button-box">
          {this.handleLeaderBoardButtons()}
          {this.renderHeaderButtons()}
        </div>
      </nav>
    </>
  }
}
