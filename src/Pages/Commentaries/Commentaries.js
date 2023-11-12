import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/new-playlist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import SongCover from '../../Images/image-placeholder/song-cover-placeholder.png'
import alert from '../../Images/controller/alert-octagon.svg'
import heart from '../../Images/controller/heart.svg'
import dislike from '../../Images/controller/thumbs-down.svg'
import avatar from '../../Images/image-placeholder/song-cover-default.png'
import Comment from '../../Components/Comment';

import { api } from '../../Components/App/App';
import { token } from '../../Components/App/App';

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const Commentaries = (props) => {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    useEffect(() => {
        axios.get(api + `api/song/${params.id}/comment/list`)
            .then(response => {
                let arr = response.data.commentList;
                arr.reverse();
                setComments(arr);
            })
    }, [isDataUpdated]);

    const handleSendComment = () => {
        axios.post(api + `api/song/${params.id}/comment`, {text: comment}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                setIsDataUpdated(!isDataUpdated);
                setComment('');
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    return (
        <div className='comment-page-wrapper'>
            <Sidebar/>
            <div className='featured'>
                <BackButton/>

                <div className='comm-head'>
                    <img alt='cover' src={SongCover}/>
                    <span>
                        <h2 className='comm-page-h2'>Deconstructive Achievements</h2>
                        <p className='comm-page-author'>Francis Owens</p>
                        <div className='comm-head-buttons'>
                            <span className='song-tag'>Рок</span>
                            <span className='song-tag'>Джаз</span>
                        </div>
                    </span>
                </div>

                <h3 className='comm-page-h3'>Комментарии</h3>

                <div className='comment-input-wrapper'>
                    <textarea placeholder='Введите текст комментария здесь...' className='comment-input' 
                        onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                    <button className='comment-button-b' onClick={handleSendComment}>Отправить</button>
                </div>

                <div className='stripe'></div>

                {comments.map(e => (<div key={e.id}><Comment data={e} songId={params.id}/></div>))}

            </div>
        </div>
    );
}

export default Commentaries;