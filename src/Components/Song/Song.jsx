import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heart from '../../Images/controller/heart.svg';
import redHeart from '../../Images/red-heart.svg';
import message from '../../Images/controller/Chat_Dots.png';
import dislike from '../../Images/controller/thumbs-down.svg';
import redDislike from '../../Images/controller/dislike-red.svg';
import list from '../../Images/list.svg'
import { api, axiosAuthorized } from '../App/App';
import thumb from '../../Images/main-placeholder.png';
import check from '../../Images/check_big.svg';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

import { useSelector, useDispatch } from 'react-redux';
import { updateExcludedValue } from '../../Redux/slices/excludedSlice';
import { updateFeaturedValue } from '../../Redux/slices/featuredSlice';
import { updateCurrentSongValue } from '../../Redux/slices/currentSongSlice';
import { updateSongsValue } from '../../Redux/slices/songsSlice';
import './Song.css';

function Song(props) {
    const [modalIsHidden, setModalIsHidden] = useState(true);
    const [duration, setDuration] = useState(0);
    const {cleanQuery} = useSearchClean()

    const dispatch = useDispatch()
    const excluded = useSelector((state)=>state.excluded.value)
    const resize = useSelector((state)=> state.resize.value)
    const featured = useSelector((state)=>state.featured.value)
    const songs = useSelector((state)=>state.songs.value)

    const changeModalState = () => {
        setModalIsHidden(modalIsHidden => modalIsHidden = !modalIsHidden);
    }

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

    async function handleToFavorite() {
        if (featured.includes(props.id)) {
            await axiosAuthorized.delete(api + `api/song/favorite/${props.id}`).then(resp => {
                dispatch(updateFeaturedValue(featured.filter(el => el != props.id)))
            });
        }
        else {
            await axiosAuthorized.patch(api + `api/song/favorite/${props.id}`).then(resp => {
                dispatch(updateFeaturedValue([...featured, props.id]))
            });
        }
    };

    async function handleToExcluded() {
        if (excluded.includes(props.id)) {
            await axiosAuthorized.delete(api + `api/excluded-track/${props.id}`).then(resp => {
                dispatch(updateExcludedValue(excluded.filter(el => el != props.id)))
            });
        }
        else {
            await axiosAuthorized.post(api + `api/excluded-track/${props.id}`).then(resp => {
                dispatch(updateExcludedValue([...excluded, props.id]))
            });
        }
    };

    const handleAddToSongs = () => {
        dispatch(updateSongsValue([...songs, props.id]))
        dispatch(updateCurrentSongValue(props.id));
    };

    return (
        <>
            <div className='track'>
                <img onClick={handleAddToSongs} alt='cover' src={api + `api/song/${props.id}/logo?width=100&height=100`} draggable='false'/>
                <p onClick={handleAddToSongs} className='song-title-t'>{props.name}
                    <p className='songAuthor'>{props.artist}</p>
                </p>
                {resize === 'standart' ? (
                    <>
                        {props?.genres?.length > 0 ? <p className='song-genre'>{props?.genres[0]}</p> : <p className='song-genre'>Без жанра</p>}
                        <p className='song-duration'>{duration}</p>
                    </>
                ) : (
                    <></>
                )}
                
                {resize === 'standart' ? (
                    <div className='track-buttons'>
                        <a><img alt='list' src={list} onClick={changeModalState}/></a>
                        <a onClick={handleToExcluded}><img alt='dislike' src={excluded.includes(props.id) ? redDislike : dislike}/></a>
                        <a onClick={handleToFavorite}><img alt='like' src={featured.includes(props.id) ? redHeart : heart}/></a>
                        <Link to={`/commentaries/${props.id}`} onClick={cleanQuery}><img alt='comment' src={message}/></Link>
                    </div>
                ): (
                    <a onClick={handleToFavorite}><img alt='like' src={featured.includes(props.id) ? redHeart : heart}/></a>
                )}
                
                
            </div>
            {!modalIsHidden ? (
                    <div className="list-modal-container">
                    <div className="list-modal-window">
                        <div className="song-modal">
                            <p className="song-modal__title">
                                Добавить в плейлист
                            </p>
                            <div className='song-modal__playlists'>
                                <ul>
                                    <li className='song-modal__playlist'>
                                        <img className='song-modal__playlist-thumb' src={thumb} alt="" />
                                        <span className='song-modal__playlist-name'>Лучшие треки</span>
                                    </li>
                                    <li className='song-modal__playlist'>
                                        <img className='song-modal__playlist-thumb' src={thumb} alt="" />
                                        <span className='song-modal__playlist-name'>Подборка trash metal 🤘</span>
                                    </li>
                                    <li className='song-modal__playlist-selected'>
                                        <img className='song-modal__playlist-thumb-selected' src={check} alt=""/>
                                        <img className='song-modal__playlist-thumb' src={thumb} alt="" />
                                        <span className='song-modal__playlist-name'>🎉 Треки для вечеринки </span>
                                    </li>
                                    <li className='song-modal__playlist'>
                                        <img className='song-modal__playlist-thumb' src={thumb} alt="" />
                                        <span className='song-modal__playlist-name'>Очень длинное название плейлиста</span>
                                    </li>
                                </ul>
                            </div>
                            <button className='song-modal__add-button'>
                                + Добавить плейлист
                            </button>
                        </div>
                    </div>
                    
                </div>
                ) : (<></>)}
        </>
    )
}

export default Song