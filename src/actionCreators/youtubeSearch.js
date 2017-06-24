import makeActionCreator from './makeActionCreator'
// Api youtube import

/* Action types */
export const YOUTUBE_SEARCH_REQUEST = 'YOUTUBE_SEARCH_REQUEST'
export const YOUTUBE_SEARCH_SUCCESS = 'YOUTUBE_SEARCH_SUCCESS'
export const YOUTUBE_SEARCH_FAILED = 'YOUTUBE_SEARCH_FAILED'

/* Action creators */
export const getAutocompleteParcelsRequest = makeActionCreator(YOUTUBE_SEARCH_REQUEST)
export const getAutocompleteParcelsSuccess = makeActionCreator(YOUTUBE_SEARCH_SUCCESS, 'results')
export const getAutocompleteParcelsFailed = makeActionCreator(YOUTUBE_SEARCH_FAILED, 'error')

/* Thunk action creators */
export function getYoutubeResults(search) {
  return (dispatch) => {
    dispatch(getAutocompleteParcelsRequest())
    // Call the youtube API with search and treat the result here with results or error
  }
}
