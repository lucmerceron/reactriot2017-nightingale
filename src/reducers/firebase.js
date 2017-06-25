import firebaseInit from 'firebase'

// Connect to Firebase
const firebaseApp = firebaseInit.initializeApp({
  apiKey: 'AIzaSyAqZfPpc_qTNCqQWknBrXJXHl1xGU_dXgs',
  authDomain: 'nightingale-f1638.firebaseapp.com',
  databaseURL: 'https://nightingale-f1638.firebaseio.com',
  projectId: 'nightingale-f1638',
  storageBucket: '',
  messagingSenderId: '857811721641',
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
