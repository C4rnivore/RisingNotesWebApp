import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/new-playlist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Subscription from '../../Components/Subscription';

class Subscriptions extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Мои подписки</h2>
                        <form className="searchbar-form page-search" action="#" method="post">
                            <input className="search-input" type="text" placeholder="Поиск музыканта" />
                        </form>
                    </div>

                    <div className='subscriptions'>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                    </div>

                    <h2>Все авторы</h2>

                    <div className='subscriptions'>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Subscriptions