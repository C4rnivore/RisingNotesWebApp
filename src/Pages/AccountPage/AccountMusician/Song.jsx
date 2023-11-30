import editIcon from '../../../Images/account-page/edit-icon.svg';
import SongCover from '../../../Images/image-placeholder/songskin.png';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import message from '../../../Images/controller/Chat_Dots.png';
import statsIcon from '../../../Images/account-page/stats-icon.svg';
import { CurrentSongContext, PlayerContext, api, axiosAuthorized } from '../../../Components/App/App';

export default function Song (props) {
    const [duration, setDuration] = useState(0);
    const {songs, setSongs} = useContext(PlayerContext);
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);

    const formatTime = (miliseconds) => {
        let seconds = miliseconds * 0.001
        if (seconds === undefined || seconds === NaN || seconds === null) {
            return '00:00';
        }
        seconds = Math.round(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        setDuration(formatTime(props.duration))
    }, []);

    const handleToFavorite = () => {
        axiosAuthorized.patch(api + `api/song/favorite/${props.id}`);
    };

    const handleAddToSongs = () => {
        setSongs(e => e = [...e, props.id])
        setCurrentSong(props.id);
    };

    return (
        <div className='track'>
            <img onClick={handleAddToSongs} alt='cover' src={api + `api/song/${props.id}/logo?width=100&height=100`}/>
            <p onClick={handleAddToSongs} className='song-title-t'>{props.name}<p className='songAuthor'>{props.artist}</p></p>
            <p className='track-statistic'><img alt='stats' src={statsIcon}/>1456</p>
            <p className='song-status'>
                <div className='song-status-dot red'></div>
                Опубликован
            </p>
            <p className='song-duration'>{duration}</p>
            <Link to={`/commentaries/${props.id}`}><img alt='comment' src={message}/></Link>
            <a><img alt='list' src={editIcon} /></a>
        </div>
    )
}