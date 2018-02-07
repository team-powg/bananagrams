import firebase from '../firebase'


// Action Type
const LISTEN_TO_1_TILES = 'LISTEN_TO_1_TILES'


// Action
export const listen1Tiles = (mappedTiles) => {
  return {
    type: LISTEN_TO_1_TILES,
    payload: mappedTiles
  }
}


//THUNK
export const listenTo1TilesThunk = (gameId) =>
dispatch => {
  firebase.database().ref(`games/${gameId}/players/Player 1`).on('value', snapshot => {
    let mappedTileData = {}
    let rawTiles = snapshot.val()
    rawTiles.playerPot.forEach(tile => {
      if (tile.x && tile.y) {
        mappedTileData[`${tile.x}-${tile.y}`] = tile
      }
    })
    dispatch(listen1Tiles(mappedTileData))
  })
}

// Reducer
function watchPlayer1Tiles (state = {}, action) {
  switch (action.type) {
    case LISTEN_TO_1_TILES:
      return action.payload
    default:
      return state
  }
}

export default watchPlayer1Tiles
