import axios from 'axios';
import React, { useEffect, useState, useRef, memo } from 'react';
import {Link, NavLink} from "react-router-dom";

import heart from '../../Images/controller/heart.svg';
import message from '../../Images/controller/message.svg';
import play from '../../Images/play.svg';
import pause from '../../Images/Pause.svg';
import rewind_forwrad from '../../Images/controller/rewind.svg';
import rewind_backward from '../../Images/controller/rewind-1.svg';
import dislike from '../../Images/controller/thumbs-down.svg';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import volume from '../../Images/controller/volume-2.svg';

import { api } from '../App/App';
import { axiosAuthorized, axiosUnauthorized } from '../App/App';

const MusicPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);  
    const [nextSongIndex,setNextSongIndex] = useState(0);
    const audioRef = useRef(null);
    const [trackCurrentDuration, setTrackCurrentDuration] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);
    const handleRef = useRef(0);
    const [songName, setSongName] = useState('');
    const [songAuthor, setSongAuthor] = useState('');

    useEffect(() => {
        if(audioRef.current && props.songsInfo[nextSongIndex]?.id !== undefined){
            axiosUnauthorized.get(`api/song/${props.songsInfo[nextSongIndex]?.id}`)
            .then(response => {
                setSongName(response.data.name);
                axiosUnauthorized.get(`api/author/${response.data.authorId}`)
                    .then(resp => {
                        setSongAuthor(resp.data.name);
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
        }

    }, [audioRef.current, nextSongIndex])

    const handlePlayPause = () => { 
        clearInterval(handleRef.current);
        let audio = audioRef.current;
        if (isPlaying && audioRef.current) {
            audio.pause();
        }
        else {
            if (audioRef.current) {
                audio.play();
                handleRef.current = setInterval(() => {
                    setTrackCurrentDuration(t => t = audioRef.current.currentTime);
                    setTrackDuration(t => t = audioRef.current.duration);
                }, 1);
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        clearInterval(handleRef.current);
        const songsCount = props.songsInfo.length;
        if (nextSongIndex + 1 == songsCount)
            setNextSongIndex(0);
        else
            setNextSongIndex(nextSongIndex => nextSongIndex + 1);

        audioRef.current.currentTime = 0;
        if (isPlaying) 
            handlePlayPause();
    };

    const handlePrevSong = () => {
        clearInterval(handleRef.current);
        if (nextSongIndex - 1 == -1)
            setNextSongIndex(props.songsInfo.length - 1);
        else
            setNextSongIndex(nextSongIndex => nextSongIndex - 1);

        audioRef.current.currentTime = 0;
        if (isPlaying)
            handlePlayPause();
    };

    const handleCurrentDurationChange = (event) => {
        clearInterval(handleRef.current);

        const newTrackDuration = event.target.value;
        setTrackCurrentDuration(newTrackDuration);

        if (audioRef.current) {
            audioRef.current.currentTime = event.target.value;
            handleRef.current = setInterval(() => {
                setTrackCurrentDuration(t => t = audioRef.current.currentTime);
            }, 1);
        }
    };

    const handleVolumeChange = (event) => {
        let audio = document.querySelector('audio');
        audio.volume = event.target.value*0.01;
    };

    function formatTime(seconds) {
        if (seconds === undefined || seconds === NaN || seconds === null) {
            return '00:00';
        }
        seconds = Math.round(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    function showModal() {
        const vl_md = document.getElementById('volume-modal')
        if(vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.remove('volume-modal-hidden');
        }
    };

    function hideModal() {
        const vl_md = document.getElementById('volume-modal')
        if(!vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.add('volume-modal-hidden');
        }
    };

    return (<div className="music-player-wrapper">
        <audio ref={audioRef} src={api + `api/song/${props.songsInfo[nextSongIndex]?.id}/file`}
            onEnded={handleNextSong} type="audio/mpeg" autoplay controls/>
        <div className="music-player">
            <img className='music-player-cover' src={props.songsInfo.length > nextSongIndex ?
            (api + `api/song/${props.songsInfo[nextSongIndex]?.id}/logo?width=100&height=100`) : cover} alt='cover'/>

            <span className='music-player-head'>
                <p className='music-player-head-song'>{songName}</p>
                <p className='music-player-head-author'>{songAuthor}</p>
            </span>

            <div className='music-player-buttons'>
                <button onClick={handlePrevSong}>
                    <img alt='previous track' src={rewind_backward}/></button>
                <button onClick={handlePlayPause} 
                    className='play-button'><img alt='play' src={isPlaying? pause : play}/></button>
                <button onClick={handleNextSong}>
                    <img alt='next track' src={rewind_forwrad}/></button>
            </div>

            <div className='music-player-buttons'>
                <button><img alt='dislike' src={dislike}/></button>
                <Link to={`/commentaries/${props.songsInfo[nextSongIndex]?.id}`}><img alt='comment' src={message}/></Link>
                <button><img alt='add to featured' src={heart}/></button>
            </div>
            
            <div className="track-range">
                <span className="header-text header__track-duration">{formatTime(trackCurrentDuration)}</span>
                <input className='track-range-input' value={trackCurrentDuration} 
                    onChange={handleCurrentDurationChange}
                    type="range" id="time" name="volume" min="0" max={trackDuration}/>
                <span className="header-text header__track-duration">{formatTime(trackDuration)}</span>
            </div>

            <div className="volume-container">
                <div id='volume-modal' className="volume-modal volume-modal-hidden" onMouseLeave={hideModal}>
                    <input type="range" className='track-range-input' min="0" max="100" onChange={handleVolumeChange}/>
                </div>
                <img className="header-volume-btn" src={volume} onMouseOver={showModal} ></img>
            </div>
        </div>
    </div>)
};

export default MusicPlayer;