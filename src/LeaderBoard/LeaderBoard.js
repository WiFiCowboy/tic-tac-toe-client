import React, { Component } from 'react'

export default class LeaderBoard extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/users/leaderboard')
      .then(res => res.json())
      .then(data => this.setState({
        data
      }))
  }
  render() {
    return (
      <div>
        <ol>
          {this.state.data.map(user => (
            <li>{user.user_name}<span>Games Won: {user.number_wins}</span></li>
          ))}
        </ol>
      </div>
    )
  }
}