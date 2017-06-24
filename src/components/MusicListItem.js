import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'lodash'

import './MusicListItem.css'

const MusicListItem = ({ musicsToDisplay, addMusic, removeMusic, likeMusic, unlikeMusic, playlist }) => {
  const myUid = localStorage.getItem('nightingaleUid')

  const isCreatorOrAdmin = music => music.creator === myUid || (playlist.admin && playlist.admin[myUid])
  const isLiked = music => music && music.likes && music.likes[myUid]
  const isInPlaylist = youtubeId => playlist && playlist.musics && playlist.musics[youtubeId]

  const getLikeAdd = youtubeId => {
    if (isInPlaylist(youtubeId)) {
      return isLiked(musicsToDisplay[youtubeId]) || (playlist && isLiked(playlist.musics[youtubeId]))
        ? <div className="search-panel-result-like" onClick={() => unlikeMusic(youtubeId)}>Unlike</div>
        : <div className="search-panel-result-unlike" onClick={() => likeMusic(youtubeId)}>Like</div>
    }
    return <div className="search-panel-result-add" onClick={() => addMusic(youtubeId, musicsToDisplay[youtubeId])}>Add</div>
  }

  return (
    <div className="search-panel-list">
      <ul>
        {keys(musicsToDisplay).map(youtubeId => (
          <li key={youtubeId}>
            <div className="search-panel-result-thumbnail">{musicsToDisplay[youtubeId].thumbnailUrl}</div>
            <div className="search-panel-result-title">{musicsToDisplay[youtubeId].title}</div>
            <div className="search-panel-result-channel">{musicsToDisplay[youtubeId].channelTitle}</div>
            <div className="search-panel-result-duration">{musicsToDisplay[youtubeId].duration}</div>
            <div className="search-panel-result-action">
              {getLikeAdd(youtubeId)}
              {isCreatorOrAdmin(musicsToDisplay[youtubeId]) && isInPlaylist(youtubeId)
                ? <div className="search-panel-result-remove" onClick={() => removeMusic(youtubeId)}>Remove</div>
                : null
              }
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
