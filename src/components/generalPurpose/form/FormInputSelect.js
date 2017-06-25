import React from 'react'
import PropTypes from 'prop-types'

import './FormInputSelect.css'

const FormInputSelect = ({ onChange, label, options }) => (
  <div className="form-input-select">
    {label && <p>{label}</p>}
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
)

FormInputSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
}

FormInputSelect.defaultProps = {
  label: '',
}

export default FormInputSelect
