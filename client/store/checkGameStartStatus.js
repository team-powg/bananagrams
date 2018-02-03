import firebase from '../firebase'

// Action Type
const CHECK_START_STATUS_CHANGE = 'CHECK_START_STATUS_CHANGE';
const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS';

// Action
export const checkStartStatusChange = (status) => ({ type: CHECK_START_STATUS_CHANGE, status })

export const changeGameStatus = (status) => ({ type: CHANGE_GAME_STATUS, status })

// Thunk Dispatcher to Firebase

export const listenToGameThunk = gameId =>
    async dispatch => {
     await firebase.database().ref(`games/${gameId}/gameStarted`).on('value', (snapshot) => {
       dispatch(checkStartStatusChange(snapshot.val()))
     })
   }

export const stopListenToGameThunk = gameId =>
dispatch => {
  firebase.database().ref(`games/${gameId}/gameStarted`).off('value', (snapshot) => {
    console.log('redux snap', snapshot.val())
    dispatch(checkStartStatusChange(snapshot.val()))
  })
}

// Lets all players in waiting room connect to firebase to know if game has started or not
// export const getGameStartStatusThunk = (gameId) =>
//   dispatch => {
//     firebase.database().ref(`games/${gameId}/gameStarted`).once('value', async snapshot => {
//     // Finds next available player spot to assign player's session id
//     let gameStatus = await snapshot.val()
//     dispatch(getGameStartStatus(gameStatus))
//     })
//   }

// Host updates gameStarted from false to true
export const changeGameStatusThunk = (gameId, status) =>
dispatch => {
  firebase.database().ref(`games/${gameId}`).update({gameStarted: status})
  dispatch(changeGameStatus(status))
}

// Reducer
function checkGameStartStatusReducer (state = false, action) {
  switch (action.type) {
    case CHECK_START_STATUS_CHANGE:
      return action.status
    case CHANGE_GAME_STATUS:
      return action.status;
    default:
      return state
  }
}

export default checkGameStartStatusReducer
