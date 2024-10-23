import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heart from '../../Images/controller/heart.svg';
import redHeart from '../../Images/red-heart.svg';
import message from '../../Images/controller/Chat_Dots.png';
import dislike from '../../Images/controller/thumbs-down.svg';
import redDislike from '../../Images/controller/dislike-red.svg';
import list from '../../Images/list.svg'
import { CurrentSongContext, ExcludedContext, FeaturedContext, PlayerContext, PlaylistsContext, ResizeContext, api, axiosAuthorized, axiosPictures, axiosUnauthorized } from '../App/App';
import thumb from '../../Images/main-placeholder.png';
import check from '../../Images/check_big.svg';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

import './Song.css';

function Song(props) {
    const [modalIsHidden, setModalIsHidden] = useState(true);
    const [duration, setDuration] = useState(0);
    const {songs, setSongs} = useContext(PlayerContext);
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const {featured, setFeatured} = useContext(FeaturedContext);
    const {excluded, setExcluded} = useContext(ExcludedContext);
    const {cleanQuery} = useSearchClean()
    const {resize, setResize} = useContext(ResizeContext);
    const [playlistsInfo, setPlaylistsInfo] = useState([]);
    const {playlists, setPlaylists} = useContext(PlaylistsContext);

    async function changeModalState () {
        // собрать информацию по плейлистам
        if (modalIsHidden)
            await getPlaylistsInfo();
        // показать/скрыть окно с плейлистами
        setModalIsHidden(modalIsHidden => modalIsHidden = !modalIsHidden);
    }

    const formatTime = (miliseconds) => {
        // форматировать длительность песни
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
        // установить длительность песни в правильном формате
        setDuration(formatTime(props.duration))
    }, []);

    async function handleToFavorite() {
        // добавление и удаление из избранных
        if (featured.includes(props.id)) {
            await axiosAuthorized.delete(api + `api/song/favorite/${props.id}`).then(resp => {
                setFeatured(e => e = e.filter(el => el != props.id));
            });
        }
        else {
            await axiosAuthorized.patch(api + `api/song/favorite/${props.id}`).then(resp => {
                setFeatured(e => e = [...e, props.id]);
            });
        }
    };

    async function handleToExcluded() {
        // добавление и удаление из исключенных
        if (excluded.includes(props.id)) {
            await axiosAuthorized.delete(api + `api/excluded-track/${props.id}`).then(resp => {
                setExcluded(e => e = e.filter(el => el != props.id));
            });
        }
        else {
            await axiosAuthorized.post(api + `api/excluded-track/${props.id}`).then(resp => {
                setExcluded(e => e = [...e, props.id]);
            });
        }
    };

    const handleAddToSongs = () => {
        // добавить песню в конец плеера и включить ее
        setSongs(e => e = [...e, props.id]);
        setCurrentSong(props.id);
    };

    async function getPlaylistsInfo() {
        // Получить или обновить информацию о плейлистах
        try {
           let arr = await Promise.all(playlists.map(async (el) => {
                const response = await axiosAuthorized.get(`api/playlist/${el}`)
                .catch(err => console.log(err));
                let img = true;
                await axiosPictures.get(api + `api/playlist/${el}/logo?width=400&height=400`)
                .catch(err => {img = false});

                let isSongInPlaylist = false;

                await axiosUnauthorized.get(`api/playlist/` + el +`/song/list`)
                .then(resp => {
                    if (resp.data.songList.filter(el => el.id === props.id).length > 0)
                    {
                        isSongInPlaylist = true;
                    }
                })

                return {
                    name: response?.data?.name,
                    id: el,
                    img: img,
                    isSongInPlaylist: isSongInPlaylist
                };
           }));
        //    arr = arr.filter(el => el.isSongInPlaylist === false);
        //    console.log(arr);
           setPlaylistsInfo(arr);
        }
        catch (err) {
           console.log(err);
        }
    }  

    async function addToPlaylist(playlistId) {
        // Добавить в плейлист
        await axiosAuthorized.patch(api + `api/playlist/` + playlistId + '/song/' + props.id).then(response => {
            changeModalState();
        })
    }

    async function excludeFromPlaylist(playlistId) {
        await axiosAuthorized.delete(api + `api/playlist/` + playlistId + '/song/' + props.id).then(response => {
            changeModalState();
        })
    }

    async function createNewPlaylist() {
        // Создать новый плейлист и добавить в него песню
        let id = 0
        let formData = new FormData();
        formData.append('Name', props.artist + ' - ' + props.name)
        await axiosAuthorized.post(api + 'api/playlist', formData, { headers: {
            "Content-Type": "multipart/form-data",
        }})
        .then (
            response => {
                id = response.data.id
                setPlaylists(e => e = [...e, id]);
                addToPlaylist(id);
            }
        )

    }

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
                
                
            
            {!modalIsHidden ? (
                    <div className="list-modal-window">
                        <div className="song-modal">
                            <p className="song-modal__title">
                                Добавить в плейлист
                            </p>
                            <div className='song-modal__playlists'>
                                <ul>
                                    {playlistsInfo?.map(el => {
                                        return (
                                            <li className={el.isSongInPlaylist ? 'song-modal__playlist red-text' : 'song-modal__playlist'} key={el.id} onClick={
                                                el.isSongInPlaylist ? () => excludeFromPlaylist(el.id) : () => addToPlaylist(el.id)}>
                                                {el.isSongInPlaylist ? <img className='song-modal__playlist-thumb-selected' src={check} alt=""/> : <></>}
                                                <img className='song-modal__playlist-thumb'draggable='false' 
                                                    src={el.img ? api + `api/playlist/${el.id}/logo?width=400&height=400` : thumb}/>
                                                <span className='song-modal__playlist-name'>{el.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <button className='song-modal__add-button' onClick={createNewPlaylist}>
                                + Новый плейлист
                            </button>
                        </div>
                </div>
                ) : (<></>)}
            </div>
        </>
    )
}

export default Song