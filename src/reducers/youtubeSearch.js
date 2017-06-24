import { YOUTUBE_SEARCH_SUCCESS } from '../actionCreators/youtubeSearch'

export default function youtubeSearch(state = [], action) {
  switch (action.type) {
    case YOUTUBE_SEARCH_SUCCESS: {
      return [...action.results]
    }
    default:
      return state
  }
}
