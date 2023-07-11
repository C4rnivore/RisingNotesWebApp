import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/new-playlist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import SongCover from '../../Images/image-placeholder/song-cover-placeholder.png'
import alert from '../../Images/controller/alert-octagon.svg'
import heart from '../../Images/controller/heart.svg'
import dislike from '../../Images/controller/thumbs-down.svg'
import avatar from '../../Images/image-placeholder/song-cover-default.png'
import Comment from '../../Components/Comment';

class Commentaries extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>

                    <div className='comm-head'>
                        <img alt='cover' src={SongCover}/>
                        <span>
                            <span className='comm-head-name'>
                                <h2>Francis Owens</h2>
                                <p>&nbsp;- Deconstructive Achievements</p>
                            </span>
                            <p className='listeners'>200 прослушиваний/месяц</p>
                            <div className='comm-head-buttons'>
                                <a><img alt='give a strike' src={alert}/></a>
                                <a><img alt='dislike' src={dislike}/></a>
                                <a><img alt='like' src={heart}/></a>
                            </div>
                        </span>
                    </div>

                    <h2>Комментарии</h2>

                    <div className='comment'>
                        <img alt='avatar' src={avatar}/>
                        <span className='comment-text'>
                            <h2>Иванов Иван</h2>
                            <textarea placeholder='Начните писать, что думаете...'>
                            </textarea>
                            <button className='comment-button-b'>Комментировать</button>
                        </span>
                    </div>

                    <div className='stripe'></div>

                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>
            </div>
        )
    }
}

export default Commentaries