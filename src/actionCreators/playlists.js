import faker from 'faker'

import makeActionCreator from './makeActionCreator'

/* Action types */
export const GET_PRIVATE_PLAYLIST_REQUEST = 'GET_PRIVATE_PLAYLIST_REQUEST'
export const GET_PRIVATE_PLAYLIST_SUCCESS = 'GET_PRIVATE_PLAYLIST_SUCCESS'
export const GET_PRIVATE_PLAYLIST_FAILED = 'GET_PRIVATE_PLAYLIST_FAILED'
export const CREATE_PRIVATE_PLAYLIST_REQUEST = 'CREATE_PRIVATE_PLAYLIST_REQUEST'
export const CREATE_PRIVATE_PLAYLIST_SUCCESS = 'CREATE_PRIVATE_PLAYLIST_SUCCESS'
export const CREATE_PRIVATE_PLAYLIST_FAILED = 'CREATE_PRIVATE_PLAYLIST_FAILED'

/* Action creators */
export const getPrivatePlaylistRequest = makeActionCreator(GET_PRIVATE_PLAYLIST_REQUEST)
export const getPrivatePlaylistSuccess = makeActionCreator(GET_PRIVATE_PLAYLIST_SUCCESS, 'playlist')
export const getPrivatePlaylistFailed = makeActionCreator(GET_PRIVATE_PLAYLIST_FAILED, 'error')
export const createPrivatePlaylistRequest = makeActionCreator(CREATE_PRIVATE_PLAYLIST_REQUEST)
export const createPrivatePlaylistSuccess = makeActionCreator(CREATE_PRIVATE_PLAYLIST_SUCCESS)
export const createPrivatePlaylistFailed = makeActionCreator(CREATE_PRIVATE_PLAYLIST_FAILED, 'error')

/* Thunk action creators */
export function getPrivatePlaylist(playlistId) {
  return (dispatch, getState) => {
    const firebase = getState().firebase

    dispatch(getPrivatePlaylistRequest())

    firebase.database().ref(`private_playlists/${playlistId}`).on('value', snap => {
      if (snap.val()) getPrivatePlaylistSuccess(snap.val())
      else {
        firebase.database.ref(`private_playlists/${playlistId}`).off()
        getPrivatePlaylistFailed('Oups ! This playlist does not exist :(')
      }
    })
  }
}

export function createPrivatePlaylist(playlist) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const fakeName = faker.name.findName()
    const userId = firebase.auth().currentUser.uid

    dispatch(createPrivatePlaylistRequest())

    // Retrieve the key for onDisconnect use
    const newPlaylistKey = firebase.database().ref('private_playlists').push().key

    // Create the playlist
    firebase.database().ref().update({ [`private_playlists/${newPlaylistKey}`]: {
      name: playlist.name,
      tag: playlist.tag,
      admin: {
        [userId]: fakeName,
      },
      users: {
        [userId]: fakeName,
      },
      currentlyPlaying: {
      },
      musics: {
      },
    } })

    // Remove the user on onDisconnect
    firebase.database().ref(`private_playlists/${newPlaylistKey}/users/${userId}`).onDisconnect().remove()
  }
}
