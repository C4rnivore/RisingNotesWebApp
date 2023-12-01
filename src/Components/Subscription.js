import React from 'react';
import SongCover from '../Images/image-placeholder/songskin.png';
import applicationID from '../Images/admin-circle.svg';
import pencil from '../Images/pencil.svg';



class Subscription extends React.Component {
    render() {
        return (
            <>
                <div className='track'>
                    <img alt='cover' src={SongCover}/>
                    <p className='song-title'>Deconstructive Achievements<p className='songAuthor'>Francis Owens feat.ZIA</p></p>
                    <p className='song-genre'>Джаз</p>
                    <p className='admin-circle'><img alt='application ID' src={applicationID}/></p>
                    <p className='admin-application'>Заявка на модерацию</p>
                    <p className='pencil-for-admin'><img alt='pencil' src={pencil}/></p>
                </div>
            </>
        )
    }
}

export default Subscription