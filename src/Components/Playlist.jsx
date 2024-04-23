import SongCover from '../Images/main-placeholder.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, axiosUnauthorized } from './App/App';


function Playlist(props) {
    const [namePlaylist, setNamePlaylist] = useState('');
    const [isreviewSkin, setReviewSkin] = useState(false);

    function reviewAvatar() {
        axiosUnauthorized.get(api + `api/playlist/${props.id}/logo?width=400&height=400`)
        .then (
            setReviewSkin(true)
        )
        .catch (
            error => {setReviewSkin(false)}
        )
    }

    useEffect(() => {
        axiosUnauthorized.get(`api/playlist/${props.id}`)
        .then(
            response => {
                setNamePlaylist(response.data.name)
                reviewAvatar();
            }
        )
    }, []) 

    return (
        <Link draggable='false' to={`/playlist/${props.id}`} className='playlist'>
            <img draggable='false' className='playlistskin' alt='cover' src={isreviewSkin ? api + `api/playlist/${props.id}/logo?width=400&height=400` : SongCover}/>
            <p className='labelplaylist'>{namePlaylist}</p>
        </Link>
    )
}


export default Playlist