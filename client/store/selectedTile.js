
// Action Type
const SELECT_TILE = 'SELECT_TILE'

// Action
export const selectTile = (tile) => {
  console.log('reduxtile', tile)
  return {
    type: SELECT_TILE,
    tile
  }
}

// Reducer
function selectedTileReducer (state = '', action) {
  switch (action.type) {
    case SELECT_TILE:
      return action.tile
    default:
      return state
  }
}

export default selectedTileReducer
