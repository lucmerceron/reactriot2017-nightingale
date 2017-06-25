const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Listens to the playlists users modifications and remove the 
// playlist if the number of users is dropping to null
// or change the admin to another user else if the admin disconnect
exports.managagePublicUsers = functions.database.ref('public_playlists/{playlistId}/users')
  .onWrite(event => {
    // Test if the users object does not exist anymore
    if (event.data.previous.exists() && !event.data.exists()) {
      return event.data.ref.parent.remove();
    } else if (event.data.previous.exists()) {
      const previousUsers = Object.keys(event.data.previous.val());
      const actualUsers = Object.keys(event.data.val());

      const removedUser = previousUsers.filter(function(x) { return actualUsers.indexOf(x) < 0 });
      // Test if the users object does not exist anymore
      if (removedUser.length > 0 && event.data.ref.parent.parent.child('admin').child(removedUser[0]).key === removedUser[0]) {
        const newAdmin = { [actualUsers[0]]: event.data.val()[Object.keys(event.data.val())[0]] }
        return event.data.adminRef.parent.child('admin').set(newAdmin);
      }
    }
  });
exports.managagePrivateUsers = functions.database.ref('private_playlists/{playlistId}/users')
  .onWrite(event => {
    // Test if the users object does not exist anymore
    if (event.data.previous.exists() && !event.data.exists()) {
      return event.data.ref.parent.remove();
    } else if (event.data.previous.exists()) {
      const previousUsers = Object.keys(event.data.previous.val());
      const actualUsers = Object.keys(event.data.val());

      const removedUser = previousUsers.filter(function(x) { return actualUsers.indexOf(x) < 0 });
      // Test if the users object does not exist anymore
      if (removedUser.length > 0 && event.data.ref.parent.parent.child('admin').child(removedUser[0]).key === removedUser[0]) {
        const newAdmin = { [actualUsers[0]]: event.data.val()[Object.keys(event.data.val())[0]] }
        return event.data.adminRef.parent.child('admin').set(newAdmin);
      }
    }
  });
