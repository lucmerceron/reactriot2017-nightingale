import firebaseInit from 'firebase'

// Connect to Firebase
const firebaseApp = firebaseInit.initializeApp({
  apiKey: 'AIzaSyAGBITBgNOGOo6Q9OQJQtR7V8AmRVxbwgE',
  authDomain: 'nightingale-cb6f8.firebaseapp.com',
  databaseURL: 'https://nightingale-cb6f8.firebaseio.com',
  projectId: 'nightingale-cb6f8',
  storageBucket: 'nightingale-cb6f8.appspot.com',
  messagingSenderId: '889865173647',
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
