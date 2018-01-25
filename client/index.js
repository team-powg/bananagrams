import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Board from './components/Board'

import { observe } from './components/Game';
//import Routes from './routes'

// establishes socket connection
import './socket'

observe(tilePosition =>
  ReactDOM.render(
    <Provider store={store}>
      <Board tilePosition={tilePosition} />
    </Provider>,
    document.getElementById('app')
  )
)
