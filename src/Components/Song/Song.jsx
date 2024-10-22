import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heart from '../../Images/controller/heart.svg';
import redHeart from '../../Images/red-heart.svg';
import message from '../../Images/controller/Chat_Dots.png';
import dislike from '../../Images/controller/thumbs-down.svg';
import redDislike from '../../Images/controller/dislike-red.svg';
import list from '../../Images/list.svg'
import { CurrentSongContext, ExcludedContext, FeaturedContext, PlayerContext, ResizeContext, api, axiosAuthorized } from '../App/App';
import thumb from '../../Images/main-placeholder.png';
import check from '../../Images/check_big.svg';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';
import { useSelector } from 'react-redux';
import './Song.css';

function Song(props) {
    const [modalIsHidden, setModalIsHidden] = useState(true);
    const [duration, setDuration] = useState(0);
    const {songs, setSongs} = useContext(PlayerContext);
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const {featured, setFeatured} = useContext(FeaturedContext);
    const {excluded, setExcluded} = useContext(ExcludedContext);
    const {cleanQuery} = useSearchClean()
    
    const resize = useSelector((state)=> state.resize.value)

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
                setFeatured(e => e = e.filter(el => el != props.id));
            });
        }
        else {
            await axiosAuthorized.patch(api + `api/song/favorite/${props.id}`).then(resp => {
                setFeatured(e => e = [...e, props.id]);
            });;
        }
    };

    async function handleToExcluded() {
        if (excluded.includes(props.id)) {
            await axiosAuthorized.delete(api + `api/excluded-track/${props.id}`).then(resp => {
                setExcluded(e => e = e.filter(el => el != props.id));
            });;
        }
        else {
            await axiosAuthorized.post(api + `api/excluded-track/${props.id}`).then(resp => {
                setExcluded(e => e = [...e, props.id]);
            });;
        }
    };

    const handleAddToSongs = () => {
        setSongs(e => e = [...e, props.id]);
        setCurrentSong(props.id);
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