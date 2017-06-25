import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys } from 'lodash'

import QrScanner from 'react-qr-reader'
import FormInputText from './generalPurpose/form/FormInputText'

import './JoinPlaylistContent.css'
import qrCodeIns from '../assets/qr-code-instructions.svg'

class JoinPlaylistContent extends React.Component {
  constructor() {
    super()

    this.state = {
      privatePlaylistId: '',
      qrScanMode: false,
    }
  }


  render() {
    const { playlists, switchToPlaylist } = this.props
    const { privatePlaylistId, qrScanMode } = this.state

    return (
      <div className="join-playlist-content">
        <div className="create-playliste-content-title-bar" />
        <h2>Join a Playlist</h2>
        <div className="join-playlist-qr">
          {!qrScanMode && <img className="join-playlist-content-scann" src={qrCodeIns} alt="qr code instructions" onClick={() => this.setState({ qrScanMode: true })} />}
          {qrScanMode && <QrScanner onScan={() => console.log('scan')} onError={() => console.log('error')} />}
        </div>
        <p>or search for a playlist</p>
        <FormInputText placeholder="search for a playlist" onChange={(value) => this.setState({ privatePlaylistId: value })} />
        <div onClick={() => switchToPlaylist('private', privatePlaylistId)}>Join Private</div>
        <ul>
          {keys(playlists).map(key => (
            !playlists[key].private
            ? (
              <li key={key}>
                <div className="join-playlist-name">{playlists[key].name}</div>
                <div className="join-playlist-tag">{playlists[key].tag}</div>
                <div className="join-playlist-button" onClick={() => switchToPlaylist('public', key)}>Join</div>
              </li>
            ) : null))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  playlists: state.playlists,
  switchToPlaylist: (type, id) => ownProps.history.push(`/playlists/${type}/${id}`),
})

JoinPlaylistContent.propTypes = {
  playlists: PropTypes.object.isRequired,
  switchToPlaylist: PropTypes.func.isRequired,
}

export default withRouter(connect(mapStateToProps)(JoinPlaylistContent))
