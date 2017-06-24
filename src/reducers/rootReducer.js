import { combineReducers } from 'redux'

import playlists from './playlists'
import firebase from './firebase'
import youtubeSearch from './youtubeSearch'

const rootReducer = combineReducers({
  playlists,
  firebase,
  youtubeSearch,
})

export default rootReducer
