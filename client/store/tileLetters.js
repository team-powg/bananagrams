
// Action Type
const GET_ALL_LETTERS = 'GET_ALL_LETTERS'

// Action
export const getAllLetters = () => {
  return {
    type: GET_ALL_LETTERS
  }
}

// Reducer
function tilePositionReducer (state = ['A'], action) {
  switch (action.type) {
    case GET_ALL_LETTERS:
      return state
    default:
      return state
  }
}

export default tilePositionReducer
