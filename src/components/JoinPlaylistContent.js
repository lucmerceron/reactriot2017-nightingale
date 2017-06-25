import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys } from 'lodash'

import QrScanner from 'react-qr-reader'
import FormInputText from './generalPurpose/form/FormInputText'
import Button from './generalPurpose/Button'

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
    const { playlists, switchToPlaylist, switchToUrl } = this.props
    const { privatePlaylistId, qrScanMode } = this.state

    return (
      <div className="join-playlist-content">
        <div className="create-playliste-content-title-bar" />
        <h2>Join a Playlist</h2>
        <div className="join-playlist-qr">
          <p>- Hop in via QRCode -</p>
          {!qrScanMode &&
            (<img
              className="join-playlist-content-scann"
              src={qrCodeIns}
              alt="qr code instructions"
              onClick={() => this.setState({ qrScanMode: true })}
            />)
          }
          {qrScanMode &&
            <QrScanner delay={500} onScan={res => (res && switchToUrl(res))} onError={console.warn} />}
        </div>
        <div className="join-playlist-url">
          <p>- Or via direct playlist ID -</p>
          <div className="join-playlist-url-input">
            <span>playlists/</span>
            <FormInputText placeholder="ex: abe1sq5" onChange={(value) => this.setState({ privatePlaylistId: value })} />
          </div>
          <Button label="Alright" onClick={() => switchToPlaylist('private', privatePlaylistId)} />
        </div>
        <div className="join-playlist-public">
          <p>People may have good tastes too</p>
          <ul className="join-playlist-public-list" >
            {keys(playlists).map(key => (
              !playlists[key].private
              ? (
                <li className="join-playlist-public-list-item" key={key} onClick={() => switchToPlaylist('public', key)}>
                  <div className="join-playlist-public-list-item-info">
                    <span className="join-playlist-name">{playlists[key].name}</span>
                    <span className="join-playlist-tag">{playlists[key].tag}</span>
                  </div>
                  <i className="ion-ios-arrow-right" />
                </li>
              ) : null))}
          </ul>
        </div>
      </div>
    )
  }
}


JoinPlaylistContent.propTypes = {
  playlists: PropTypes.object.isRequired,
  switchToPlaylist: PropTypes.func.isRequired,
  switchToUrl: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  playlists: state.playlists,
  switchToPlaylist: (type, id) => ownProps.history.push(`/playlists/${type}/${id}`),
  switchToUrl: url => ownProps.history.push(`/${url}`),
})

export default withRouter(connect(mapStateToProps)(JoinPlaylistContent))
