import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/new-playlist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import searchIcon from '../../Images/player/search-ico.svg'

class Featured extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Плейлисты</h2>
                        <form className="searchbar-form page-search" action="#" method="post">
                            <input className="search-input" type="text" placeholder="Поиск музыканта" />
                        </form>
                    </div>
                    <div className='playlists'>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                        <img className='new-playlist' alt='add new playlist' src={newPlaylist}/>
                    </div>

                    <h2>Все треки</h2>
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