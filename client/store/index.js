import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import squareToSquareMove from './squareToSquareMove'
import selectedTile from './selectedTile'
import createGame from './createGame';
import playersPouch from './playersPouch';
import checkGameStartStatus from './checkGameStartStatus';
import otherPlayersBoards from './otherPlayersBoards'
import challengeGame from './challengeGame'
import watchPlayer1Tiles from './watchPlayerOneTiles'
import watchPlayer2Tiles from './watchPlayerTwoTiles'
import watchPlayer3Tiles from './watchPlayerThreeTiles'
import watchPlayer4Tiles from './watchPlayerFourTiles'

const reducer = combineReducers({user, squareToSquareMove, createGame, selectedTile, playersPouch, checkGameStartStatus, otherPlayersBoards, challengeGame, watchPlayer1Tiles, watchPlayer2Tiles, watchPlayer3Tiles, watchPlayer4Tiles})

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
export * from './checkGameStartStatus'
export * from './otherPlayersBoards'
export * from './challengeGame'
export * from './watchPlayerOneTiles'
export * from './watchPlayerTwoTiles'
export * from './watchPlayerThreeTiles'
export * from './watchPlayerFourTiles'


