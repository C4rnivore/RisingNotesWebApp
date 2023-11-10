import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../Images/image-placeholder/user_logo_small_placeholder.png';
import axios from 'axios';

import { api } from './App/App';
import { token } from './App/App';

const Comment = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [comment, setComment] = useState(props.data.text);

    const handleDeleteComment = () => {
        axios.delete(api + `api/song/comment/${props.data.id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        setIsDeleted(true);
    }

    const handleSendComment = () => {
        axios.post(api + `api/song/${props.songId}/comment`, {text: comment}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                setIsDeleted(false);
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    return (
        <div className='comment'>
            <img alt='avatar' src={avatar}/>
            <span className='comm-text-area'>
                <h2>{props.data.authorDisplayedName}</h2>
                <button className='' onClick={isDeleted ? handleSendComment : handleDeleteComment}>{isDeleted ? 'Восстановить' : 'Удалить'}</button>
                <text>{comment}</text>
            </span>
        </div>
    )
}

export default Comment