import React from 'react'
import PropTypes from 'prop-types'
import { keys, orderBy } from 'lodash'

import './MusicListItem.css'

const MusicListItem = ({ musicsToDisplay, addMusic, removeMusic, likeMusic, unlikeMusic, playlist }) => {
  const myUid = localStorage.getItem('nightingaleUid')

  const isCreatorOrAdmin = music => music.creator === myUid || (playlist.admin && playlist.admin[myUid])
  const isLiked = music => music && music.likes && music.likes[myUid]
  const isInPlaylist = youtubeId => playlist && playlist.musics && playlist.musics[youtubeId]

  const getLikeAdd = youtubeId => {
    if (isInPlaylist(youtubeId)) {
      return isLiked(musicsToDisplay[youtubeId]) || (playlist && isLiked(playlist.musics[youtubeId]))
        ? <span className="search-panel-result-like" onClick={() => unlikeMusic(youtubeId)}><i className="ion-ios-heart" /></span>
        : (<span className="search-panel-result-unlike" onClick={() => likeMusic(youtubeId)}>
          <i className="ion-ios-heart-outline" />
        </span>)
    }
    return <div className="search-panel-result-add" onClick={() => addMusic(youtubeId, musicsToDisplay[youtubeId])}><i className="ion-ios-plus-outline"/></div>
  }

  return (
    <div className="search-panel-list">
      <ul className="music-list">
        {orderBy(keys(musicsToDisplay), a => -keys(musicsToDisplay[a].likes || []).length)
          .map(youtubeId => (
            <li key={youtubeId} className="music-list-item row">
              <div className="music-list-item-thumbnail">
                <img
                  alt="youtube thumbnail preview image"
                  src={musicsToDisplay[youtubeId].thumbnailUrl}
                />
              </div>
              <div className="music-list-item-content">
                <div className="search-panel-result-title">
                  {musicsToDisplay[youtubeId].title} - 
                  <span className="search-panel-result-channel">{musicsToDisplay[youtubeId].channelTitle}</span>
                </div>
              </div>
              <div className="music-list-item-action">
                <div className="music-list-item-action-content">
                  <span className="search-panel-result-duration">{musicsToDisplay[youtubeId].duration}</span>
                  {getLikeAdd(youtubeId)}
                  {isCreatorOrAdmin(musicsToDisplay[youtubeId]) && isInPlaylist(youtubeId)
                    ? (
                      <div
                        className="search-panel-result-remove"
                        onClick={() => removeMusic(youtubeId)}
                      ><i className="ion-ios-trash-outline" /></div>)
                    : null
                  }
                </div>
              </div>
            </li>
        ))}
      </ul>
    </div>
  )
}

MusicListItem.propTypes = {
  musicsToDisplay: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  addMusic: PropTypes.func,
  likeMusic: PropTypes.func.isRequired,
  unlikeMusic: PropTypes.func.isRequired,
  removeMusic: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  search: PropTypes.bool.isRequired,
}

MusicListItem.defaultProps = {
  youtubeCompare: null,
  addMusic: () => {},
  removeMusic: null,
}

export default MusicListItem
