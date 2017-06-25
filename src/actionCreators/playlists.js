import makeActionCreator from './makeActionCreator'

/* Action types */
export const GET_PRIVATE_PLAYLIST_REQUEST = 'GET_PRIVATE_PLAYLIST_REQUEST'
export const GET_PRIVATE_PLAYLIST_SUCCESS = 'GET_PRIVATE_PLAYLIST_SUCCESS'
export const GET_PRIVATE_PLAYLIST_FAILED = 'GET_PRIVATE_PLAYLIST_FAILED'
export const UPDATE_PUBLIC_PLAYLISTS = 'UPDATE_PUBLIC_PLAYLISTS'
export const CREATE_PRIVATE_PLAYLIST_REQUEST = 'CREATE_PRIVATE_PLAYLIST_REQUEST'
export const CREATE_PRIVATE_PLAYLIST_SUCCESS = 'CREATE_PRIVATE_PLAYLIST_SUCCESS'
export const UPDATE_ACTUAL_PLAYLIST_REQUEST = 'UPDATE_ACTUAL_PLAYLIST_REQUEST'
export const UPDATE_ACTUAL_PLAYLIST_SUCCESS = 'UPDATE_ACTUAL_PLAYLIST_SUCCESS'
export const CREATE_PUBLIC_PLAYLIST_REQUEST = 'CREATE_PUBLIC_PLAYLIST_REQUEST'

/* Action creators */
export const getPrivatePlaylistRequest = makeActionCreator(GET_PRIVATE_PLAYLIST_REQUEST)
export const getPrivatePlaylistSuccess = makeActionCreator(GET_PRIVATE_PLAYLIST_SUCCESS, 'playlist')
export const getPrivatePlaylistFailed = makeActionCreator(GET_PRIVATE_PLAYLIST_FAILED, 'error')
export const updatePublicPlaylists = makeActionCreator(UPDATE_PUBLIC_PLAYLISTS, 'playlists')
export const createPrivatePlaylistRequest = makeActionCreator(CREATE_PRIVATE_PLAYLIST_REQUEST)
export const createPrivatePlaylistSuccess = makeActionCreator(CREATE_PRIVATE_PLAYLIST_SUCCESS, 'playlist')
export const createPublicPlaylistRequest = makeActionCreator(CREATE_PUBLIC_PLAYLIST_REQUEST)

/* Thunk action creators */
export function getPrivatePlaylist(playlistId) {
  return (dispatch, getState) => {
    const firebase = getState().firebase

    dispatch(getPrivatePlaylistRequest())

    firebase.database().ref(`private_playlists/${playlistId}`).on('value', snap => {
      if (snap.val()) dispatch(getPrivatePlaylistSuccess({ [playlistId]: snap.val() }))
      else {
        firebase.database.ref(`private_playlists/${playlistId}`).off()
        dispatch(getPrivatePlaylistFailed('Oups ! This playlist does not exist :('))
      }
    })
  }
}

export function createPrivatePlaylist(playlist) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const userId = firebase.auth().currentUser.uid

    dispatch(createPrivatePlaylistRequest())

    // Retrieve the key for onDisconnect use
    const newPlaylistKey = firebase.database().ref('private_playlists').push().key

    // Listen on the reference key to take into account the creation
    firebase.database().ref(`private_playlists/${newPlaylistKey}`).on('value', snap => {
      if (snap.val()) dispatch(createPrivatePlaylistSuccess({ [newPlaylistKey]: snap.val() }))
    })

    // Create the playlist
    firebase.database().ref().update({ [`private_playlists/${newPlaylistKey}`]: {
      name: playlist.name,
      tag: playlist.tag,
      private: true,
      admin: {
        [userId]: localStorage.getItem('nightingaleName'),
      },
      users: {
        [userId]: localStorage.getItem('nightingaleName'),
      },
    } })

    // Remove the user on onDisconnect
    firebase.database().ref(`private_playlists/${newPlaylistKey}/users/${userId}`).onDisconnect().remove()
  }
}

export function createPublicPlaylist(playlist) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const userId = firebase.auth().currentUser.uid

    dispatch(createPublicPlaylistRequest())

    // Retrieve the key for onDisconnect use
    const newPlaylistKey = firebase.database().ref('public_playlists').push().key

    // We don't need to listen for modification as we already have
    // registered a listener at the user connexion

    // Create the playlist
    firebase.database().ref().update({ [`public_playlists/${newPlaylistKey}`]: {
      name: playlist.name,
      tag: playlist.tag,
      private: false,
      admin: {
        [userId]: localStorage.getItem('nightingaleName'),
      },
      users: {
        [userId]: localStorage.getItem('nightingaleName'),
      },
    } })

    // Remove the user on onDisconnect
    firebase.database().ref(`public_playlists/${newPlaylistKey}/users/${userId}`).onDisconnect().remove()
  }
}

export function updatePlaylist(playlistId, path, newValue) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const actualPlaylist = getState().playlists[playlistId]

    if (!actualPlaylist) return
    firebase.database()
    .ref(`${actualPlaylist.private ? 'private' : 'public'}_playlists/${playlistId}/${path}`)
    .set(newValue)
  }
}
export function removePlaylistOnDisconnect(playlistId, path) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const actualPlaylist = getState().playlists[playlistId]

    if (!actualPlaylist) return
    firebase.database()
    .ref(`${actualPlaylist.private ? 'private' : 'public'}_playlists/${playlistId}/${path}`)
    .onDisconnect()
    .remove()
  }
}
