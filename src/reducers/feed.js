import { extend, difference, keys, isEmpty } from 'lodash'

import {
  UPDATE_PUBLIC_PLAYLIST,
  UPDATE_PRIVATE_PLAYLIST,
} from '../actionCreators/playlists'
import {
  EMPTY_FEED,
} from '../actionCreators/feed'

const getUserInfos = (userId, playlist) => {
  const actual = playlist[keys(playlist)[0]]

  return actual.users[userId]
}

const detectMusicChanged = (actual, next) => {
  if (isEmpty(actual) || isEmpty(next)) return false
  const actu = actual[keys(actual)[0]]
  const nex = next[keys(next)[0]]

  // If actual > next => remove
  if ((keys(actu.musics || {}).length) > (keys(nex.musics || {}).length)) {
    // If no more then it is the first one
    let musicDiff = null
    if (isEmpty(nex.musics)) {
      if (actu.currentlyPlaying && actu.currentlyPlaying.url === keys(actu.musics)[0]) return false
      musicDiff = actu.musics[keys(actu.musics)[0]]
    } else {
      const diff = difference(keys(actu.musics), keys(nex.musics))[0]
      const removed = actu.musics[diff]

      // It is not removed if it is in the currentlyPlaying
      if (actu.currentlyPlaying && actu.currentlyPlaying.url === diff) return false

      musicDiff = removed
    }
    return {
      action: 'removed',
      username: `${getUserInfos(musicDiff.creator, actual)}'s music`,
      thumbnail: musicDiff.thumbnailUrl,
      title: musicDiff.title,
    }
  } else if ((keys(actu.musics || {}).length) < (keys(nex.musics || {}).length)) {
    // If no more then it is the first one
    let musicDiff = null
    if (isEmpty(actu.musics)) musicDiff = nex.musics[keys(nex.musics)[0]]
    else {
      const diff = difference(keys(nex.musics), keys(actu.musics))[0]
      const added = nex.musics[diff]

      musicDiff = added
    }
    return {
      action: 'added',
      username: `${getUserInfos(musicDiff.creator, next)}`,
      thumbnail: musicDiff.thumbnailUrl,
      title: musicDiff.title,
    }
  }
  return false
}
const detectLikesChanged = (actual, next) => {
  if (isEmpty(actual) || isEmpty(next)) return false
  const actu = actual[keys(actual)[0]]
  const nex = next[keys(next)[0]]

  let result = false
  keys(nex.musics).some(key => {
    const nexMusicLikes = nex.musics[key].likes
    const actuMusicLikes = actu && !isEmpty(actu.musics) && !isEmpty(actu.musics[key]) ? actu.musics[key].likes : {}

    // If actual > next => remove
    if ((keys(actuMusicLikes || {}).length) > (keys(nexMusicLikes || {}).length)) {
      // If no more then it is the first one
      let likeDiff = null
      if (isEmpty(nexMusicLikes)) likeDiff = keys(actuMusicLikes)[0]
      else {
        const diff = difference(keys(actuMusicLikes), keys(nexMusicLikes))[0]
        const unliked = diff

        likeDiff = unliked
      }
      result = {
        action: 'unliked',
        username: `${getUserInfos(likeDiff, actual)}`,
        thumbnail: actu.musics[key].thumbnailUrl,
        title: actu.musics[key].title,
      }
      return true
    } else if ((keys(actuMusicLikes || {}).length) < (keys(nexMusicLikes || {}).length)) {
      // If no more then it is the first one
      let likeDiff = null
      if (isEmpty(actuMusicLikes)) likeDiff = keys(nexMusicLikes)[0]
      else {
        const diff = difference(keys(nexMusicLikes), keys(actuMusicLikes))[0]
        const added = diff

        likeDiff = added
      }
      result = {
        action: 'liked',
        username: `${getUserInfos(likeDiff, next)}`,
        thumbnail: nex.musics[key].thumbnailUrl,
        title: nex.musics[key].title,
      }
      return true
    }
    return false
  })

  return result
}

export default function feed(state = {
  musicsFeed: [],
  likesFeed: [],
}, action) {
  switch (action.type) {
    case UPDATE_PUBLIC_PLAYLIST:
    case UPDATE_PRIVATE_PLAYLIST: {
      if (action.previousState && keys(action.previousState).length > 1) return state
      if (detectMusicChanged(action.previousState, action.playlists)) {
        const result = detectMusicChanged(action.previousState, action.playlists)
        if (!result.username) return state
        return extend({}, state, {
          musicsFeed: [result, ...state.musicsFeed],
        })
      } else if (detectLikesChanged(action.previousState, action.playlists)) {
        const result = detectLikesChanged(action.previousState, action.playlists)
        if (!result.username) return state
        return extend({}, state, {
          likesFeed: [result, ...state.likesFeed],
        })
      }
      return state
    }
    case EMPTY_FEED: {
      return {
        musicsFeed: [],
        likesFeed: [],
      }
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