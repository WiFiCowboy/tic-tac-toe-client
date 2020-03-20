import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import TokenService from '../services/token-service'
import './Header.css'

export default class Header extends Component {
  state = { registered: false }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  handleRegister = () => {
    if (this.state.registered === false) {
      this.setState = { registered: true }
    } else {
      this.setState = { registered: false }
    }
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
    // let { id } = useParams();
    // console.log(id);
    return <>
      <nav className='Header'>
        <h1>
          Tic-Tac-Toe Championship Edition
        </h1>
        {/* {this.renderButtons(id)} */}
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}
