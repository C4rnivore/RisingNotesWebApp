import React from 'react';
import SongCover from '../../Images/Group 73.png';
import applicationID from '../../Images/admin-circle.svg';
import pencil from '../../Images/pencil.svg';
import { Link } from 'react-router-dom';

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

export default function RequestSong (props) {

    return (
        <Link to={'/uploadmusic/' + props.id}>
            <div className='track'>
                <img alt='cover' src={SongCover}/>
                <p className='song-title'>{props.id}<p className='songAuthor'>{props.authorName}</p></p>
                {/* <p className='song-genre'>Джаз</p> */}
                <p className={'song-status-dot ' + statusColor[props.status]}><img alt='application ID' src={applicationID}/></p>
                <p className='admin-application'>{statusType[props.status]}</p>
                {/* <p className='pencil-for-admin'><img alt='pencil' src={pencil}/></p> */}
            </div>
        </Link>
    )
}