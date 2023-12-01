import React from 'react';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import PlaylistCover from '../../Images/PlaylistWindowPhoto.png';
import edit from '../../Images/controller/edit-2.svg';
import Chevron from '../../Images/controller/chevron-left.svg';
import del from '../../Images/controller/x.svg';
import Song from '../../Components/Song';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import pencil from '../../Images/pencil.svg';




class PlaylistWindow extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <div className='featured'>
                    <BackButton/>
                    <div className='playlist-information'>
                        <img className='playlistskin' alt='playlist cover' src={PlaylistCover}/>
                        <p className='playlistname'>Подборка trash metall 🤘</p>
                        <p className='rename-playlist'><img className='pencil-icon' alt='pencil' src={pencil}/> Переименовать</p>
                    </div>
                    <div className='tracks'>
                        <Song id={1}/>
                        <Song id={2}/>
                        <Song id={3}/>
                        <Song id={4}/>
                        <Song id={5}/>
                        <Song id={6}/>
                    </div>
                </div>
                <img className="player-bg-image" src={PlaylistCover} alt="" />
            </div>
        )
    }
}

export default PlaylistWindow