import React from 'react'
import PropTypes from 'prop-types'

import Input from '../generalPurpose/form/FormInputText'

import './SearchInput.css'

const SearchInput = ({ searchFromYoutube }) => (
  <div className="search-panel-input">
    <Input
      placeholder="Search for a music"
      onChange={searchFromYoutube}
    />
  </div>
)

SearchInput.propTypes = {
  searchFromYoutube: PropTypes.func.isRequired,
}

export default SearchInput
