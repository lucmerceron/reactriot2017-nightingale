import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { keys } from 'lodash'

import QrScanner from 'react-qr-reader'
import FormInputText from './generalPurpose/form/FormInputText'
import Button from './generalPurpose/Button'
import Switch from './generalPurpose/Switch'

import './JoinPlaylistContent.css'
import qrCodeIns from '../assets/qr-code-instructions.svg'

class JoinPlaylistContent extends React.Component {
  constructor() {
    super()

    this.state = {
      privatePlaylistId: '',
      qrScanMode: false,
      isPrivate: false,
    }
  }

  render() {
    const { playlists, switchToPlaylist, switchToUrl } = this.props
    const { privatePlaylistId, qrScanMode, isPrivate } = this.state

    return (
      <div className="join-playlist-content">
        <div className="create-playliste-content-title-bar" />
        <h2>Join a Playlist</h2>
        <div className="join-playlist-qr">
          <p>- Hop in via QRCode -</p>
          {!qrScanMode &&
            (<div style={{ display: 'inline-block', position: 'relative' }} onClick={() => this.setState({ qrScanMode: true })}>
                <img
                  className="join-playlist-content-scann"
                  src={qrCodeIns}
                  alt="qr code instructions"
                />
              <span style={{ display: 'inline-block', fontWeight: '700', fontSize: '1.3rem', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                Tap to scan !
              </span>
            </div>)
          }
          {qrScanMode &&
            <QrScanner delay={500} onScan={res => (res && switchToUrl(res))} onError={console.warn} />}
        </div>
        <div className="join-playlist-url">
          <p>- Or via direct playlist ID -</p>
          <div className="join-playlist-url-input">
            <span>playlists/</span>
            <FormInputText placeholder="ex: abe1sq5" onChange={(value) => this.setState({ privatePlaylistId: value })} />
            <Switch label="Private" onChange={() => this.setState({ isPrivate: !isPrivate })} />
          </div>
          <Button label="Join now" onClick={() => switchToPlaylist(isPrivate ? 'private' : 'public', privatePlaylistId)} />
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
