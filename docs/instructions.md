# Usage instructions

This application is a web application, so it means that she should be accessed through a web browser.

![Cpt obvious](https://media.giphy.com/media/3ornjPrVfRT0Nze3o4/giphy.gif)

Yeah... Thanks Cpt. Obvious !

More seriously, we've coded and tested the application to be fully compatible with Chrome and Firefox.
There is some known bugs on Safari that we cant fix in the given amount of time.

> But, what about the phone ? Can I use it from *INSERT PHONE MODEL HERE* ?

**The answer is YES, absolutely !** Buuut... There is some things to know before...

## Mobile restriction and information
First, no one of us own an iPhone, so we only have tested it on Android devices.

We've tested it on Firefox for Android and Chrome for Android and **we found one restriction on Chrome.** We cant start the playing of the video automatically the first time, the use need to click on the play button to start the playing. **But only the first time !**

This is due to a restriction of the YouTube iframe API on Chrome that block the `playVideo()`, `loadVideoById()` and others similar functions until the user has intentionally launch the playing by an interaction (click, touch...). It was made to prevent heavy datausage on mobile.

This put aside, all the behavior and functionalities works the same as on desktop version. But the UI/UX isn't optimized for mobile (Not enough time :cry:)

You can perfectly use it, but it's not optimized for mobile usage.

## Step by step `how to enjoy your first playlist` guide

So ! You're still here ? **GREAT !** Let's see how to create and share you're first Nightingale playlist.

![stepbystep](https://media.giphy.com/media/Jvs7vZ7X7lCnK/giphy.gif)

### 1 - Access the application
The first thing to do is accessing the application (Insert another Captain GIF here if needed).

The url is [http://nightingale.2017.reactriot.com](http://nightingale.2017.reactriot.com)

Easy step no ?

### 2 - Create/Join a playlist
Now, if we've done our work correctly, you're in front of the homepage of Nightingale and you can see two (beautifuls) buttons :
- `Create a playlist`
- `Join a playlist`

They will act exactly as their names lets think they are. Choose one of them ! :wink:

#### Create a playlist
If you clicked this one, you will now face a form to fill with the asked information :

- `Playlist title` - It's the name you want to give to your playlist
- `User Name` - Your name that will be displayed to other users. (Please note that if you never used the app, we automatically prefill this field with an awesome ranmdomly generated one. Yes, that's the future :smile:)
- `Tag` - The kind of music/Tag that will best represent the spirit of your playlist
- `Private` - Turn this ON if you dont want your playlist to appear publicly in the `Join a playlist` section. Your friends need you to give them the link, ID or QRcode to access it.

Click on `Let's rock` and that's it ! You've created your first Nightingale playlist. :clap:

#### Join a playlist
You don't want to take the responsibility to create your own playlist ? That's not a problem, someone is maybe more courageous and has created one that you can join.

This screen will give not less than you 3 different possibilities to join a playlist !

- By clicking the big black QRCode, you could use your camera to scan a qrcode and access the matching playlist
- You could also directly type the ID of the playlist to join in the corresponding text input and click the `Here we go` button
- And finally, if there is some public playlists already created, you will see them under the `People may have good tastes too` message, just click one to join it

When you join a public playlist, you will be named with the latest name that you used on Nightingale, or a ranmdomly generated one.

### The playlist view
No matter if you joined or created one, you made it ! You've joined your first Nightingale playlist !

**CONGRATULATIONS !**

So the playlist screen is decomposed in 3 panels disposed from left to right (Up to down on mobile).

- The first one is the search panel. From here, you can search for video to add to the playlist (And add them).
- The second (in the center), is the actual state of the plalist. That will display an `Empty playlist` screen if there is non content added to it. A `Waiting screen` if the playlist is ready to start but not started (note that only the admin of the playlist can start it). And a `Playing screen` that shows the video currently playing and associated controls (Only the admin can pause/play and skip a video), and the queue of the playlist, from where you can like/unlike the songs to reorganize them.
- The last one is a triple tabs panel that can show the information about the activity in the playlist (since you're connected to it, no history) like Add/Remove and Like/Unlike videos, and also the list of the users (the admin will add a crown on his avatar, and you'll see a `(me)` mention aside of youre name)

**With those information, you should be able to enjoy Nightingale. Have fun !!**

## Notes

- The playlists are ephemeral, it means that when the last user leaves it, the playlist is deleted.
- When the admin leaves the playlist, the admin rights are transfered to another user. (If you're admin of a playlist and you leave a playlist, you will not retrieve the admin rights when you come back)
