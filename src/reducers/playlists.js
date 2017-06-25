import { extend } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
  UPDATE_PRIVATE_PLAYLIST,
  UPDATE_PUBLIC_PLAYLIST,
} from '../actionCreators/playlists'

export default function playlists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS:
    case UPDATE_PRIVATE_PLAYLIST:
    case UPDATE_PUBLIC_PLAYLIST: {
      return extend({}, action.playlists)
    }
    default:
      return state
  }
}
