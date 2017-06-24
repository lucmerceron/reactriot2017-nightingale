import 'whatwg-fetch'
import { parse } from 'iso8601-duration'
import CancelablePromise from 'cancelable-promise'

const YOUTUBE_API_KEY = 'AIzaSyCHlaW6yCNuVSwYOM8a9jjMv5Bc5L7aXM0'
const YOUTUBE_ENDPOINT = 'https://www.googleapis.com/youtube/v3'
const YOUTUBE_MAX_RESULTS = 10

/**
 * Call the YouTube API for searching videos matching the given 'terms' value
 * @param  {string} term The term to search
 * @return {Promise}
 */
const searchVideos = (term) => {
  const query = `${YOUTUBE_ENDPOINT}/search/?key=${YOUTUBE_API_KEY}&part=snippet&type=video&videoEmbeddable=true`
    + `&maxResults=${YOUTUBE_MAX_RESULTS}&q=${term}`
  return fetch(query)
    .then(response => response.json())
    .then(data => {
      const { items: videos } = data
      return videos
    })
}

/**
 * Clean the results from "searchVideos" function to remove useless fields
 * @param  {Array<Object>} results The results from searchVideos function
 * @return {Promise}
 */
const cleanResults = (results) =>
  new Promise((resolve) => {
    const cleaned = []
    results.forEach(result => {
      const { videoId } = result.id
      const { title, channelTitle, thumbnails } = result.snippet
      const { url: thumbnailUrl } = thumbnails.high
      cleaned.push({ videoId, channelTitle, title, thumbnailUrl })
    })
    resolve(cleaned)
  })

/**
 * Parse an ISO8601 datetime string and return an "HH:mm:ss" formatted one
 * @param  {string} rawDuration An ISO8601 datetime string
 * @return {string}
 */
const parseDuration = (rawDuration) => {
  const parsed = parse(rawDuration)
  const { hours, minutes, seconds } = parsed
  return (hours > 0) ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

/**
 * Clean the results of getVideosExtraInformation function and return an formatted Object
 * (eg.: { videoId: { ...information }, videoId: { ...information }, ... })
 * @param  {Array<Object>} results The results from associateVideosAndExtraInformation
 * @return {Object}
 */
const cleanExtraInformartion = (results) => {
  const cleaned = {}
  results.forEach(result => {
    const { id: videoId } = result
    const { duration: rawDuration } = result.contentDetails
    cleaned[videoId] = { duration: parseDuration(rawDuration) }
  })
  return cleaned
}

/**
 * Match the cleaned searchVideos results & cleaned getVideosExtraInformation results to return an formatted Object
 * (eg.: { videoId: { ...information }, videoId: { ...information }, ... })
 * @param  {Array<Object>} videosResults     The cleaned results from searchVideos
 * @param  {Object}        extraInformations The cleaned results from getVideosExtraInformation
 * @return {Object}
 */
const associateVideosAndExtraInformation = (videosResults, extraInformations) => {
  const finalResults = {}
  videosResults.forEach(videoResult => {
    const { videoId, ...others } = videoResult
    const extraInformation = extraInformations[videoId]
    finalResults[videoId] = { ...others, ...extraInformation }
  })
  return finalResults
}

/**
 * Get the extra information for a set of videos
 * @param  {Array<Object>} results The cleaned results from searchVideos
 * @return {Object}
 */
const getVideosExtraInformation = (results) => {
  const ids = []
  results.forEach(result => {
    ids.push(result.videoId)
  })
  const query = `${YOUTUBE_ENDPOINT}/videos/?key=${YOUTUBE_API_KEY}&part=contentDetails&id=${ids.join(',')}`
  return fetch(query)
    .then(response => response.json())
    .then(data => {
      const { items: videosInfo } = data
      const cleanedExtraInformations = cleanExtraInformartion(videosInfo)
      return associateVideosAndExtraInformation(results, cleanedExtraInformations)
    })
}


/**
 * Search for a given term in the YouTube API and return a formatted Object
 * (eg.: { videoId: { ...information }, videoId: { ...information }, ... })
 * @param  {string} term The term to search
 * @return {Object}
 */

// Adding a cancelablePromise in order to remove last request
// if a new request comes
let myResponsePromise = null

const search = (term) => {
  if (myResponsePromise) myResponsePromise.cancel()

  if (!term) return new Promise((resolve) => resolve({}))
  myResponsePromise = new CancelablePromise(resolve =>
    searchVideos(term)
      .then(cleanResults)
      .then(getVideosExtraInformation)
      .then(resolve))
  return myResponsePromise
}

export default {
  search,
}
