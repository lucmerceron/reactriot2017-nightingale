import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'

import './App.css'

class App extends React.Component {
  render() {
    const { store } = this.props

    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Routes />
          </div>
        </Provider>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
