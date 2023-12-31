import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../Images/image-placeholder/song-cover-default.png'

class Comment extends React.Component {
    render() {
        return (
            <div className='comment'>
                <img alt='avatar' src={avatar}/>
                <span className='comment-text'>
                    <h2>Иванов Иван</h2>
                    <button className='delete'>Удалить</button>
                    <text placeholder='Начните писать, что думаете...'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit 
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                        mollit anim id est laborum
                    </text>
                </span>
            </div>
        )
    }
}

export default Comment