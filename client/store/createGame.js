import firebase from '../firebase'
import User, {giveUserPlayerNumber } from './user'

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

// Thunk creator for making a game
export const makeGame = (currentGame, pot, players, userId) =>
async dispatch => {
  await firebase.database().ref('games').child(currentGame)
  .set({
    currentGame,
    pot,
    players
  })
  await firebase.database().ref(`games/${currentGame}/players/Player 1`).child('id')
  .set(userId.sessionId) //Set Player 1 ID here
  dispatch(createGame({ currentGame, pot, players }))
}


  export const updatePot = (gameId, pot) =>
  dispatch => {
    firebase.database().ref(`games/${gameId}`)
    .update({
      pot
    })
    dispatch(generatePot( pot ))
  }

  export const peelTile = (gameId, pot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot
    })
    dispatch(peelGlobalPot( pot ))
  }

  export const dumpTile = (gameId, pot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot
    })
    dispatch(swapTile( pot ))
  }

  // Action thunk for a player joining a game
  export const findGame = (gameId, userId) =>
    dispatch => {
      firebase.database().ref(`games/${gameId}/players`).once('value', async snapshot => {
      // Finds next available player spot to assign player's session id
      let allPlayers = await snapshot.val()

      const findNextUnassignedPlayerKey = Object.entries(allPlayers).find(([key, value]) => {
        if (!value.id) { return key }
      })

      await firebase.database().ref(`games/${gameId}/players/${findNextUnassignedPlayerKey[0]}`).child('id')
      .set(userId.sessionId)

      await firebase.database().ref(`games/${gameId}`).once('value', updateSnapshot => {
         dispatch(createGame(updateSnapshot.val()))
      })
    })
  }

  // let playerNumber = +(findNextUnassignedPlayerKey[0].slice(-1))


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
