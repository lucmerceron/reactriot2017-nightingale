import makeActionCreator from './makeActionCreator'

/* Action types */
export const EMPTY_FEED = 'EMPTY_FEED'

/* Action creators */
export const emptyFeed = makeActionCreator(EMPTY_FEED)

/* Thunk action creators */
export function emptyFeedPlease() {
  return (dispatch) => {
    dispatch(emptyFeed())
  }
}
