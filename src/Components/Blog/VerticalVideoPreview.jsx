import { useEffect, useState } from 'react';
import placeholder from '../../Images/main-placeholder.png';
import viewsIcon from '../../Images/account-page/stats-icon.svg';
import editIcon from '../../Images/account-page/edit-icon.svg';


function VerticalVideoPreview({key, cover, duration, name, authorName, views, isArtist=false}) {
    const [verifiedText, setText] = useState('Описание вертикального видео, которое уходит в троеточие');
    
    useEffect(() => {
        if (verifiedText.length > 45) {
            let text = verifiedText.slice(0, 45) + '...'
            setText(text);
        }
    }, []);

    return(
        <div className='vertical-video-preview-wrapper'>
            <a className='vertical-video-preview' href={'/verticalvideo'}>
                <img alt='preview' src={placeholder}/>
                <p>{verifiedText}</p>
            </a>

            {isArtist ? (
                <div className='clip-artist-info'>
                    <p className='clip-views'><img src={viewsIcon}/>{views}</p>
                    <a href={`/uploadvertvideo`}><img alt='list' src={editIcon} /></a>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default VerticalVideoPreview;