import { extend, pickBy } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
  UPDATE_PRIVATE_PLAYLIST,
} from '../actionCreators/playlists'

export default function publicPlaylists(state = {}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS: {
      const privateState = pickBy(state, value => value.private)

      return extend({}, privateState, action.playlists)
    }
    case UPDATE_PRIVATE_PLAYLIST: {
      const publicState = pickBy(state, value => !value.private)

      return extend({}, publicState, action.playlist)
    }
    default:
      return state
  }
}
