import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FeedList from './FeedList'
import LikesList from './LikesList'
import UsersList from './UsersList'

import './TabMenu.css'


const FEED_TAB = 0
const LIKES_TAB = 1
const USERS_TAB = 2

class TabMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: FEED_TAB,
    }
  }

  render() {
    const { active } = this.state
    return (
      <div>
        <div>
          <div
            className={`tab-menu-category${(active === 'FEED_TAB') ? ' active' : ''}`}
            onClick={() => this.setState({ active: FEED_TAB })}
          >
            Feed
          </div>
          <div
            className={`tab-menu-category${(active === 'LIKES_TAB') ? ' active' : ''}`}
            onClick={() => this.setState({ active: LIKES_TAB })}
          >
            Likes
          </div>
          <div
            className={`tab-menu-category${(active === 'USERS_TAB') ? ' active' : ''}`}
            onClick={() => this.setState({ active: USERS_TAB })}
          >
            Users
          </div>
        </div>
        <div>
          {
            () => {
              switch (active) {
                case FEED_TAB:
                  return <FeedList musicsFeed={this.props.musicsFeed} />
                case LIKES_TAB:
                  return <LikesList likesFeed={this.props.likesFeed} />
                case USERS_TAB:
                  return <UsersList users={this.props.users} />
                default:
                  return <FeedList musicsFeed={this.props.musicsFeed} />
              }
            }
          }
        </div>
      </div>
    )
  }
}

TabMenu.propTypes = {
  musicsFeed: PropTypes.shape({
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  likesFeed: PropTypes.shape({
    username: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default TabMenu
