import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import {Link, NavLink} from "react-router-dom";

import heart from '../../Images/controller/heart.svg';
import redHeart from '../../Images/red-heart.svg';
import message from '../../Images/controller/Chat_Dots.png';
import play from '../../Images/play.svg';
import pause from '../../Images/Pause.svg';
import rewind_forwrad from '../../Images/controller/rewind.svg';
import rewind_backward from '../../Images/controller/rewind-1.svg';
import dislike from '../../Images/controller/thumbs-down.svg';
import redDislike from '../../Images/controller/dislike-red.svg';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import vol from '../../Images/controller/volume-2.svg';

import { CurrentSongContext, ExcludedContext, FeaturedContext, PlayerContext, api } from '../App/App';
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
    const [authorId, setAuthorId] = useState('');

    const {songs, setSongs} = useContext(PlayerContext);
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const {featured, setFeatured} = useContext(FeaturedContext);
    const {excluded, setExcluded} = useContext(ExcludedContext);

    
    const volumeJSON = localStorage.getItem('VOL');
    const [volume, setVolume] = useState(volumeJSON ? JSON.parse(volumeJSON) : 1);

    useEffect(() => {
        let audio = document.querySelector('audio');
        audio.volume = volume;
        localStorage.setItem('VOL', JSON.stringify(audio.volume));
    }, [volume])

    useEffect(() => {
        if(currentSong !== ''){
            axiosUnauthorized.get(`api/song/${currentSong}`)
            .then(response => {
                setSongName(response.data.name);
                setAuthorId(response.data.authorId);
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
        else if (songs.length > 0){
            setCurrentSong(songs[0]);
        }

    }, [songs, currentSong])

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
        setIsPlaying(isPlaying => isPlaying = !isPlaying);
    };

    const handleNextSong = () => {
        clearInterval(handleRef.current);
        const songsCount = songs.length;
        if (nextSongIndex + 1 == songsCount)
            setNextSongIndex(0);
        else
            setNextSongIndex(nextSongIndex => nextSongIndex + 1);

        audioRef.current.currentTime = 0;
        setCurrentSong(songs[nextSongIndex]);

        handleRef.current = setInterval(() => {
            setTrackCurrentDuration(t => t = audioRef.current.currentTime);
            setTrackDuration(t => t = audioRef.current.duration);
        }, 1);
    };

    const handlePrevSong = () => {
        clearInterval(handleRef.current);
        if (nextSongIndex - 1 == -1)
            setNextSongIndex(songs.length - 1);
        else
            setNextSongIndex(nextSongIndex => nextSongIndex - 1);

        audioRef.current.currentTime = 0;
        setCurrentSong(songs[nextSongIndex]);

        handleRef.current = setInterval(() => {
            setTrackCurrentDuration(t => t = audioRef.current.currentTime);
            setTrackDuration(t => t = audioRef.current.duration);
        }, 1);
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
        setVolume(audio.volume);
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

    async function handleToFavorite() {
        if (featured.includes(currentSong)) {
            await axiosAuthorized.delete(api + `api/song/favorite/${currentSong}`).then(resp => {
                setFeatured(e => e = e.filter(el => el != currentSong));
            });
        }
        else {
            await axiosAuthorized.patch(api + `api/song/favorite/${currentSong}`).then(resp => {
                setFeatured(e => e = [...e, currentSong]);
            });;
        }
    };

    async function handleToExcluded() {
        if (excluded.includes(currentSong)) {
            await axiosAuthorized.delete(api + `api/excluded-track/${currentSong}`).then(resp => {
                setExcluded(e => e = e.filter(el => el != currentSong));
            });;
        }
        else {
            await axiosAuthorized.post(api + `api/excluded-track/${currentSong}`).then(resp => {
                setExcluded(e => e = [...e, currentSong]);
            });;
        }
    };

    return (<div className="music-player-wrapper">
        <audio ref={audioRef} src={currentSong ? api + `api/song/${currentSong}/file` : ''}
            onEnded={handleNextSong} type="audio/mpeg" autoPlay={isPlaying} controls/>
        <div className="music-player">
            <img className={isPlaying ? 'music-player-cover rotate' : 'music-player-cover'} src={currentSong ?
            (api + `api/song/${currentSong}/logo?width=100&height=100`) : cover} alt='cover'/>

            <span className='music-player-head'>
                <p className='music-player-head-song'>{songName}</p>
                <Link to={`/artist/${authorId}`} className='music-player-head-author'>{songAuthor}</Link>
            </span>

            <div className='music-player-buttons'>
                <button onClick={handlePrevSong} disabled={songs.length < 1}>
                    <img alt='previous track' src={rewind_backward}/></button>
                <button onClick={handlePlayPause} disabled={currentSong === ''}
                    className='play-button'><img alt='play' src={isPlaying? pause : play}/></button>
                <button onClick={handleNextSong} disabled={songs.length < 1}>
                    <img alt='next track' src={rewind_forwrad}/></button>
            </div>

            <div className='music-player-buttons'>
                <a onClick={handleToExcluded}><img alt='dislike' src={excluded.includes(currentSong) ? redDislike : dislike}/></a>
                <Link to={currentSong === '' ? '' : `/commentaries/${currentSong}`}>
                    <img alt='comment' src={message}/>
                </Link>
                <a onClick={handleToFavorite}><img alt='like' src={featured.includes(currentSong) ? redHeart : heart}/></a>
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
                    <input type="range" className='track-range-input' min="0" max="100" onChange={handleVolumeChange} value={volume*100}/>
                </div>
                <img className="header-volume-btn" src={vol} onMouseOver={showModal} ></img>
            </div>
        </div>
    </div>)
};

export default MusicPlayer;