import firebase from '../firebase';

// Action Type
const MONITOR_OTHER_PLAYERS_TILES = 'MONITOR_OTHER_PLAYERS_TILES'

// Action

const monitorOtherPlayersTiles = (allPlayersObj) => ({ type: MONITOR_OTHER_PLAYERS_TILES, allPlayersObj})

// Thunk Dispatcher to Firebase

export const startOtherPlayersMonitor = (gameId, playerNumber) =>
  dispatch => {
    const player = `Player ${playerNumber}`
    firebase.database().ref(`games/${gameId}/players/${player}/playerPot`).on('value', (snapshot) => {
      const playerObj = {}
      playerObj[player] = snapshot.val()
      dispatch(monitorOtherPlayersTiles(playerObj))
    })
  }

// Reducer

function monitorOtherPlayersReducer (state = {}, action) {
  switch (action.type) {
    case MONITOR_OTHER_PLAYERS_TILES:
      return action.allPlayersObj
    default:
      return state
  }
}

export default monitorOtherPlayersReducer
