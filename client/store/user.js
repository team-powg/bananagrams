import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_SESSION_ID = 'GET_SESSION_ID'
const GIVE_USER_PLAYER_NUMBER = 'GIVE_USER_PLAYER_NUMBER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  sessionId: null,
  playerNumber: null
}

/**
 * ACTION CREATORS
 */

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getSessionId = (sessionId) => ({type: GET_SESSION_ID, sessionId})
export const giveUserPlayerNumber = (playerNumber) => ({type: GIVE_USER_PLAYER_NUMBER, playerNumber})
/**
 * THUNK CREATORS
 */

 export const giveUserPlayerNumberThunk = playerNumber => dispatch => dispatch(giveUserPlayerNumber(playerNumber))

 export const getSessionIdThunk = () =>
  dispatch =>
    axios.get('/sessions')
    .then(res =>
      dispatch(getSessionId(res.data)))
    .catch(err => console.log(err))

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GIVE_USER_PLAYER_NUMBER:
      return {...state, playerNumber: action.playerNumber}
    case GET_SESSION_ID:
      return {...state, sessionId: action.sessionId }
    default:
      return state
  }
}
