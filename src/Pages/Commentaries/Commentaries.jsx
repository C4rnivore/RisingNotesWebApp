import BackButton from '../../Components/BackButton';
import Comment from '../../Components/Comment';

import { api } from '../../Components/App/App';

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

import { axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';

import './Commentaries.css';

const Commentaries = (props) => {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [songName, setSongName] = useState('');
    const [songAuthor, setSongAuthor] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axiosUnauthorized.get(`api/song/${params.id}/comment/list`)
            .then(response => {
                let arr = response.data.commentList;
                arr.reverse();
                setComments(arr);
                console.log(arr);
            })
            .catch(err=>{
                console.log(err);
            });

        axiosUnauthorized.get(`api/song/${params.id}`)
            .then(response => {
                setSongName(response.data.name);
                setGenres(response.data.genreList);
                axiosUnauthorized.get(`api/author/${response.data.authorId}`)
                    .then(resp => {
                        setSongAuthor(resp.data.name);
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    })
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
        
        axiosUnauthorized.get(`api/song/${params.id}`)
            .then(response => {
                setAuthorId(response.data.authorId);
            })
    }, [isDataUpdated, params.id]);

    const handleSendComment = () => {
        axiosAuthorized.post(`api/song/${params.id}/comment`, {text: comment})
            .then(response => {
                setIsDataUpdated(!isDataUpdated);
                setComment('');
            })
            .catch(err => {
                console.log(err);
                // throw err;
            })
    }

    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>

                <div className='comm-head'>
                    <img alt='cover' src={(api + `api/song/${params.id}/logo?width=500&height=500`)}/>
                    <span>
                        <h2 className='comm-page-h2'>{songName}</h2>
                        <Link to={`/artist/${authorId}`} className='comm-page-author'>{songAuthor}</Link>
                        <div className='comm-head-buttons'>
                            {genres.map(el => <span key={el} className='song-tag'>{el}</span>)}
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

                {comments.map(e => (<div key={e.id} className='comment-wrapper'><Comment data={e} songId={params.id} setIsDataUpdated={setIsDataUpdated} isDataUpdated={isDataUpdated}/></div>))}

            </div>
        </div>
    );
}

export default Commentaries;