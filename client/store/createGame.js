import firebase from '../firebase'

/* ACTION TYPES */
const CREATE_GAME = 'CREATE_GAME'
const SWAP_TILE = 'SWAP_TILE'

/* ACTION CREATORS */
const createGame = game => ({ type: CREATE_GAME, game })
const swapTile = pot => ({ type: CREATE_GAME, pot })

/* THUNK CREATORS */
export const makeGame = (currentGame, pot, players) =>
  dispatch => {
    firebase.database().ref('games').child(currentGame).set({
      currentGame,
      pot,
      players
    })
    dispatch(createGame({ currentGame, pot, players }))
  }

  export const dumpTile = (gameId, pot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot
    })
    dispatch(swapTilePot( pot ))
  }

/* REDUCER */
export default function (game = {}, action) {
  switch (action.type) {
    case CREATE_GAME:
      return action.game
    case SWAP_TILE:
      return {...game, pot: action.pot}
    default:
      return game
  }
}
