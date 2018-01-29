import {MOVE_TILE} from '../components/DnD/Constants'


// Action

export const setTilePosition = (tileX, tileY) => {
  return {
    type: MOVE_TILE,
    position: {tileX, tileY}
  }
}

// REVIEW: for larger default aruguments, makes sense to organize this differently
//   maybe...
//      (state = makeDefaultState(), action)
//   or
//    (state, action) => {
//      if (!state) {
//        state = {
//          position: {
//            tileX: null,
//            tileY: null,
//          }
//        }
//      }
//    }
//   or
//   function squareToSquareMove (
//    state = {
//      position: {
//        tileX: null,
//        tileY: null,
//      }
//    },
//    action
//   ) => {
//      /* function body */
//   }
//
//   moral of the story, newlines are cheap, horizontal scanning hurts
// Reducer
function squareToSquareMove (state = {position: {tileX: null, tileY: null}}, action) {
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

export default squareToSquareMove


// position: {tileX: 3, tileY: 3}
