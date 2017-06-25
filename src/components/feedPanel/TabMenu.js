import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FeedList from './FeedList'
import LikesList from './LikesList'
import UsersList from './UsersList'

import './TabMenu.css'

class TabMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
  }

  render() {
    const { active } = this.state

    const getCorrectCategory = () => {
      switch (active) {
        case 0:
          return <FeedList musicsFeed={this.props.musicsFeed} />
        case 1:
          return <LikesList likesFeed={this.props.likesFeed} />
        case 2:
          return <UsersList users={this.props.users} />
        default:
          return <FeedList musicsFeed={this.props.musicsFeed} />
      }
    }

    return (
      <div className="tab-menu-wrapper">
        <div className="tab-menu-selectors">
          <div
            className={`tab-menu-category feed${(active === 0) ? ' active' : ''}`}
            onClick={() => this.setState({ active: 0 })}
          >
            <div className="ion-android-list" />
          </div>
          <div
            className={`tab-menu-category likes${(active === 1) ? ' active' : ''}`}
            onClick={() => this.setState({ active: 1 })}
          >
            <div className="ion-android-favorite" />
          </div>
          <div
            className={`tab-menu-category users${(active === 2) ? ' active' : ''}`}
            onClick={() => this.setState({ active: 2 })}
          >
            <div className="ion-ios-people" />
          </div>
        </div>
        <div style={{ overflowY: 'auto' }}>
          { getCorrectCategory() }
        </div>
      </div>
    )
  }
}

TabMenu.propTypes = {
  musicsFeed: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  likesFeed: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  users: PropTypes.object.isRequired,
}

export default TabMenu
