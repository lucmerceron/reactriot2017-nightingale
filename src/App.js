import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import './App.css'

const App = ({ store }) => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  </BrowserRouter>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
