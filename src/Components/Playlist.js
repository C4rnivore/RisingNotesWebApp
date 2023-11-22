import SongCover from '../Images/image-placeholder/FrOwforplaylist.png';
import React from 'react';
import { Link } from 'react-router-dom';

class Playlist extends React.Component {
    render() {
        return (
            <div className='playlist'>
                <img className='playlistskin' alt='cover' src={SongCover}/>
                <p className='labelplaylist'>Лучшие треки</p>
            </div>
        )
    }
}

export default Playlist