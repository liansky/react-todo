import './assets/style/reset.css'
import './assets/style/main.css'

import React from 'react'
import { render } from 'react-dom'
import App from './component/App'
import { Provider } from 'react-redux'
import store from './redux/'


render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('app')
)