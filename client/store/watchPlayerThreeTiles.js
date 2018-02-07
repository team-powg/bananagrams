import firebase from '../firebase'


// Action Type
const LISTEN_TO_3_TILES = 'LISTEN_TO_3_TILES'


// Action
export const listenTo3Tiles = (mappedTiles) => {
  return {
    type: LISTEN_TO_3_TILES,
    payload: mappedTiles
  }
}


//THUNK
export const listenTo3TilesThunk = (gameId) =>
dispatch => {
  firebase.database().ref(`games/${gameId}/players/Player 3`).on('value', snapshot => {
    let mappedTileData = {}
    let rawTiles = snapshot.val()
    rawTiles.playerPot.forEach(tile => {
      if (tile.x && tile.y) {
        mappedTileData[`${tile.x}-${tile.y}`] = tile
      }
    })
    dispatch(listenTo3Tiles(mappedTileData))
  })
}

// Reducer
function watchPlayer3Tiles (state = {}, action) {
  switch (action.type) {
    case LISTEN_TO_3_TILES:
      return action.payload
    default:
      return state
  }
}

export default watchPlayer3Tiles

