import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import TabMenu from './feedPanel/TabMenu'

// import './FeedPanel.css'

class FeedPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
        <TabMenu />
      </div>
    )
  }
}

FeedPanel.propTypes = {

}

export default FeedPanel

