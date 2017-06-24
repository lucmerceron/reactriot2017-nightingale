import { extend } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
} from '../actionCreators/playlists'

export default function publicPlaylists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS: {
      return extend({}, action.playlists)
    }
    default:
      return state
  }
}
