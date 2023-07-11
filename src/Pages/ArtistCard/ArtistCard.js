import React from 'react';
import { Link } from 'react-router-dom';
import SongCover from '../../Images/image-placeholder/song-cover-default.png';
import MusicianCover from '../../Images/user-images/musician-cover.png';
import menu from '../../Images/controller/menu.svg'
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import BackButton from '../../Components/BackButton'
import TopSong from '../../Components/TopSong';
import Sidebar from '../../Components/Sidebar/Sidebar';

class ArtistCard extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <Sidebar/>
                <div className='artistcard'>
                    <BackButton/>
                    <span className='card-head'>
                        <h1>Francis Owens</h1>
                        <button className='subcribe-button'>Подписаться</button>
                    </span>
                    <h2>Топ треков</h2>
                    <div className='artistcard-main'>
                        <div className='top-tracks'>
                            <TopSong/>
                            <TopSong/>
                            <TopSong/>
                        </div>
                        
                        <div className='artist-info'>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                                culpa qui officia deserunt mollit anim id est laborum
                            </p>

                            <div className='artist-info-second-part'>
                                <span>
                                    <h2>Ссылки на соцсети:</h2>
                                    <ul>
                                        <li><a className='link'>ВКонтакте</a></li>
                                        <li><a className='link'>Яндекс музыка</a></li>
                                        <li><a className='link'>Сайт</a></li>
                                    </ul>
                                    <h2>Подписчики:</h2>
                                    <ul>
                                        <li>200</li>
                                    </ul>
                                    <h2>Прослушиваний за месяц:</h2>
                                    <ul>
                                        <li>600</li>
                                    </ul>
                                </span>

                                <img className='artist-photo' alt='artist photo' src={MusicianCover}/>
                            </div>
                        </div>
                    </div>

                    <h2>Плейлисты</h2>
                    <div className='playlists'>
                        <Playlist/>
                        <Playlist/>
                        <Playlist/>
                    </div>

                    <h2>Все треки</h2>
                    <div className='tracks'>
                        <Song/>
                        <Song/>
                        <Song/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default ArtistCard