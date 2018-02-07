import firebase from '../firebase'


// Action Type
const LISTEN_TO_TILES = 'LISTEN_TO_TILES'


// Action
export const listenTiles = (mappedTiles) => {
  return {
    type: LISTEN_TO_TILES,
    payload: mappedTiles
  }
}


//THUNK
export const listenToTiles = (gameId, playerNumber) =>
dispatch => {
  const player = `Player ${playerNumber}`
  firebase.database().ref(`games/${gameId}/players/${player}`).on('value', snapshot => {
    let mappedTileData = {}
    let rawTiles = snapshot.val()
    rawTiles.playerPot.forEach(tile => {
      if (tile.x && tile.y) {
        mappedTileData[`${tile.x}-${tile.y}`] = tile
      }
    })
    dispatch(listenTiles(mappedTileData))
  })
}

// Reducer
function setTilesReducer (state = {}, action) {
  switch (action.type) {
    case LISTEN_TO_TILES:
      return action.payload
    default:
      return state
  }
}

export default setTilesReducer
