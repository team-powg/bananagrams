import firebase from '../firebase'

/* ACTION TYPES */
const CREATE_GAME = 'CREATE_GAME'
const SWAP_TILE = 'SWAP_TILE'
const GENERATE_POT = 'GENERATE_POT'
const PEEL_FROM_GLOBAL_POT = 'PEEL_FROM_GLOBAL_POT'
// const UPDATE_PLAYER_POT = 'UPDATE_PLAYER_POT'


/* ACTION CREATORS */
const createGame = game => ({ type: CREATE_GAME, game })
const swapTile = pot => ({ type: SWAP_TILE, pot })
const generatePot = pot => ({ type: GENERATE_POT, pot })
const peelGlobalPot = pot => ({ type: PEEL_FROM_GLOBAL_POT, pot})


/* THUNK CREATORS */
export const makeGame = (currentGame, pot, players, userId) =>

async dispatch => {
  await firebase.database().ref('games').child(currentGame)
  .set({
    currentGame,
    pot,
    players,
    gameStarted: false
  })
  await firebase.database().ref(`games/${currentGame}/players/Player 1`).child('id')
  .set(userId.sessionId) //Set Player 1 ID here
  dispatch(createGame({currentGame, pot, players}))
}
// const updatePlayerPot = (playerPot, player) => ({type: UPDATE_PLAYER_POT, playerPot, player})

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

export const updateTilePositionOnFirebase = (updatedPot, player, gameId) =>
  async (dispatch) => {
    const playerNumber = `Player ${player}`
    await firebase.database().ref(`games/${gameId}/players/${playerNumber}/playerPot`).set(updatedPot)
    await firebase.database().ref(`games/${gameId}`).once('value', updateSnapshot => {
      dispatch(createGame(updateSnapshot.val()))
    })
  }


export const globalPotListenerThunk = (gameId) =>
  async dispatch => {
    // console.log("REDUX GAME ID: ", gameId)
    await firebase.database().ref(`games/${gameId}/pot`).on('value', snapshot => {
      // console.log("SNAPSHOT: ", snapshot.val())
      dispatch(swapTile(snapshot.val()))
      firebase.database().ref(`games/${gameId}`).once('value', updatedGame => {
      dispatch(createGame(updatedGame.val()))
     })
  })
}


// export const updatePlayerPotThunk = (gameId, playerNumber, playerPot) =>
//   dispatch => {
//     let player = 'Player ' + playerNumber
//     firebase.database().ref(`games/${gameId}/players/${player}/playerPot`).update({
//       playerPot
//     })
//     dispatch(updatePlayerPot(playerPot, player))
//   }

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
    // case UPDATE_PLAYER_POT:
    //   return {...game, players: action.player action.playerPot }
    default:
      return game
  }
}
