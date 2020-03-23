import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import TokenService from '../services/token-service'
import './Header.css'
import Context from '../Context/Context'

export default class Header extends Component {
  static contextType = Context
  state = {
    registered: false,
    logout: false
  }

  handleLogoutClick = () => {
    this.context.setusername()
  }

  // handleLogoutClick = () => {
  //   TokenService.clearAuthToken()
  // }

  renderHeaderButtons() {
    if (!this.context.username && !this.state.registered) {
      return this.renderLoginLink()
    } else if (this.context.username) {
      return this.renderLogoutLink()
    } else {
      return this.renderBackLink()
    }
  }

  handleRegister = () => {
    this.setState({
      registered: !this.state.registered
    })
  }

  handleBackButton = () => {
    this.setState({
      registered: false
    })
  }

  renderLeaderBoardLink() {
    return (
      <div className='leaderBoard'>
        <Link to='/leaderboard' >
          Leaderboard
        </Link>
      </div>
    )
  }

  renderBackLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleBackButton}
          to='/'>
          Back
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

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          onClick={this.handleRegister}
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    console.log(this.context);

    return <>
      <nav className='Header'>
        <h1>
          Tic-Tac-Toe Championship Edition
        </h1>
        {/* {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()} */}
        {this.renderLeaderBoardLink()}
        {this.renderHeaderButtons()}
      </nav>
    </>
  }
}
