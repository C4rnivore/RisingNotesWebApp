import { Link } from 'react-router-dom';
import authorButtonIcon from '../../../Images/player/authorButtonIcon.svg'
import currentSongIcon from '../../../Images/player/currentSongIcon.svg'
import playBtn from '../../../Images/player/PlayBtn.svg'
import CustomButton from '../../CustomButton/CustomButton'
import { useContext, useEffect, useState } from 'react';
import { api, axiosPictures, axiosUnauthorized, VideoPlayerContext } from '../../App/App';

function SongCover(props) {
    let currentTrack = props.track;
    const [clipId, setClipId] = useState(undefined);
    const {setVideo } = useContext(VideoPlayerContext);

    useEffect(() => {
        if (currentTrack.id !== '')
            axiosPictures.get(api + 'api/music-clip/by-song/' + currentTrack.id).then(response => {
                setClipId(response?.data.clipId);
            })
            .catch(err => {
                setClipId(undefined);
            })
    }, [currentTrack]);

    const coverLoaded = ()=>{
        const img = document.querySelector('.track-cover')
        img.classList.add('track-loaded')
    }

    return(
        <div className="main-player-container">
            <div className="current-song-title">
                <img src={currentSongIcon} alt="" className="current-song-img" />
                <span className="current-song-span">Сейчас играет</span>
            </div>
            <img draggable='false' src={currentTrack.trackCover} alt="cover" className="track-cover" onLoad={coverLoaded}/>
            <h2 className='player-track-name' style={{marginBottom:12}}>{currentTrack.trackName}</h2>
            <div className="player-authors">
                <img draggable='false' src={currentTrack.authorLogo} alt="artist cover" className="player-authors-pfp" />
                <Link to={`/artist/` + currentTrack?.authorId} className='player-author-name'>
                    {currentTrack?.authors ? currentTrack?.authors[0] : 'Трек не выбран'}
                </Link>
            </div>
            <div className="player-track-tags" style={{marginBottom:24}}>
                {currentTrack?.tags?.map((tag, index)=>(
                    <div className="player-track-tag" key={index}>{tag}</div>
                ))}
            </div>
            {clipId !== undefined ? (
                <CustomButton text='Смотреть клип' icon={playBtn} func={() => setVideo(api + `api/music-clip/${clipId}/file`)} success={'Смотреть клип'}/>
            ) : (<></>)}
            
        </div>
    )}

export default SongCover