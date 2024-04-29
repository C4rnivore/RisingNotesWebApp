import React from 'react';
import BackButton from '../../Components/BackButton';
import VideoPrewiew from '../../Images/installvideo/vertvideo.svg';
import PlaylistInstallSkin from '../../Images/main-placeholder.png';
// import InstallMusicFilterComponent from '../../Pages/InstallMusicNewDesign/InstallMusicFilterComponent.jsx'
import { useState, useEffect, useRef } from 'react'
// import InstallMusicText from '../../Pages/InstallMusicNewDesign/InstallMusicText.jsx';
import { BsCloudArrowUp } from "react-icons/bs";
import { axiosAuthorized } from '../../Components/App/App';
import { api } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import './InstallVerticalVideo.css';

function InstallVerticalVideo(){
    return (
        <section className='comment-page-wrapper'>
            <div className='feautured'>
                <BackButton/>
                <div className='video-information-1'>
                    <div className='video-skin2'>
                        <img className='vertvideo-prewiew' alt='videoprewiew' src={VideoPrewiew}/> 
                    </div>
                    <div className='video-inf-in'>
                        <h1 className='newмvertvideo-h1'>Новое видео в блоге</h1>
                        <div className='uploadvideo-div'>
                            <div className='uploadvideo-div-inf'>
                                <p className='uploadvideo-p1'>Перетащите видео в это поле</p>
                                <p className='uploadvideo-p2'>.mp3 или .wav, макс.100 гб</p>
                            </div>
                            <p className='or2'>или</p>
                            <div className='div-video'> 
                                <button className='upload-video-button'><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={25} /> Выберите файл</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video-information-2'>
                    <div className='column1-2'>
                        <h2 className='uploadvideo-h2'>Описание*</h2>
                        <input id='myinput' className='inp-column1' placeholder={'Введите описание...'}/>
                        <h2 className='uploadvideo-h2'>Выберите связанный трек</h2>
                        <select className='choose-track-for-video'>
                            <option>-</option>
                        </select>  
                    </div> 
                </div>
                <div className='video-information-3' >
                    <button className='publication-video-button'><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Опубликовать*</button>
                    <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                </div>
            </div>  
        </section>
    )
}


export default InstallVerticalVideo;