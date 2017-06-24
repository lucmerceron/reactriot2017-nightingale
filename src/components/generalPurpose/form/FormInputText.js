import React from 'react'
import PropTypes from 'prop-types'

import './FormInputText.css'

const FormInputText = ({ placeholder, onChange, label }) => (
  <div>
    {label && <p>{label}</p>}
    <input type="text" placeholder={placeholder} onChange={(e) => onChange(e.value)} />
  </div>
)

FormInputText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
}

FormInputText.defaultProps = {
  label: '',
}

export default FormInputText
