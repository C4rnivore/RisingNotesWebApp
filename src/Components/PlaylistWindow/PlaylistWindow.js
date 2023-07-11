import React from 'react';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import edit from '../../Images/controller/edit-2.svg';
import Chevron from '../../Images/controller/chevron-left.svg';
import del from '../../Images/controller/x.svg';
import Song from '../Song';
import PlaylistSong from '../PlaylistSong';

class PlaylistWindow extends React.Component {
    render() {
        return (
            <div className='playlist-window'>
                <button className='back-button'><img alt='back' src={Chevron}/>Назад</button>
                <div className='playlist-head'>
                    <img alt='playlist cover' className='playlist-cover' src={cover}/>
                    <h2>Лучшие треки в моей жизни</h2>
                    <a><img alt='edit' src={edit}/></a>
                </div>

                <div className='tracks'>
                    <PlaylistSong/>
                    <PlaylistSong/>
                    <PlaylistSong/>
                </div>

                <a className='delete-playlist'>
                    <img alt='delete' src={del}/>
                    <p>Удалить плейлист</p>
                </a>
            </div>
        )
    }
}

export default PlaylistWindow