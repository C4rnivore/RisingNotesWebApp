import authorButtonIcon from '../../../Images/player/authorButtonIcon.svg'
import currentSongIcon from '../../../Images/player/currentSongIcon.svg'

function SongCover(props) {
    let currentTrack = props.track

    const handleAuthorBtnClick = () =>{
        return
    }

    return(
        <div className="main-player-container">
            <div className="current-song-title">
                <img src={currentSongIcon} alt="" className="current-song-img" />
                <span className="current-song-span">Сейчас играет</span>
            </div>
            <img src={currentTrack.trackCover} alt="" className="track-cover" />
            <button className="about-author" onClick={handleAuthorBtnClick}>
                <img src={authorButtonIcon}  alt="" className="author-btn-icon" />
                Подробее об {currentTrack.authors.length > 1 ? 'авторах' : 'авторе' }
            </button>
        </div>
                )

}

export default SongCover