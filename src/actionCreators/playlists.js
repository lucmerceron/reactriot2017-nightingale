import makeActionCreator from './makeActionCreator'

/* Action types */
export const UPDATE_PRIVATE_PLAYLIST = 'UPDATE_PRIVATE_PLAYLIST'
export const UPDATE_PUBLIC_PLAYLIST = 'UPDATE_PUBLIC_PLAYLIST'
export const GET_PRIVATE_PLAYLIST_FAILED = 'GET_PRIVATE_PLAYLIST_FAILED'
export const GET_PUBLIC_PLAYLIST_FAILED = 'GET_PUBLIC_PLAYLIST_FAILED'
export const UPDATE_PUBLIC_PLAYLISTS = 'UPDATE_PUBLIC_PLAYLISTS'

/* Action creators */
export const updatePrivatePlaylist = makeActionCreator(UPDATE_PRIVATE_PLAYLIST, 'playlists', 'previousState')
export const updatePublicPlaylist = makeActionCreator(UPDATE_PUBLIC_PLAYLIST, 'playlists', 'previousState')
export const getPrivatePlaylistFailed = makeActionCreator(GET_PRIVATE_PLAYLIST_FAILED, 'error')
export const getPublicPlaylistFailed = makeActionCreator(GET_PUBLIC_PLAYLIST_FAILED, 'error')
export const updatePublicPlaylists = makeActionCreator(UPDATE_PUBLIC_PLAYLISTS, 'playlists')

/* Thunk action creators */
export function getPrivatePlaylist(playlistId, swichToHome) {
  return (dispatch, getState) => {
    const firebase = getState().firebase

    firebase.database().ref(`private_playlists/${playlistId}`).on('value', snap => {
      const previousplaylists = getState().playlists
      if (snap.val()) dispatch(updatePrivatePlaylist({ [playlistId]: snap.val() }, previousplaylists))
      else {
        console.warn('Oups ! This private playlist does not exist :(')
        swichToHome()
      }
    })
  }
}
export function getPublicPlaylist(playlistId, swichToHome) {
  return (dispatch, getState) => {
    const firebase = getState().firebase

    firebase.database().ref(`public_playlists/${playlistId}`).on('value', snap => {
      const previousplaylists = getState().playlists
      if (snap.val()) dispatch(updatePublicPlaylist({ [playlistId]: snap.val() }, previousplaylists))
      else {
        console.warn('Oups ! This public playlist does not exist :(')
        swichToHome()
      }
    })
  }
}

export function createPrivatePlaylist(playlist, switchToNewPlaylist) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const userId = firebase.auth().currentUser.uid

    // Retrieve the key for onDisconnect use
    const newPlaylistKey = firebase.database().ref('private_playlists').push().key

    firebase.database().ref(`private_playlists/${newPlaylistKey}`).once('value', snap => {
      if (snap.val()) switchToNewPlaylist('private', newPlaylistKey)
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

export function createPublicPlaylist(playlist, switchToNewPlaylist) {
  return (dispatch, getState) => {
    const firebase = getState().firebase
    const userId = firebase.auth().currentUser.uid

    // Retrieve the key for onDisconnect use
    const newPlaylistKey = firebase.database().ref('public_playlists').push().key

    firebase.database().ref(`public_playlists/${newPlaylistKey}`).once('value', snap => {
      if (snap.val()) switchToNewPlaylist('public', newPlaylistKey)
    })

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
