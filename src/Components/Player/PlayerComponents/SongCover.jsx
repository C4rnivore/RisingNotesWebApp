import { Link } from 'react-router-dom';
import authorButtonIcon from '../../../Images/player/authorButtonIcon.svg'
import currentSongIcon from '../../../Images/player/currentSongIcon.svg'
import playBtn from '../../../Images/player/PlayBtn.svg'
import CustomButton from '../../CustomButton/CustomButton'

function SongCover(props) {
    let currentTrack = props.track;

    

    const handleAuthorBtnClick = () =>{
        return
    }

    return(
        <div className="main-player-container">
            <div className="current-song-title">
                <img src={currentSongIcon} alt="" className="current-song-img" />
                <span className="current-song-span">Сейчас играет</span>
            </div>
            <img draggable='false' src={currentTrack.trackCover} alt="cover" className="track-cover"/>
            <h2 className='player-track-name' style={{marginBottom:12}}>{currentTrack.trackName}</h2>
            <div className="player-authors">
                <img draggable='false' src={currentTrack.authorLogo} alt="artist cover" className="player-authors-pfp" />
                <Link to={`/artist/` + currentTrack?.authorId} className='player-author-name'>
                    {/* {currentTrack?.authors?.map((author, index)=>(
                        index!==currentTrack.authors.length-1? author + ', ':author
                    ))} */}
                    {currentTrack?.authors ? currentTrack?.authors[0] : 'Трек не выбран'}
                </Link>
            </div>
            <div className="player-track-tags" style={{marginBottom:24}}>
                {currentTrack?.tags?.map((tag, index)=>(
                    <div className="player-track-tag" key={index}>{tag}</div>
                ))}
            </div>
            {/* <button className="player-watch-clip-btn">
                <img src={playBtn} alt="" />
                <span>Смотреть клип</span>
            </button> */}
            <CustomButton text='Смотреть клип' icon={playBtn}/>
        </div>
    )}

export default SongCover