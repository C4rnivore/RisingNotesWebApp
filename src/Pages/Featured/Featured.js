import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import menu from '../../Images/controller/menu.svg';
import Sidebar from '../../Components/Sidebar/Sidebar';
import searchIcon from '../../Images/player/search-ico.svg';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import edit from '../../Images/controller/edit-2.svg';
import Chevron from '../../Images/controller/chevron-left.svg';
import del from '../../Images/controller/x.svg';
import { FeaturedContext, api, axiosUnauthorized } from '../../Components/App/App';


export default function Featured() {
    const {featured, setFeatured} = useContext(FeaturedContext);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
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

    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='search-element'>
                    <h2 className='sub-h2'>Плейлисты</h2>
                </div>
                <div className='subscriptions'>
                    <Playlist/>
                    <Playlist/>
                    <Playlist/>
                    <img className='new-playlist' alt='add new playlist' src={newPlaylist}/>
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