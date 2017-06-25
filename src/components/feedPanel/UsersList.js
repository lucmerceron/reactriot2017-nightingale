import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import FeedListItem from './FeedListItem'
import FeedListUserContent from './FeedListUserContent'

import './UsersList.css'

const UsersList = ({ users }) => (
  <ul>
    {keys(users).map(userKey =>
      <FeedListItem key={userKey}><FeedListUserContent userName={users[userKey].name} isAdmin={users[userKey].isAdmin} /></FeedListItem>)}
  </ul>)

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
}

export default UsersList
