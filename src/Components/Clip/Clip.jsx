import './Clip.css';
import viewsIcon from '../../Images/account-page/stats-icon.svg';
import editIcon from '../../Images/account-page/edit-icon.svg';
import { api } from '../App/App';
import axios from 'axios';
import { CurrentSongContext, PlayerContext } from '../App/App';
import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

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
    const stockCover='https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg'
    const [authorName, setAuthorName] = useState('')
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const {songs, setSongs} = useContext(PlayerContext);
    const {cleanQuery} = useSearchClean()

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
            console.log(err);
        }
    }

    const handleSongClick = () =>{
        setSongs(e => e = [...e, songId]);
        setCurrentSong(songId);
    }

    useEffect(()=>{
        getAuthorName(authorId)
            .then(res=>setAuthorName(res))
            .catch(err=>console.log(err))
    })

    return ( 
        <div key={key} className="clip-wrapper">
            <div className="cover-wrapper">
                <video className='clip-video' 
                    src={api + `api/music-clip/${clipId}/preview`} 
                    poster={stockCover} 
                    controls>
                    Sorry, your browser doesn't support embedded videos
                </video>
            </div>

            <div className="clip-song" onClick={handleSongClick}> 
                <div className="song-img-placeholder">
                    <img src={api + `api/song/${songId}/logo`} alt="" style={{width:'100%'}}/>
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
                    <p className='clip-views'><img src={viewsIcon}/>{views}</p>
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