import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ButtonMorphing.css'

class ButtonMorphing extends Component {
  constructor() {
    super()

    this.state = {
      isContentVisible: false,
      morphTriggered: false,
    }
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    const { onClick } = this.props

    this.setState({ isContentVisible: true, morphTriggered: true })
    onClick()
  }

  render() {
    const { label, content } = this.props
    const { isContentVisible, morphTriggered } = this.state

    return (
      <div onClick={this.handleOnClick} className={`ng-btn-morphing ${morphTriggered ? 'has-morphed' : ''}`} style={{ width: morphTriggered ? '22rem' : '' }} >
        {!isContentVisible && label}
        {isContentVisible && content}
      </div>
    )
  }
}

ButtonMorphing.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
}

ButtonMorphing.defaultProps = {

}

export default ButtonMorphing
