import { extend } from 'lodash'

import {
  GET_PRIVATE_PLAYLIST_SUCCESS,
  CREATE_PRIVATE_PLAYLIST_SUCCESS,
} from '../actionCreators/playlists'

export default function privatePlaylists(state = {}, action) {
  switch (action.type) {
    case GET_PRIVATE_PLAYLIST_SUCCESS: {
      return extend({}, state, action.playlist)
    }
    case CREATE_PRIVATE_PLAYLIST_SUCCESS: {
      return extend({}, state, action.playlist)
    }
    default:
      return state
  }
}
