import { extend } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
  GET_PRIVATE_PLAYLIST_SUCCESS,
  CREATE_PRIVATE_PLAYLIST_SUCCESS,
} from '../actionCreators/playlists'

export default function publicPlaylists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS: {
      return extend({}, state, action.playlists)
    }
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
