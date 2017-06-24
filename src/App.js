import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import logo from './logo.svg'
import './App.css'

class App extends Component {
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
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
