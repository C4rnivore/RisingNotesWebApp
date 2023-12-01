import React from 'react';
import SongCover from '../../Images/image-placeholder/song-placeholder.png';
import applicationID from '../../Images/admin-circle.svg';
import pencil from '../../Images/pencil.svg';


export default function RequestSong () {
    return (
        <>
            <div className='track'>
                <img alt='cover'/>
                <p className='song-title'>Deconstructive Achievements<p className='songAuthor'>Francis Owens feat.ZIA</p></p>
                <p className='song-genre'>Джаз</p>
                <p className='admin-circle'><img alt='application ID' src={applicationID}/></p>
                <p className='admin-application'>Заявка на модерацию</p>
                <p className='pencil-for-admin'><img alt='pencil' src={pencil}/></p>
            </div>
        </>
    )
}