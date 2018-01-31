import firebase from '../firebase'

/* ACTION TYPES */
const CREATE_GAME = 'CREATE_GAME'
const SWAP_TILE = 'SWAP_TILE'
const GENERATE_POT = 'GENERATE_POT'
const PEEL_FROM_GLOBAL_POT = 'PEEL_FROM_GLOBAL_POT'

/* ACTION CREATORS */
const createGame = game => ({ type: CREATE_GAME, game })
const swapTile = pot => ({ type: SWAP_TILE, pot })
const generatePot = pot => ({ type: GENERATE_POT, pot })
const peelGlobalPot = pot => ({ type: PEEL_FROM_GLOBAL_POT, pot})


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

  export const updatePot = (gameId, pot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot
    })
    console.log("POT: ", pot)
    dispatch(generatePot( pot ))
  }

  export const peelTile = (gameId, pot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot
    })
    console.log("POT: ", pot)
    dispatch(peelGlobalPot( pot ))
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
    case GENERATE_POT:
      return {...game, pot: action.pot}
    case SWAP_TILE:
      return {...game, pot: action.pot}
    case PEEL_FROM_GLOBAL_POT:
      return {...game, pot: action.pot}
    default:
      return game
  }
}
