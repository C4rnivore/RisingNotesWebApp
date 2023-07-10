import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';

class Playlist extends React.Component {
    render() {
        return (
            <div className='playlist'>
                <img alt='cover' src={SongCover}/>
                <p>Лучшие треки в моей жизни</p>
            </div>
        )
    }
}

export default Playlist