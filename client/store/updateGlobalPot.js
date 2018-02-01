import firebase from '../firebase'


/* ACTION TYPES */
const GENERATE_POT = 'GENERATE_POT'

/* ACTION CREATORS */
const generatePot = pot => ({ type: GENERATE_POT, pot })

/* THUNK CREATOR */
export const updatePot = (gameId, beginningPot) =>
  dispatch => {
    firebase.database().ref('games').child(gameId)
    .update({
      pot: beginningPot,
    })
    dispatch(generatePot( beginningPot ))
  }





/* REDUCER */
export default function (pot = [], action) {
  switch (action.type) {
    case GENERATE_POT:
      return action.pot
    default:
      return pot
  }
}
