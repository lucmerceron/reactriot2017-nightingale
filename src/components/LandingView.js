import React from 'react'
// import PropTypes from 'prop-types'

import ButtonMorphing from './generalPurpose/ButtonMorphing'
import CreatePlaylistContent from './CreatePlaylistContent'
import JoinPlaylistContent from './JoinPlaylistContent'

const LandingView = () => (
  <div>
    <img />
    <ButtonMorphing label="join a playlist" onClick={() => console.log('ta mere')} content={<JoinPlaylistContent />} />
    <ButtonMorphing label="create a playlist" onClick={() => console.log('ta mere')} content={CreatePlaylistContent} />
    <span>gggg</span>
  </div>
)

export default LandingView
