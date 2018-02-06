import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store, { makeGame } from '../store';
import GameFooter from './GameFooter'


export default class WinnersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <h1>HELLO</h1>

        <button className="btn" id="challenge-winner">Challenge Winner</button>

        <GameFooter />
      </div>
    )
  }
}
