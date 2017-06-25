import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormInputText from './generalPurpose/form/FormInputText'
import FormInputSelect from './generalPurpose/form/FormInputSelect'
import Button from './generalPurpose/Button'
import Switch from './generalPurpose/Switch'

import { createPrivatePlaylist, createPublicPlaylist } from '../actionCreators/playlists'

import './CreatePlaylistContent.css'

const tags = [
  'Rock',
  'Chill',
  'Lolo',
]

class CreatePlaylistContent extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      userName: '',
      isPrivate: false,
      tag: tags[0],
    }

    this.firstUpdate = true
    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this)
  }

  handleCreatePlaylist() {
    const { title, userName, isPrivate, tag } = this.state
    const { crtPrivatePlaylist, crtPublicPlaylist, switchToNewPlaylist } = this.props

    const playlist = { name: title, tag, private: isPrivate }
    // Change locally the name of the user
    if (userName) localStorage.setItem('nightingaleName', userName)

    if (isPrivate) {
      crtPrivatePlaylist(playlist, switchToNewPlaylist)
    } else {
      crtPublicPlaylist(playlist, switchToNewPlaylist)
    }
  }

  render() {
    const { isPrivate } = this.state

    return (
      <div className="create-playliste-content">
        <div className="create-playliste-content-title-bar" />
        <h2>Create a Playlist</h2>
        <FormInputText
          label="Playlist title"
          placeholder="Your awesome playlist title"
          onChange={(value) => this.setState({ title: value })}
        />
        <FormInputText
          label="User Name"
          defaultValue={localStorage.getItem('nightingaleName')}
          placeholder="Give you an awesome name"
          onChange={(value) => this.setState({ userName: value })}
        />
        <FormInputSelect
          label="Select a Tag"
          onChange={(value) => this.setState({ tag: value })}
          options={tags}
        />
        <Switch label="Private" onChange={() => this.setState({ isPrivate: !isPrivate })} />
        <Button label="let's rock" onClick={this.handleCreatePlaylist} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  playlists: state.playlists,
  switchToNewPlaylist: (type, id) => ownProps.history.push(`/playlists/${type}/${id}`),
})

const mapDispatchToProps = dispatch => ({
  crtPrivatePlaylist: (playlist, cb) => dispatch(createPrivatePlaylist(playlist, cb)),
  crtPublicPlaylist: (playlist, cb) => dispatch(createPublicPlaylist(playlist, cb)),
})

CreatePlaylistContent.propTypes = {
  playlists: PropTypes.object.isRequired,
  switchToNewPlaylist: PropTypes.func.isRequired,
  crtPrivatePlaylist: PropTypes.func.isRequired,
  crtPublicPlaylist: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistContent))
