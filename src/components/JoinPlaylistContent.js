import React from 'react'
import PropTypes from 'prop-types'

import QrScanner from 'react-qr-reader'
import FormInputText from './generalPurpose/form/FormInputText'

import './JoinPlaylistContent.css'

const JoinPlaylistContent = () => (
  <div>
    <h2>Join a Playlist</h2>
    <p>scan a QR code to join</p>
    <div className="join-playlist-qr">
      <QrScanner maxImageSize="500" onScan={() => console.log('scan')} onError={() => console.log('error')} />
    </div>
    <p>or search for a playlist</p>
    <FormInputText placeholder="search for a playlist" onChange={(value) => console.log(value)} />
  </div>
)


JoinPlaylistContent.propTypes = {
  
}

export default JoinPlaylistContent
