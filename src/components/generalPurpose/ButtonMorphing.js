import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ButtonMorphing.css'

class ButtonMorphing extends Component {
  constructor() {
    super()

    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick() {
    const { onClick } = this.props

    onClick()
  }

  render() {
    const { label, content, isMorphed } = this.props

    return (
      <div onClick={this.handleOnClick} className={`ng-btn-morphing ${isMorphed ? 'has-morphed' : ''}`} >
        {!isMorphed && label}
        {isMorphed && content}
      </div>
    )
  }
}

ButtonMorphing.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
  isMorphed: PropTypes.bool,
}

ButtonMorphing.defaultProps = {
  isMorphed: false,
}

export default ButtonMorphing
