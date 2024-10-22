import React, { useEffect, useState} from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import { api, axiosAuthorized, axiosUnauthorized} from '../../Components/App/App';
import { useCookies } from 'react-cookie';

import { useSelector, useDispatch } from 'react-redux'
import { updatePlaylistsValue } from '../../Redux/slices/playlistsSlice';

import './Featured.css';
import Loader from '../../Components/Loader/Loader';

export default function Featured() {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()

    const playlists = useSelector((state) => state.playlists.value)
    const featured = useSelector((state) => state.featured.value)

    useEffect(() => {
        if (!cookies.role) {
            navigate("/login");
        }
        getSongs();
    }, []);

    async function getSongs() {
        let array = [];
        for (var id of featured) {
            await axiosUnauthorized.get(api + `api/song/${id}`)
            .then(response => {
                array.push(response.data);
            })
            .catch(err => {console.log(err)});
        }
        setSongs(array);
        setIsLoaded(true);
    }

    async function addNewPlaylist() {
        let id = 0
        let formData = new FormData();
        formData.append('Name', 'Новый плейлист')
        await axiosAuthorized.post(api + 'api/playlist', formData, { headers: {
            "Content-Type": "multipart/form-data",
        }})
        .then (
            response => {
                id = response.data.id
                dispatch(updatePlaylistsValue([...playlists, id]) )
            }
        )
        navigate(`/playlist/${id}`)
    };

    

    if (!isLoaded) {
        return(
            <div className='comment-page-wrapper'>
                <div className='featured'>
                    <BackButton/>
                    <Loader/>
                </div>
            </div>
        )
    }
    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='search-element'>
                    <h2 className='sub-h2'>Плейлисты</h2>
                </div>
                <div className='subscriptions'>
                    {playlists?.map(el => (
                        <Playlist key={el} id={el}/>
                    ))}
                    <div draggable='false' className='playlist'>
                        <img draggable='false' className='new-playlist' alt='add new playlist' src={newPlaylist} onClick={addNewPlaylist}/>
                        {/* <img draggable='false' className='playlistskin' alt='cover' src={isreviewSkin ? api + `api/playlist/${props.id}/logo?width=400&height=400` : SongCover}/> */}
                    </div>
                    
                </div>
                <h3 className='sub-h2'>Избранные треки</h3>
                <div className='tracks'>
                    {songs.map(el => (
                        <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={el.authorName} genres={el.genreList}/>
                    ))}
                    {songs.length === 0 ? <p style={{color: '#FE1170'}}>Список пуст</p> : <></>}
                </div>
            </div>
        </div>
    )
}