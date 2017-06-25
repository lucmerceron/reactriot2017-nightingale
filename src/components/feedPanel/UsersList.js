import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import FeedListUserContent from './FeedListUserContent'

import './UsersList.css'

const UsersList = ({ users }) => (
  <ul className="feed-list-users">
    {keys(users).map(userKey =>
      <FeedListUserContent key={userKey} id={users[userKey].id} userName={users[userKey].name} isAdmin={users[userKey].isAdmin} />)}
  </ul>)

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
}

export default UsersList
