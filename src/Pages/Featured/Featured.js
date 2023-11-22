import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import menu from '../../Images/controller/menu.svg';
import Sidebar from '../../Components/Sidebar/Sidebar';
import searchIcon from '../../Images/player/search-ico.svg';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import edit from '../../Images/controller/edit-2.svg';
import Chevron from '../../Images/controller/chevron-left.svg';
import del from '../../Images/controller/x.svg';
import PlaylistWindow from '../../Components/PlaylistWindow/PlaylistWindow';

class Featured extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Плейлисты</h2>
                    </div>
                    <div className='playlists'>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <img className='new-playlist' alt='add new playlist' src={newPlaylist}/>
                    </div>
                    <h3 className='sub-h2'>Все треки</h3>
                    <div className='tracks'>
                        <Song id={1}/>
                        <Song id={2}/>
                        <Song id={3}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Featured