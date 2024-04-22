import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';

class TopSong extends React.Component {
    render() {
        return (
            <div className='top-track'>
                <img alt='cover' src={SongCover}/>
                <span>
                    <p>Deconstructive Achievements</p>
                    <p>Rock, Jazz</p>
                </span>
            </div>
        )
    }
}

export default TopSong