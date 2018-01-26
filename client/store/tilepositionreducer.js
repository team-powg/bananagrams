import {MOVE_TILE} from '../components/DnD/Constants'


// Action

export const setTilePosition = (tileX, tileY) => {
  return {
    type: MOVE_TILE,
    position: {tileX, tileY}
  }
}

// Reducer
function tilePositionReducer (state = {position: {tileX: 3, tileY: 3}}, action) {
  const {position} = action
  switch (action.type) {
    case MOVE_TILE:
      return {
        ...state,
        position
      }
    default:
      return state
  }
}

export default tilePositionReducer
