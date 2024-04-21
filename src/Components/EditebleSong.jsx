import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';
import edit from '../Images/controller/edit-2.svg';

class EditableSong extends React.Component {
    render() {
        return (
            <div className='track'>
                <img alt='cover' src={SongCover}/>
                <p className='song-title'>Francis Owens - Deconstructive Achi...</p>
                <p className='song-genre'>Джаз</p>
                <p className='song-state'>Заявка на модерацию</p>
                <a><img alt='dislike' src={edit}/></a>
            </div>
        )
    }
}

export default EditableSong