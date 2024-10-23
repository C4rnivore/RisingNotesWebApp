import BackButton from '../../Components/BackButton';
import Comment from '../../Components/Comment';
import { ResizeContext, VideoPlayerContext, api, axiosPictures } from '../../Components/App/App';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';
import commentsIcon from '../../Images/controller/message.svg';
import sendIcon from '../../Images/controller/sendIcon.svg';
import burgerIcon from '../../Images/controller/menu.svg';
import playIcon from '../../Images/player/PlayBtn.svg';

import './Commentaries.css';
import CustomButton from '../../Components/CustomButton/CustomButton';

const Commentaries = (props) => {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [songName, setSongName] = useState('');
    const [songAuthor, setSongAuthor] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genres, setGenres] = useState([]);
    const [clipId, setClipId] = useState(undefined);

    const [currPage, setCurrPage] = useState(0);
    const [songText, setText] = useState('');
    const {resize, setResize} = useContext(ResizeContext);
    const {setVideo } = useContext(VideoPlayerContext);

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
                setText(response.data.lyrics ? response.data.lyrics : 'Мы не знаем текст этой песни :(');
                axiosUnauthorized.get(`api/author/${response.data.authorId}`)
                    .then(resp => {
                        setSongAuthor(resp.data.name);
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
        
        axiosUnauthorized.get(`api/song/${params.id}`)
            .then(response => {
                setAuthorId(response.data.authorId);
            });

        axiosPictures.get(api + 'api/music-clip/by-song/' + params.id)
            .then(response => {
                setClipId(response?.data.clipId);
            })
            .catch(err => {
                setClipId(undefined);
            })
    }, [isDataUpdated, params.id]);

    const handleSendComment = () => {
        if (comment !== '') {
            axiosAuthorized.post(`api/song/${params.id}/comment`, {text: comment})
            .then(response => {
                setIsDataUpdated(!isDataUpdated);
                setComment('');
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            return Promise.reject(Error);
        }
    };

    const handleChangePage = (id) => {
        // смена страницы в лк
        setCurrPage(id);
    };

    const bgLoaded = () =>{
        const img = document.querySelector('.player-bg-image')
        img.classList.add('bg-loaded')
    }

    return (
        <div className='comment-page-wrapper'>
            <div className='comment-page'>
                <BackButton/>

                <div className='comm-head'>
                    <img alt='cover' src={(api + `api/song/${params.id}/logo?width=500&height=500`)} draggable='false'/>
                    <span className='comm-page-text'>
                        <h2 className='comm-page-h2'>{songName}</h2>
                        <Link to={`/artist/${authorId}`} className='comm-page-author'>{songAuthor}</Link>
                        <div className='comm-head-buttons'>
                            {genres.map(el => <span key={el} className='song-tag'>{el}</span>)}
                        </div>
                        {clipId && resize === 'mobile' ? (
                            <CustomButton text={'Смотреть клип'} icon={playIcon} func={() => setVideo(api + `api/music-clip/${clipId}/file`)} success={'Смотреть клип'}/>
                        ) : 
                        (<></>)}
                    </span>
                    {clipId && resize === 'standart' ? (
                        <div className='comm-head-button'>
                            <CustomButton text={'Смотреть клип'} icon={playIcon} func={() => setVideo(api + `api/music-clip/${clipId}/file`)} success={'Смотреть клип'}/>
                        </div>
                    ) : 
                    (<></>)}
                    
                </div>

                <div className="artist-card-menu">
                    <a onClick={() => handleChangePage(0)} 
                        className={currPage === 0 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                        <img src={commentsIcon}/>
                        Обсуждение
                    </a>
                    <a onClick={() => handleChangePage(1)} 
                        className={currPage === 1 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                        <img src={burgerIcon}/>
                        Текст
                    </a>
                </div>

                {currPage === 0 ? (
                    <>
                        <div className='comment-input-wrapper'>
                            <textarea placeholder='Введите текст комментария здесь...' className='comment-input' 
                                onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                                {resize === 'mobile' ? <button className='comment-btn-offset' onClick={handleSendComment}><img src={sendIcon}/></button> : <></>}
                                {resize === 'standart' ? <CustomButton text={'Отправить'} func={handleSendComment} icon={sendIcon} errorText='Ошибка' success={'Отправить'}/> : <></>}
                        </div>
                        {comments.map(e => (<div key={e.id} className='comment-wrapper'><Comment data={e} songId={params.id} setIsDataUpdated={setIsDataUpdated} isDataUpdated={isDataUpdated}/></div>))}
                    </>
                ) : 
                (<></>)}
                
                {currPage === 1 ? (<text className='song-text' style={{whiteSpace: "pre-line"}}>{songText}</text>
                ) :
                (<></>)}
                
            </div>
            <img className="player-bg-image" onLoad={bgLoaded} src={(api + `api/song/${params.id}/logo?width=500&height=500`)} alt="" />
        </div>
    );
}

export default Commentaries;