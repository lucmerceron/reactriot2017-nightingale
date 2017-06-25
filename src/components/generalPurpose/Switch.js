import React from 'react'
import PropTypes from 'prop-types'

import './Switch.css'

const Switch = ({ onChange, label }) => (
  <div className="ng-switch">
    {label && <p>{label}</p>}
    <div className="switch-wrapper">
      <input type="checkbox" id="privateChoice" name="set-name" className="switch-input" onChange={(e) => onChange(e.target.value)} />
      <label htmlFor="privateChoice" className="switch-label" />
    </div>
  </div>
)

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
}

Switch.defaultProps = {
  label: '',
}

export default Switch
