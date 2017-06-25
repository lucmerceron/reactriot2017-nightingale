import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import './App.css'

class TopBar extends React.Component {
  constructor() {
    super()

    this.handleGoBack = this.handleGoBack.bind(this)
    this.votingElement = null
  }

  componentDidMount() {
    window.HACKBIT_VOTING_WIDGET.render(this.votingElement)
  }
  handleGoBack() {
    const { switchToHome } = this.props
    switchToHome()
  }

  render() {
    const { isInPlaylist } = this.props
    console.log(this.props)
    return (
      <div className={`top-bar${isInPlaylist ? '' : ' main-menu'}`}>
        {isInPlaylist
          ? <span onClick={this.handleGoBack}className="ng-logo top-bar-logo"><span className="ion-chevron-left" />Nightingale</span>
          : null}
        <div className="voting-element" ref={votingElement => (this.votingElement = votingElement)} />
      </div>
    )
  }
}

TopBar.propTypes = {
  isInPlaylist: PropTypes.bool.isRequired,
  switchToHome: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  isInPlaylist: ownProps.location.pathname.split('/').length > 2,
  switchToHome: () => ownProps.history.push('/'),
})

export default withRouter(connect(mapStateToProps)(TopBar))
