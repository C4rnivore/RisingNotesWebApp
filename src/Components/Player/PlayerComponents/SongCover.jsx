import authorButtonIcon from '../../../Images/player/authorButtonIcon.svg'
import currentSongIcon from '../../../Images/player/currentSongIcon.svg'
import playBtn from '../../../Images/player/PlayBtn.svg'

function SongCover(props) {
    let currentTrack = props.track

    const handleAuthorBtnClick = () =>{
        return
    }

    return(
        <div className="main-player-container">
            <div className="current-song-title" style={{marginBottom:40}}>
                <img src={currentSongIcon} alt="" className="current-song-img" />
                <span className="current-song-span">Сейчас играет</span>
            </div>
            <img src={currentTrack.trackCover} alt="" className="track-cover" style={{marginBottom:40}} />
            <h2 className='player-track-name' style={{marginBottom:12}}>{currentTrack.trackName}</h2>
            <div className="player-authors" style={{marginBottom:24}}>
                <img src={currentTrack.trackCover} alt="" className="player-authors-pfp" />
                <h3 className='player-author-name'>
                    {currentTrack.authors.map((author, index)=>(
                        index!==currentTrack.authors.length-1? author + ', ':author
                    ))}
                </h3>
            </div>
            <div className="player-track-tags" style={{marginBottom:24}}>
                {currentTrack.tags.map((tag, index)=>(
                    <div className="player-track-tag" key={index}>{tag}</div>
                ))}
            </div>
            <button className="player-watch-clip-btn">
                <img src={playBtn} alt="" />
                <span>Смотреть клип</span>
            </button>
        </div>
    )}

export default SongCover