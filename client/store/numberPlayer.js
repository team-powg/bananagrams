// import firebase from '../firebase'

// // Action Type
// const NUMBER_OF_PLAYER = 'NUMBER_OF_PLAYER';


// // Action
// export const checkNumberOfPlayers = (status) => ({ type: NUMBER_OF_PLAYER, status })


// // Thunk Dispatcher to Firebase

// // export const listenToNumberOfPlayers = gameId =>
// //     async dispatch => {
// //      await firebase.database().ref(`games/${gameId}/players`).on('value', (snapshot) => {
// //        dispatch(checkNumberOfPlayers()
// //      })
// //    }


// // Reducer
// function checkGameStartStatusReducer (state = false, action) {
//   switch (action.type) {
//     case NUMBER_OF_PLAYER:
//       return action.status
//     default:
//       return state
//   }
// }

// export default checkGameStartStatusReducer
