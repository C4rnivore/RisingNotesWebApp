import SongCover from '../Images/main-placeholder.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, axiosPictures, axiosUnauthorized } from './App/App';
import useSearchClean from '../Hooks/useSearchClean/useSearchClean';


function Playlist(props) {
    const [namePlaylist, setNamePlaylist] = useState('');
    const [isreviewSkin, setReviewSkin] = useState(false);
    const {cleanQuery} = useSearchClean();

    function reviewAvatar() {
        axiosPictures.get(api + `api/playlist/${props.id}/logo?width=400&height=400`)
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
        .catch(err => {console.log(err)});
    }, []) 

    return (
        <Link draggable='false' to={`/playlist/${props.id}`} className='playlist' onClick={() => cleanQuery()}>
            <img draggable='false' className='playlistskin' alt='cover' src={isreviewSkin ? api + `api/playlist/${props.id}/logo?width=400&height=400` : SongCover}/>
            <p className='labelplaylist'>{namePlaylist}</p>
        </Link>
    )
}


export default Playlist