import React from 'react'
import PropTypes from 'prop-types'

import './Switch.css'

const Switch = ({ onChange, label }) => (
  <div>
    {label && <p>{label}</p>}
    <input type="checkbox" onChange={(e) => onChange(e.target.value)} />
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
