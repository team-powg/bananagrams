import axios from 'axios'
import history from '../history'


const CREATE_GAME = 'CREATE_GAME'


const createGame = players => ({ type: CREATE_GAME, players })


export const  = () =>
  dispatch =>
    axios.get('/api/users/orders/')
      .then(res => res.data)
      .then(result => {
        dispatch(createGame(result))
      })
      .catch(err => console.log(err))



export default function (players = 0, action) {
  switch (action.type) {
    case CREATE_GAME:
      return action.players
    default:
      return players
  }
}
