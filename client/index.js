import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import {observe} from './components/Game'

// establishes socket connection
import './socket'


observe(tilePosition =>
ReactDOM.render(
  <Provider store={store}>
  <Routes tilePosition={tilePosition} />
  </Provider>,
  document.getElementById('app')
)
)
