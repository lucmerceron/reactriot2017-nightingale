import React from 'react'
// import PropTypes from 'prop-types'

import ButtonMorphing from './generalPurpose/ButtonMorphing'
import CreatePlaylistContent from './CreatePlaylistContent'
import JoinPlaylistContent from './JoinPlaylistContent'

const LandingView = () => (
  <div>
    <img />
    <ButtonMorphing label="join a playlist" onClick={() => {}} content={<JoinPlaylistContent />} />
    <ButtonMorphing label="create a playlist" onClick={() => {}} content={<CreatePlaylistContent />} />
    <span>developed by the Wing dev team with love</span>
  </div>
)

export default LandingView
