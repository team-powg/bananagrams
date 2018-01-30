import firebase from '../firebase'



/* ACTION TYPES */
const CREATE_GAME = 'CREATE_GAME'


/* ACTION CREATORS */
const createGame = game => ({ type: CREATE_GAME, game })


/* THUNK CREATORS */

export const makeGame = (currentGame, pot, players) =>
  dispatch => {
    firebase.database().ref('games').child(currentGame).set({
      currentGame,
      pot,
      players
    })
    dispatch(createGame({ currentGame, pot, players }))
  }





/* REDUCER */

export default function (game = {}, action) {
  switch (action.type) {
    case CREATE_GAME:
      return action.game
    default:
      return game
  }
}
