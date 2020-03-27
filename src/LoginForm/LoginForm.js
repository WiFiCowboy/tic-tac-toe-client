import React, { Component } from 'react'
import { Button, Input } from '../Utils/Utils'
import Context from '../Context/Context'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'

export default class LoginForm extends Component {
  static contextType = Context
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { error: null }

  // handleSubmitBasicAuth = ev => {
  //   ev.preventDefault()
  //   const { user_name, password } = ev.target

  //   console.log('login form submitted')
  //   console.log({ user_name, password })

  //   TokenService.saveAuthToken(
  //     TokenService.makeBasicAuthToken(user_name.value, password.value)
  //   )

  //   user_name.value = ''
  //   password.value = ''
  //   this.props.onLoginSuccess()
  // }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target
    console.log(user_name.value);
    // this.props.onLoginSuccess()

    this.context.setusername(user_name.value)
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    console.log(this.context);

    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <div className='Header__not-logged-in'>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}
