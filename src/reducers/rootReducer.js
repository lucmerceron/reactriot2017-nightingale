import { combineReducers } from 'redux'

import playlists from './playlists'
import firebase from './firebase'
import feed from './feed'
import youtubeSearch from './youtubeSearch'

const rootReducer = combineReducers({
  playlists,
  firebase,
  youtubeSearch,
  feed,
})

export default rootReducer
