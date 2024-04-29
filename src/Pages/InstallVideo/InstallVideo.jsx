import React from 'react';
import BackButton from '../../Components/BackButton';
import VideoPrewiew from '../../Images/installvideo/videoprewiew.svg';
import PlaylistInstallSkin from '../../Images/main-placeholder.png';
// import InstallMusicFilterComponent from '../../Pages/InstallMusicNewDesign/InstallMusicFilterComponent.jsx'
import { useState, useEffect, useRef } from 'react'
// import InstallMusicText from '../../Pages/InstallMusicNewDesign/InstallMusicText.jsx';
import { BsCloudArrowUp } from "react-icons/bs";
import { axiosAuthorized } from '../../Components/App/App';
import { api } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import './InstallVideo.css';

function InstallVideo(){
    return (
        <section className='comment-page-wrapper'>
            <div className='feautured'>
                <BackButton/>
                <div className='video-information-1'>
                    <div className='video-skin'>
                        <img className='video-prewiew' alt='videoprewiew' src={VideoPrewiew}/> 
                    </div>
                    <div className='video-inf-in'>
                        <h1 className='newvideo-h1'>Новое видео</h1>
                        <div className='uploadvideo-div'>
                            <div className='uploadvideo-div-inf'>
                                <p className='uploadvideo-p1'>Перетащите клип в это поле</p>
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


export default InstallVideo;