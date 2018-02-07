import firebase from '../firebase'


// Action Type
const LISTEN_TO_2_TILES = 'LISTEN_TO_2_TILES'


// Action
export const listenTo2Tiles = (mappedTiles) => {
  return {
    type: LISTEN_TO_2_TILES,
    payload: mappedTiles
  }
}


//THUNK
export const listenTo2TilesThunk = (gameId) =>
dispatch => {
  firebase.database().ref(`games/${gameId}/players/Player 2`).on('value', snapshot => {
    let mappedTileData = {}
    let rawTiles = snapshot.val()
    rawTiles.playerPot.forEach(tile => {
      if (tile.x && tile.y) {
        mappedTileData[`${tile.x}-${tile.y}`] = tile
      }
    })
    dispatch(listenTo2Tiles(mappedTileData))
  })
}

// Reducer
function watchPlayer2Tiles (state = {}, action) {
  switch (action.type) {
    case LISTEN_TO_2_TILES:
      return action.payload
    default:
      return state
  }
}

export default watchPlayer2Tiles
