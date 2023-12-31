import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';
import heart from '../Images/controller/heart.svg';
import message from '../Images/controller/message-circle.svg';
import dislike from '../Images/controller/thumbs-down.svg';
import del from '../Images/controller/x.svg';

class PlaylistSong extends React.Component {
    render() {
        return (
            <div className='track'>
                <img alt='cover' src={SongCover}/>
                <p className='song-title'>Francis Owens - Deconstructive Achi...</p>
                <p className='song-duration'>3:00</p>
                <a><img alt='delete' src={del}/></a>
                <a><img alt='dislike' src={dislike}/></a>
                <a><img alt='like' src={heart}/></a>
                <a href='/commentaries'><img alt='comment' src={message}/></a>
            </div>
        )
    }
}

export default PlaylistSong