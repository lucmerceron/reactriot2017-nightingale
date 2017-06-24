import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const Button = ({ label, onClick, color }) => (
  <div className={`ng-btn btn-${color}`} onClick={onClick}>{label}</div>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
}

Button.defaultProps = {
  color: 'blue',
}

export default Button
