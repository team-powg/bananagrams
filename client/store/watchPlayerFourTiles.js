import firebase from '../firebase'


// Action Type
const LISTEN_TO_4_TILES = 'LISTEN_TO_4_TILES'


// Action
export const listenTo4Tiles = (mappedTiles) => {
  return {
    type: LISTEN_TO_4_TILES,
    payload: mappedTiles
  }
}

//THUNK
export const listenTo4TilesThunk = (gameId) =>
dispatch => {
  firebase.database().ref(`games/${gameId}/players/Player 4`).on('value', snapshot => {
    let mappedTileData = {}
    let rawTiles = snapshot.val()
    rawTiles.playerPot.forEach(tile => {
      if (tile.x && tile.y) {
        mappedTileData[`${tile.x}-${tile.y}`] = tile
      }
    })
    dispatch(listenTo4Tiles(mappedTileData))
  })
}

// Reducer
function watchPlayer4Tiles (state = {}, action) {
  switch (action.type) {
    case LISTEN_TO_4_TILES:
      return action.payload
    default:
      return state
  }
}

export default watchPlayer4Tiles

