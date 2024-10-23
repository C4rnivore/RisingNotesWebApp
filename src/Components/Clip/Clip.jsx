import './Clip.css';
import viewsIcon from '../../Images/account-page/stats-icon.svg';
import editIcon from '../../Images/account-page/edit-icon.svg';
import { api } from '../App/App';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';
import { handleVideoEnter, handleVideoHover, handleVideoLeave, handleVideoMove } from './handlers/ClipHandlers';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentSongValue } from '../../Redux/slices/currentSongSlice';
import { updateSongsValue } from '../../Redux/slices/songsSlice';
import { updateVideoPlayerValue } from '../../Redux/slices/videoPlayerSlice';


const statusType = {
    0: 'Неизвестно',
    1: 'На модерации',
    2: 'На доработке',
    3: 'Опубликовано',
    4: 'Отклонено',
    5: 'Отозвано'
};

const statusColor = {
    0: 'yellow',
    1: 'yellow',
    2: 'yellow',
    3: 'green',
    4: 'red',
    5: 'red'
}

function Clip({key, clipId, authorId, songId, name, status, views, isArtist=false}) {
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [authorName, setAuthorName] = useState('')
    const videoPreviewRef = useRef(undefined)
    const previewRef = useRef(undefined)
    const {cleanQuery} = useSearchClean()
    
    const songs = useSelector((state)=>state.songs.value)
    const dispatch = useDispatch()
    
    const getAuthorName = async (id) =>{
        try{
            const response = await axios({
                method:'GET',
                url: api + 'api/author/' + id,
                responseType: 'application/json'
            })
            let result = JSON.parse(response.data)
            return result.name
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    const handleSongClick = () =>{
        dispatch(updateSongsValue([...songs, songId]))
        dispatch(updateCurrentSongValue(songId))
    }

    useEffect(()=>{
        getAuthorName(authorId)
            .then(res=>setAuthorName(res))
            .catch(err=>console.log(err))
    },[])


    return ( 
        <div key={key} className="clip-wrapper">
            {videoLoaded ? <></>:  <>  
                <Skeleton baseColor='#0F141D' highlightColor="#2C323D"  height={200}/>
                <Skeleton baseColor='#0F141D' highlightColor="#2C323D" count={2} />
            </>}
            <div className="cover-wrapper" style={videoLoaded?{display:'block'}:{display:'none'}}>
                <div className="clip-video" onClick={() =>
                    dispatch(
                        updateVideoPlayerValue(api + `api/music-clip/${clipId}/file`)
                    )} 
                        onMouseOver={() => handleVideoHover(videoPreviewRef, api + `api/music-clip/${clipId}/file` )}
                        onMouseEnter={() => handleVideoEnter(previewRef)}
                        onMouseMove={() => handleVideoMove(videoPreviewRef)}
                        onMouseLeave={() => handleVideoLeave(previewRef, videoPreviewRef)}>
                    <img ref={previewRef}
                        draggable='false'
                        className='clip-cover'
                        onLoad={()=>{setVideoLoaded(true)}}
                        src={api + `api/music-clip/${clipId}/preview`} 
                        alt="" 
                        style={{width:'100%', objectFit:'cover', pointerEvents:'none'}} />
                    <video ref={videoPreviewRef}
                        className='clip-video' 
                        muted={true}
                        preload="auto"
                        >
                        Sorry, your browser doesn't support embedded videos
                    </video>
                </div>
            </div>
            <div className="clip-song" onClick={handleSongClick} style={videoLoaded?{display:'flex'}:{display:'none'}}> 
                <div className="song-img-placeholder">
                    <img src={api + `api/song/${songId}/logo`} alt="" style={{height:'100%'}}/>
                </div>
                <div className="song-info-wrapper">
                    <span className="clip-song-name">{name}</span>
                    <span className="clip-song-author">
                        <NavLink to={`/artist/${authorId}`} onClick={cleanQuery}>
                            {authorName}
                        </NavLink>
                    </span>
                </div>
            </div>
            {isArtist ? (
                <div className='clip-artist-info'>
                    <p className='clip-views'><img src={viewsIcon} alt=''/>{views}</p>
                    <p className='song-status'>
                        <div className={'song-status-dot ' + statusColor[status]}></div>
                        {statusType[status]}
                    </p>
                    <a href={`/uploadvideo`}><img alt='list' src={editIcon} /></a>
                </div>
            ) : (<></>)}
        </div>
    );
}
export default Clip;