import { extend } from 'lodash'

import {
  FEED_MUSIC_ADD_SUCCESS,
  FEED_MUSIC_REMOVE_SUCCESS,
  FEED_LIKE_ADD_SUCCESS,
  FEED_LIKE_REMOVE_SUCCESS,
} from '../actionCreators/feed'

export default function feed(state = {
  musicsFeed: [],
  likesFeed: [],
}, action) {
  switch (action.type) {
    case FEED_MUSIC_ADD_SUCCESS:
    case FEED_MUSIC_REMOVE_SUCCESS: {
      return extend({}, state, {
        musicsFeed: [action.music, ...state.musicsFeed],
      })
    }
    case FEED_LIKE_ADD_SUCCESS:
    case FEED_LIKE_REMOVE_SUCCESS: {
      return extend({}, state, {
        likesFeed: [action.like, ...state.likesFeed],
      })
    }
    default:
      return state
  }
}
