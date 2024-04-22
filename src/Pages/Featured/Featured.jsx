import React, { useContext, useEffect, useState} from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import { FeaturedContext, PlaylistsContext, api, axiosAuthorized, axiosUnauthorized} from '../../Components/App/App';
import { useCookies } from 'react-cookie';

import './Featured.css';

export default function Featured() {
    const navigate = useNavigate();
    const {featured, setFeatured} = useContext(FeaturedContext);
    const [songs, setSongs] = useState([]);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
    const {playlists, setPlaylists} = useContext(PlaylistsContext);

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
            });
        }
        setSongs(array);
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
                setPlaylists(e => e = [...e, id])
            }
        )
        navigate(`/playlist/${id}`)
    };

    

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
                    <img className='new-playlist' alt='add new playlist' src={newPlaylist} onClick={addNewPlaylist}/>
                </div>
                <h3 className='sub-h2'>Все треки</h3>
                <div className='tracks'>
                    {songs.map(el => (
                        <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={el.authorName} genres={el.genreList}/>
                    ))}
                </div>
            </div>
        </div>
    )
}