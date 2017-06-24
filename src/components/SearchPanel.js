import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FormInputText from './generalPurpose/form/FormInputText'
import MusicListItem from './MusicListItem'

import './SearchPanel.css'

class SearchPanel extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
        <FormInputText placeholder="search for a music" onChange={() => console.log} />
        <ul>
          <MusicListItem />
        </ul>
      </div>
    )
  }
}

SearchPanel.propTypes = {
}

export default SearchPanel

