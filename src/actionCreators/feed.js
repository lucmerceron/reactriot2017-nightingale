import makeActionCreator from './makeActionCreator'

/* Action types */
export const FEED_MUSIC_ADD_SUCCESS = 'FEED_MUSIC_ADD_SUCCESS'
export const FEED_MUSIC_REMOVE_SUCCESS = 'FEED_MUSIC_REMOVE_SUCCESS'
export const FEED_LIKE_ADD_SUCCESS = 'FEED_LIKE_ADD_SUCCESS'
export const FEED_LIKE_REMOVE_SUCCESS = 'FEED_LIKE_REMOVE_SUCCESS'

/* Action creators */
export const feedMusicAddSuccess = makeActionCreator(FEED_MUSIC_ADD_SUCCESS, 'music')
export const feedMusicRemoveSuccess = makeActionCreator(FEED_MUSIC_REMOVE_SUCCESS, 'music')
export const feedLikeAddSuccess = makeActionCreator(FEED_LIKE_ADD_SUCCESS, 'like')
export const feedLikeRemoveSuccess = makeActionCreator(FEED_LIKE_REMOVE_SUCCESS, 'like')

/* Thunk action creators */
export function addToFeed(type, action, object) {
  return (dispatch) => {
    if (type === 'music') {
      if (action === 'add') {
        dispatch(feedMusicAddSuccess(object))
      } else {
        dispatch(feedMusicRemoveSuccess(object))
      }
    } else if (action === 'add') {
      dispatch(feedLikeAddSuccess(object))
    } else {
      dispatch(feedLikeRemoveSuccess(object))
    }
  }
}
