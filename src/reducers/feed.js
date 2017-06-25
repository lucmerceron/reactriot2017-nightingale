import { pickBy, extend } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLISTS,
  UPDATE_PRIVATE_PLAYLIST,
} from '../actionCreators/playlists'

const detectMusicRemoved = () => {

}

const detectMusicAdded = () => {

}

const detectMusicLiked = () => {

}

const detectMusicUpdated = () => {

}

export default function feed(state = {
  musicsFeed: [],
  likesFeed: [],
}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLISTS: {
      const privateState = pickBy(state, value => value.private)

      return extend({}, privateState, action.playlists)

      return extend({}, state, {
        musicsFeed: [action.music, ...state.musicsFeed],
      })
    }
    case UPDATE_PRIVATE_PLAYLIST: {
      const publicState = pickBy(state, value => !value.private)

      return extend({}, publicState, action.playlist)

      return extend({}, state, {
        likesFeed: [action.like, ...state.likesFeed],
      })
    }
    default:
      return state
  }
}


  //   dispatch(addToFeed('like', 'add',
  //     {
  //       action: 'liked',
  //       username: localStorage.getItem('nightingaleName'),
  //       thumbnail: music.thumbnailUrl,
  //       title: music.title,
  //     }))
  // }