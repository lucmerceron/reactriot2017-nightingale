import React from 'react'
import PropTypes from 'prop-types'

import './FormInputText.css'

const FormInputText = ({ defaultValue, placeholder, onChange, label }) => (
  <div>
    {label && <p>{label}</p>}
    <input type="text" placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => onChange(e.target.value)} />
  </div>
)

FormInputText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
}

FormInputText.defaultProps = {
  label: '',
  defaultValue: '',
}

export default FormInputText
