import { extend, pickBy } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
  GET_PRIVATE_PLAYLIST_SUCCESS,
  CREATE_PRIVATE_PLAYLIST_SUCCESS,
} from '../actionCreators/playlists'

export default function publicPlaylists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS: {
      const privateState = pickBy(state, value => value.private)

      return extend({}, privateState, action.playlists)
    }
    case GET_PRIVATE_PLAYLIST_SUCCESS: {
      const publicState = pickBy(state, value => !value.private)

      return extend({}, publicState, action.playlist)
    }
    case CREATE_PRIVATE_PLAYLIST_SUCCESS: {
      const publicState = pickBy(state, value => !value.private)

      return extend({}, publicState, action.playlist)
    }
    default:
      return state
  }
}
