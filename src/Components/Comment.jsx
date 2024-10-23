import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../Images/image-placeholder/user_logo_small_placeholder.png';
import { useCookies, withCookies } from 'react-cookie';
import trashIcon from '../Images/commentaries/trash-icon.svg';
import trashRedIcon from '../Images/commentaries/trash-red-icon.svg';
import xIcon from '../Images/commentaries/x-icon.svg';

import { ResizeContext, api, axiosPictures, axiosUnauthorized } from './App/App';
import { axiosAuthorized } from './App/App';

const Comment = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [comment, setComment] = useState(props.data.text);
    const [cookies, setCookies] = useCookies(['userId']);
    const {resize, setResize} = useContext(ResizeContext);
    const [avatar, setAvatar] = useState(placeholder);

    useEffect(() => {
        axiosPictures.get(api + 'api/user/' + props.data.authorId + '/logo?width=400&height=400').then(response => {
            setAvatar(api + 'api/user/' + props.data.authorId + '/logo?width=400&height=400');
        })
        .catch(err => {
            console.log(err);
        })
    }, [props]);

    const handleDeleteComment = () => {
        axiosAuthorized.delete(`api/song/comment/${props.data.id}`);
        setIsDeleted(true);
    }

    const handleSendComment = () => {
        axiosAuthorized.post(`api/song/${props.songId}/comment`, {text: comment})
            .then(response => {
                setIsDeleted(false);
                props.setIsDataUpdated(!props.isDataUpdated);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    return (
        <>
            <div className='comment'>
                <img alt='avatar' src={avatar}/>
                <span className='comm-text-area'>
                    {isDeleted ? (
                    <div className='comment-deleted'>
                        <p><img alt='icon' src={trashRedIcon}/>Комментарий удален</p>
                        <button className='comment-restore-button' onClick={handleSendComment}>
                            <img alt='delete' src={xIcon}/>
                            {'Отменить'}
                        </button>
                    </div>
                    ) : (<></>)}
                    <h2>{props.data.authorDisplayedName}</h2> 
                    <text>{comment}</text>
                </span>
            </div>
            {cookies.userId === props.data.authorId && !isDeleted ? (
                <button className='comment-del-button' onClick={handleDeleteComment}>
                    <img alt='delete' src={trashIcon}/>
                    {resize === 'standart' ? 'Удалить' : ''}
                </button>
            ) : (<></>)}
        </>
        
    )
}

export default Comment