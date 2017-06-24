import { extend } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLIST,
} from '../actionCreators/playlists'

export default function publicPlaylists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLIST: {
      return extend({}, action.playlists)
    }
    default:
      return state
  }
}
