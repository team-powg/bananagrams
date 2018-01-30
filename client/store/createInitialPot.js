import axios from 'axios'
import history from '../history'
import firebase from '../firebase'


const CREATE_POT = 'CREATE_POT'


const createGame = pot => ({ type: CREATE_POT, pot })


export const = () =>
  dispatch =>
    axios.get('/api/users/orders/')
      .then(res => res.data)
      .then(result => {
        dispatch(createGame(result))
      })
      .catch(err => console.log(err))



export default function (pot = [], action) {
  switch (action.type) {
    case CREATE_POT:
      return action.pot
    default:
      return pot
  }
}
