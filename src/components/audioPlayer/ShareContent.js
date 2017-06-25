import React from 'react'
import PropTypes from 'prop-types'

import QrGen from 'qrcode.react'

import './ShareContent.css'

const ShareContent = (playlistId, playlistTyp) => {


  return (
    <div className="share-content">
      <QrGen value={`playlists/${playlistTyp}/${playlistId.playlistId}`} />
    </div>
  )
}

ShareContent.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlistTyp: PropTypes.string.isRequired,
}

export default ShareContent
