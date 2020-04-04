import React, { Component } from 'react'
import './LeaderBoard.css'

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
      <div className='leaderBoard'>
        <h2 className='high-score'>HIGH SCORES</h2>
        <ol className='score-list'>
          {this.state.data.map(user => (
            <li key={user.id}><span>{user.user_name} </span> <span>{user.number_wins}</span></li>
          ))}
        </ol>
      </div>
    )
  }
}