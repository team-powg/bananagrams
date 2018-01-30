
// Action Type
const SELECT_TILE = 'SELECT_TILE'
const REMOVE_SELECTED_TILE = 'REMOVE_SELECTED_TILE';

// Action
export const selectTile = (tile) => {
  return {
    type: SELECT_TILE,
    tile
  }
}

export const removeSelectedTile = () => {
  return {
    type: REMOVE_SELECTED_TILE
  }
}

// Reducer
function selectedTileReducer (state = {}, action) {
  switch (action.type) {
    case SELECT_TILE:
      return action.tile
    case REMOVE_SELECTED_TILE:
      return null;
    default:
      return state
  }
}

export default selectedTileReducer
