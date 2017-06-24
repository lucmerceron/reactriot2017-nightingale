import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'

class AusioSoundButton extends Component {
  constructor() {
    super()
    this.state = {
      toggleSoundRange: false,
    }
  }

  handleClickOutside = () => {
    this.setState({ toggleSoundRange: false })
  }

  render() {
    const { value, onChange } = this.props
    const { toggleSoundRange } = this.state
    return (
      <div
        className="audio-player-controls-btn-sm control-sound"
        onClick={() => this.setState({ toggleSoundRange: true })}
        style={{
          marginRight: '-0.4444rem',
          width: `${toggleSoundRange ? '8' : '3'}rem`,
          borderRadius: `${toggleSoundRange ? '2rem' : '50%'}`,
        }}
      >
        <i className="ion-ios-volume-high" />{toggleSoundRange && <input className="audio-player-sound-range" type="range" min="0" max="100" value={value} onChange={(e) => onChange(e)} />}
      </div>
    )
  }
}

AusioSoundButton.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default onClickOutside(AusioSoundButton)
