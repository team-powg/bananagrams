import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
//import {logout} from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numPlayers: ''
    }
    this.assignNumPlayers = this.assignNumPlayers.bind(this)
  }

  assignNumPlayers(evt) {
    console.log(evt.target.value)
    this.setState({
      numPlayers: evt.target.value
    })
    console.log("CLICKED: ", this.state.numPlayers)
  }


    render() {
      const { children, handleClick, isLoggedIn } = this.props
      console.log("STATE: ", this.state)
      return (
        <div className="main">
          <h1>Team Name</h1>
          <form className="choose-player">
            <button className="btn" value="1" onClick={() => this.assignNumPlayers()}>1 Player</button>
            <button className="btn" value="2" >2 Players</button>
            <button className="btn" value="3" >3 Players</button>
            <button className="btn" value="4">4 Players</button>
          </form>
          <div>
          <button className="start-btn">CREATE GAME</button>
        </div>
          <div>
            <form>
              <input type="text" name="name" placeholder="Enter game id" />
              <button>Join Game</button>
            </form>
          </div>
          <div>
            <Link to='/rules'>
              <button>Rules</button>
            </Link>
          </div>
        </div>
      )
    }
  }

  /**
   * CONTAINER
   */
  const mapState = (state) => {
    return {
      isLoggedIn: !!state.user.id
    }
  }

  const mapDispatch = (dispatch) => {
    return {
      handleClick() {
        dispatch(logout())
      }
    }
  }

  // The `withRouter` wrapper makes sure that updates are not blocked
  // when the url changes
  export default withRouter(connect(mapState, mapDispatch)(Main))

  /**
   * PROP TYPES
   */
  Main.propTypes = {
    children: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }
