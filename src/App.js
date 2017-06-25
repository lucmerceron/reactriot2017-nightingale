import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'

import './App.css'

class App extends React.Component {
  constructor() {
    super()

    this.votingElement = null
  }

  componentDidMount() {
    window.HACKBIT_VOTING_WIDGET.render(this.votingElement)
  }

  render() {
    const { store } = this.props


    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <div className="voting-element" ref={votingElement => (this.votingElement = votingElement)}>

            </div>
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
