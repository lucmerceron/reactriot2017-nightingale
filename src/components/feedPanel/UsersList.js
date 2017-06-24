import React from 'react'
import PropTypes from 'prop-types'

import FeedListItem from './FeedListItem'
import FeedListUserContent from './FeedListUserContent'

import './UsersList.css'

const UsersList = ({ users }) =>
  <ul>{users.map(user => <FeedListItem><FeedListUserContent user={user} /></FeedListItem>)}</ul>

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default UsersList
