import { combineReducers } from 'redux'

import privatePlaylist from './privatePlaylist'
import publicPlaylists from './publicPlaylists'
import firebase from './firebase'
import youtubeSearch from './youtubeSearch'

const rootReducer = combineReducers({
  privatePlaylist,
  publicPlaylists,
  firebase,
  youtubeSearch,
})

export default rootReducer
