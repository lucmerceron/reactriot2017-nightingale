import React from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'

import FeedListItem from './FeedListItem'
import FeedListUserContent from './FeedListUserContent'

import './UsersList.css'

const UsersList = ({ users }) =>
  <ul>{values(users).map(userName => <FeedListItem><FeedListUserContent userName={userName} /></FeedListItem>)}</ul>

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
}

export default UsersList
