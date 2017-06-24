import { combineReducers } from 'redux'

import privatePlaylist from './privatePlaylist'
import publicPlaylists from './publicPlaylists'
import firebase from './firebase'

const rootReducer = combineReducers({
  privatePlaylist,
  publicPlaylists,
  firebase,
})

export default rootReducer
