import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';

class Subscription extends React.Component {
    render() {
        return (
            <Link to='/artist'>
                <div className='subscription'>
                    <img alt='cover' src={SongCover}/>
                    <p>Francis Owens</p>
                </div>
            </Link>
        )
    }
}

export default Subscription