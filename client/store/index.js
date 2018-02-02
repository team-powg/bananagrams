import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import squareToSquareMove from './squareToSquareMove'
import selectedTile from './selectedTile'
import createGame from './createGame';
import playersPouch from './playersPouch';

const reducer = combineReducers({user, squareToSquareMove, createGame, selectedTile, playersPouch})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './createGame'
export * from './playersPouch'
export * from './selectedTile'

