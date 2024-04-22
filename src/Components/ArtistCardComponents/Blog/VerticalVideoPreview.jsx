import { useEffect, useState } from 'react';
import placeholder from '../../../Images/main-placeholder.png';

function VerticalVideoPreview(params) {
    const [verifiedText, setText] = useState('Описание вертикального видео, которое уходит в троеточие');
    
    useEffect(() => {
        if (verifiedText.length > 45) {
            let text = verifiedText.slice(0, 45) + '...'
            setText(text);
        }
    }, []);

    return(
        <a className='vertical-video-preview' href={'/verticalvideo'}>
            <img alt='preview' src={placeholder}/>
            <p>{verifiedText}</p>
        </a>
    )
}

export default VerticalVideoPreview;