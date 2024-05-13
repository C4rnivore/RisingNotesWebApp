import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";

import heart from '../../Images/controller/heart.svg';
import redHeart from '../../Images/red-heart.svg';
import message from '../../Images/controller/Chat_Dots.png';
import play from '../../Images/play.svg';
import pause from '../../Images/Pause.svg';
import rewind_forwrad from '../../Images/controller/rewind.svg';
import rewind_backward from '../../Images/controller/rewind-1.svg';
import dislike from '../../Images/controller/thumbs-down.svg';
import redDislike from '../../Images/controller/dislike-red.svg';
import cover from '../../Images/main-placeholder.png';
import vol from '../../Images/controller/volume-2.svg';
import filtersImg from '../../Images/player/FilterBtn.svg';

import { CurrentSongContext, ExcludedContext, FeaturedContext, PlayerContext, ResizeContext, api } from '../App/App';
import { axiosAuthorized, axiosUnauthorized } from '../App/App';

import './MusicPlayer.css';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';
import { useCookies } from 'react-cookie';

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
    const location = useLocation();
    const [hiddenTag, setHiddenTag] = useState('');

    const {songs, setSongs} = useContext(PlayerContext);
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const {featured, setFeatured} = useContext(FeaturedContext);
    const {excluded, setExcluded} = useContext(ExcludedContext);
    const {resize, setResize} = useContext(ResizeContext);
    const {cleanQuery} = useSearchClean();

    
    const volumeJSON = localStorage.getItem('VOL');
    const [volume, setVolume] = useState(volumeJSON ? JSON.parse(volumeJSON) : 1);
    const [cookies, setCookies] = useCookies(['role']);

    useEffect(() => {
        // скрытие плеера
        if (location.pathname.includes('login') || location.pathname.includes('registration') ||
            location.pathname.includes('uploadmusic') || cookies.role === 'admin') {
            setHiddenTag('hidden');
        } 
        else {
            setHiddenTag('');
        }
    }, [location]);

    useEffect(() => {
        // сохранение громкости плеера 
        let audio = document.querySelector('audio');
        audio.volume = volume;
        localStorage.setItem('VOL', JSON.stringify(audio.volume));
    }, [volume])

    useEffect(() => {
        // обновление информации о текущей песне и сброс плеера
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
                        setSongs(arr => arr.filter(e => e !== currentSong));
                        setCurrentSong('');
                    })
            })
            .catch(err => {
                console.log(err);
                setSongs(arr => arr.filter(e => e !== currentSong));
                setCurrentSong('');
            })
        }
        else if (songs.length > 0){
            setCurrentSong(songs[0]);
        }

    }, [songs, currentSong])

    const handlePlayPause = () => { 
        // Пауза в плеере
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
        // следующая песня или первая в очереди
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
        // предыдущая песня или последняя в очереди
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
        // привязка времени трека к шкале
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
        // изменеие громкости
        let audio = document.querySelector('audio');
        audio.volume = event.target.value*0.01;
        setVolume(audio.volume);
    };

    function formatTime(seconds) {
        // форматирование времени
        if (seconds === undefined || seconds === NaN || seconds === null) {
            return '00:00';
        }
        seconds = Math.round(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    function showModal() {
        // отображение окна громкости
        const vl_md = document.getElementById('volume-modal')
        if(vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.remove('volume-modal-hidden');
        }
    };

    function hideModal() {
        // скрытие окна громкости
        const vl_md = document.getElementById('volume-modal')
        if(!vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.add('volume-modal-hidden');
        }
    };

    async function handleToFavorite() {
        // добавление в избранное
        if (currentSong !== '' ) {
            
            if (featured.includes(currentSong)) {
                await axiosAuthorized.delete(api + `api/song/favorite/${currentSong}`).then(resp => {
                    setFeatured(e => e = e.filter(el => el != currentSong));
                });
            }
            else {
                await axiosAuthorized.patch(api + `api/song/favorite/${currentSong}`).then(resp => {
                    setFeatured(e => e = [...e, currentSong]);
                });
            }
        }
    };

    async function handleToExcluded() {
        // добавление в исключенное
        if (currentSong !== '' ) {
            if (excluded.includes(currentSong)) {
                await axiosAuthorized.delete(api + `api/excluded-track/${currentSong}`).then(resp => {
                    setExcluded(e => e = e.filter(el => el != currentSong));
                });
            }
            else {
                await axiosAuthorized.post(api + `api/excluded-track/${currentSong}`).then(resp => {
                    setExcluded(e => e = [...e, currentSong]);
                });
            }
        }
    };

    if (resize === 'standart') {
        return (<div className="music-player-wrapper">
            <audio ref={audioRef} src={currentSong ? api + `api/song/${currentSong}/file` : ''}
                onEnded={handleNextSong} type="audio/mpeg" autoPlay={isPlaying} controls style={{ display: 'none' }}/>
            <div className={`music-player-1 ` + hiddenTag}>
                <img className={isPlaying ? 'music-player-cover rotate' : 'music-player-cover'} draggable='false' src={currentSong ?
                (api + `api/song/${currentSong}/logo?width=100&height=100`) : cover} alt='cover'/>

                <span className='music-player-head'>
                    <p className='music-player-head-song'>{songName}</p>
                    <Link to={`/artist/${authorId}`} className='music-player-head-author'>{songAuthor}</Link>
                </span>

                <div className='music-player-buttons'>
                    <button onClick={handlePrevSong} disabled={songs.length < 1}>
                        <img alt='previous track' src={rewind_backward} draggable='false'/></button>
                    <button onClick={handlePlayPause} disabled={currentSong === ''}
                        className='play-button'><img alt='play' src={isPlaying? pause : play} draggable='false'/></button>
                    <button onClick={handleNextSong} disabled={songs.length < 1}>
                        <img alt='next track' src={rewind_forwrad} draggable='false'/></button>
                </div>

                <div className='music-player-buttons'>
                    <a onClick={handleToExcluded}><img alt='dislike' draggable='false' src={excluded.includes(currentSong) ? redDislike : dislike}/></a>
                    <Link to={currentSong === '' ? '' : `/commentaries/${currentSong}`} onClick={cleanQuery}>
                        <img alt='comment' src={message} draggable='false'/>
                    </Link>
                    <a onClick={handleToFavorite}><img alt='like' draggable='false' src={featured.includes(currentSong) ? redHeart : heart}/></a>
                </div>
                
                <div className="track-range">
                    <span className="header-text header__track-duration">{formatTime(trackCurrentDuration)}</span>
                    <input className='track-range-input' value={trackCurrentDuration} 
                        onChange={handleCurrentDurationChange}
                        type="range" id="time" name="volume" min="0" max={trackDuration}/>
                    <span className="header-text header__track-duration">{formatTime(trackDuration)}</span>
                </div>

                <div className="volume-container" onMouseLeave={hideModal}>
                    <div id='volume-modal' className="volume-modal volume-modal-hidden" >
                        <input type="range" className='track-range-input' min="0" max="100" onChange={handleVolumeChange} value={volume*100}/>
                    </div>
                    <img className="header-volume-btn" src={vol} onMouseOver={showModal} draggable='false'></img>
                </div>
            </div>
        </div>)
    }
    else {
        return (<div className="music-player-wrapper">
            <audio ref={audioRef} src={currentSong ? api + `api/song/${currentSong}/file` : ''}
                onEnded={handleNextSong} type="audio/mpeg" autoPlay={isPlaying} controls style={{ display: 'none' }}/>
            <input className={'track-range-input mobile-player-input ' + hiddenTag} value={trackCurrentDuration} 
                        onChange={handleCurrentDurationChange}
                        type="range" id="time" name="volume" min="0" max={trackDuration}/>
            <div className={`mobile-music-player ` + hiddenTag}>
                <div className='mobile-music-player-song'>
                    <img className={isPlaying ? 'mobile-music-player-img rotate' : 'mobile-music-player-img'} draggable='false' src={currentSong ?
                (api + `api/song/${currentSong}/logo?width=100&height=100`) : cover} alt='cover'/>
                    <span>
                        <p>{songName}</p>
                        <Link to={`/artist/${authorId}`} className='mobile-music-player-author'>{songAuthor}</Link>
                    </span>
                    <button className='mobile-filters-button'><img src={filtersImg}/></button>
                </div>
                <div className='mobile-music-player-buttons'>
                    <div className='music-player-buttons'>
                        <a onClick={handleToExcluded}><img alt='dislike' draggable='false' src={excluded.includes(currentSong) ? redDislike : dislike}/></a>
                        <Link to={currentSong === '' ? '' : `/commentaries/${currentSong}`}>
                            <img alt='comment' src={message} draggable='false'/>
                        </Link>
                        <a onClick={handleToFavorite}><img alt='like' draggable='false' src={featured.includes(currentSong) ? redHeart : heart}/></a>
                    </div>

                    <div className='music-player-buttons'>
                        <button onClick={handlePrevSong} disabled={songs.length < 1}>
                            <img alt='previous track' src={rewind_backward} draggable='false'/></button>
                        <button onClick={handlePlayPause} disabled={currentSong === ''}
                            ><img alt='play' src={isPlaying? pause : play} draggable='false'/></button>
                        <button onClick={handleNextSong} disabled={songs.length < 1}>
                            <img alt='next track' src={rewind_forwrad} draggable='false'/></button>
                    </div>
                </div>
            </div>
        </div>)
    }
};

export default MusicPlayer;