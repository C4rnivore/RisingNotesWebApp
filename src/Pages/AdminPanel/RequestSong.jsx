import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import editIcon from '../../Images/account-page/edit-icon.svg';
import message from '../../Images/controller/Chat_Dots.png';

const statusType = {
    0: 'Неизвестно',
    1: 'На модерации',
    2: 'На доработке',
    3: 'Опубликовано',
    4: 'Отклонено',
    5: 'Отозвано'
};

const statusColor = {
    0: 'yellow',
    1: 'yellow',
    2: 'yellow',
    3: 'green',
    4: 'red',
    5: 'red'
}

export default function RequestSong ({info}) { 
    const resize = useSelector((state)=> state.resize.value)

    return (
        <Link to={'/uploadmusic/' + info.id}>
            <div className='track'>
                <img alt='cover' src={info.logo} draggable='false'/>
                <p className='song-title-t'>{info.name}
                    <p className='songAuthor'>{info.authorName}</p>
                </p>
                {resize === 'standart' ? <p className='song-genre'>{info.genre}</p> : <></>}

                <p className='song-status'>
                    <div className={'song-status-dot ' + statusColor[info.status]}></div>
                    {statusType[info.status]}
                </p>

                <span className='track-buttons'>
                    { info.publishedId ? 
                        <Link draggable='false' to={`/commentaries/${info.publishedId}`}><img draggable='false' alt='comment' src={message}/></Link> : 
                        <Link draggable='false' to={`/`}><img alt='comment' draggable='false' src={message} style={{opacity: 0.2}}/></Link>
                    }
                    <a href={`/uploadmusic/${info.id}`}><img alt='list' src={editIcon} /></a>
                </span>
                
            </div>
        </Link>
    )
}