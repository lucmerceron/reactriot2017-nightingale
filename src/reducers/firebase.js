import firebaseInit from 'firebase'

// Special stuff there: calling action from reducer
// We could have called it from the main view but we
// would have need to register onAuthStateChanged from there and
// it is cool to abstract that from the main component
const { updatePublicPlaylist } = '../actionCreators/playlists'

// Connect to Firebase
const firebaseApp = firebaseInit.initializeApp({
  apiKey: 'AIzaSyAGBITBgNOGOo6Q9OQJQtR7V8AmRVxbwgE',
  authDomain: 'nightingale-cb6f8.firebaseapp.com',
  databaseURL: 'https://nightingale-cb6f8.firebaseio.com',
  projectId: 'nightingale-cb6f8',
  storageBucket: 'nightingale-cb6f8.appspot.com',
  messagingSenderId: '889865173647',
})

// Listen for playlists change
firebaseApp.auth().onAuthStateChanged(() => {
  firebaseApp.database().ref('public_playlists').on('value', snap => {
    if (snap.val()) updatePublicPlaylist(snap.val())
    else updatePublicPlaylist({})
  })
})

// Sign in anonymously
firebaseApp.auth().signInAnonymously().catch(error => {
  // Handle Errors here.
  const errorCode = error.code

  if (errorCode === 'auth/operation-not-allowed') {
    console.error('You must enable Anonymous auth in the Firebase Console.')
  } else {
    console.error(error)
  }
})

export default function firebase(state = firebaseApp, action) {
  switch (action.type) {
    default:
      return state
  }
}
