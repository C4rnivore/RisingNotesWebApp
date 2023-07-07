import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../Images/controller/chevron-left.svg';

class BackButton extends React.Component {
    render() {
        return (
            <button className='back-button'><img alt='back' src={Chevron}/>Назад</button>
        )
    }
}

export default BackButton