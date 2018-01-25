import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Board from './components/Board'
//import Routes from './routes'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Board tilePosition={[7, 0]} />
  </Provider>,
  document.getElementById('app')
)
