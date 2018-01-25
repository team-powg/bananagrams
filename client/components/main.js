import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
//import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props

  return (
    <div className="main">
      <h1>Team Name</h1>
      <div className="choose-player">
        <button className="btn">1 Player</button>
        <button className="btn">2 Players</button>
        <button className="btn">3 Players</button>
        <button className="btn">4 Players</button>
      </div>
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
    handleClick () {
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
