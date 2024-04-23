import editIcon from '../../../Images/account-page/edit-icon.svg';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import message from '../../../Images/controller/Chat_Dots.png';
import statsIcon from '../../../Images/account-page/stats-icon.svg';
import { CurrentSongContext, PlayerContext, api, axiosAuthorized, axiosUnauthorized } from '../../../Components/App/App';

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

export default function Song (props) {
    const [songName, setSongName] = useState('');
    const [duration, setDuration] = useState(0);
    const [songId, setSongId] = useState(undefined); 
    const [auditionCount, setAuditionCount] = useState(0);

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
        axiosAuthorized.get(`api/song/upload-request/${props.id}`)
        .then(response => {
            setSongName(response.data.songName);
            setDuration(response.data?.durationMs);
            setSongId(response.data.publishedSongId);
            if (response.data.publishedSongId) {
                axiosUnauthorized.get(`api/song/${response.data.publishedSongId}`)
                .then(response => {
                    setAuditionCount(response.data.auditionCount);
                })
            }
        })
        setDuration(formatTime(0));
    }, []);

    const handleAddToSongs = (event) => {
        event.preventDefault();
        if (props.isPlaying && 
            props.audioRef.current?.src === api + `api/song/upload-request/${props.id}/file`) {
            props.audioRef.current?.pause();
            props.setIsPlaying(false);
        }
        else {
            props.audioRef.current.src= api + `api/song/upload-request/${props.id}/file`;
            props.audioRef.current?.play();
            props.setIsPlaying(true);
        }
        
    };

    return (
        <div className='track'>
            <img draggable='false' onClick={handleAddToSongs} alt='cover' src={api + `api/song/upload-request/${props.id}/logo?width=100&height=100`}/>
            <p onClick={handleAddToSongs} className='song-title-t'>{songName}<p className='songAuthor'>{props.artist}</p></p>
            <p className='track-statistic'><img alt='stats' src={statsIcon}/>{auditionCount}</p>
            <p className='song-status'>
                <div className={'song-status-dot ' + statusColor[props.status]}></div>
                {statusType[props.status]}
            </p>
            <p className='song-duration'>{formatTime(duration)}</p>
            {songId ? 
                <Link draggable='false' to={`/commentaries/${songId}`}><img draggable='false' alt='comment' src={message}/></Link> : 
                <Link draggable='false' to={`/account`}><img alt='comment' draggable='false' src={message} style={{opacity: 0.2}}/></Link>}
            
            <a href={`/uploadmusic/${props.id}`}><img alt='list' src={editIcon} /></a>
        </div>
    )
}