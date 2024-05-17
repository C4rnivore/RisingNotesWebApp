import './Clip.css';
import viewsIcon from '../../Images/account-page/stats-icon.svg';
import editIcon from '../../Images/account-page/edit-icon.svg';

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

function Clip({key, cover, duration, name, authorName, status, views, isArtist=false}) {
    const stockCover='https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg'

    return ( 
        <div key={key} className="clip-wrapper">
            <div className="cover-wrapper">
                <img draggable='false' className="clip-cover" src={cover ? cover : stockCover}/>
                <span className="clip-duration">{duration}</span>
            </div>

            <div className="clip-song"> 
                <div className="song-img-placeholder"></div>
                <div className="song-info-wrapper">
                    <span className="clip-song-name">{name}</span>
                    <span className="clip-song-author">{authorName}</span>
                </div>
            </div>

            {isArtist ? (
                <div className='clip-artist-info'>
                    <p className='clip-views'><img src={viewsIcon}/>{views}</p>
                    <p className='song-status'>
                        <div className={'song-status-dot ' + statusColor[status]}></div>
                        {statusType[status]}
                    </p>
                    <a href={`/uploadvideo`}><img alt='list' src={editIcon} /></a>
                </div>
            ) : (<></>)}
        </div>
    );
}
export default Clip;