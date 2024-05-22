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
import bigEdit from '../../Images/account-page/edit-big.svg';

import './InstallVerticalVideo.css';
import CustomButton from '../../Components/CustomButton/CustomButton';

function InstallVerticalVideo(){
    const vertskinSetterRef = useRef(null);
    const [vertskinfile, setVertSkinfile] = useState(undefined);
    const [currentVertSkin, setCurrentVertSkin] = useState(VideoPrewiew);

    const handleVertSkinInput = () => {
        vertskinSetterRef.current.click();
    }

    const changeSkin = (event) => {
        // смена обложки
        event.preventDefault();
        setVertSkinfile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            setCurrentVertSkin(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <section className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='video-information-1'>
                    <div className='videovert-skin-wrapper' onClick={handleVertSkinInput}>
                        <div className='videovert-skin-change'><img draggable='false' src={bigEdit}/></div>
                        <img draggable='false' className='vertvideo-prewiew' alt='video prewiew' src={currentVertSkin}/> 
                    </div>
                    <span className='song-info'>
                        <h1 className='newtrack-h1'>Новый клип</h1>
                        {/* {songfile ? <button className='close-button' onClick={() => setSongfile(undefined)}><img src={closeImg}/></button> : <></>} */}
                        <div className='uploadtrack-div'>
                                <div className='div-track'> 
                                    <div className='uploadtrack-div-inf'>
                                        <p className='uploadtrack-p1'>Перетащите свое видео сюда</p>
                                        <p className='uploadtrack-p2'>.mp3 или .wav, макс. 100мб</p>
                                    </div>
                                    <p className='or'>или</p>
                                    <CustomButton text={'Выберите файл'} func={() => {return}} success={'Изменить'}/>
                                </div>
                        </div>
                    </span>
                    {/* <div className='video-inf-in'>
                        <h1 className='newмvertvideo-h1'>Новое видео в блоге</h1>
                        <div className='div-track'> 
                            <div className='uploadtrack-div-inf'>
                                <p className='uploadtrack-p1'>Перетащите свой трек сюда</p>
                                <p className='uploadtrack-p2'>.mp3 или .wav, макс.100мб</p>
                            </div>
                            <p className='or'>или</p>
                            <CustomButton text={'Выберите файл'} func={() => {return}} success={'Изменить'}/>
                        </div>
                        <div className='uploadvertvideo-div'>
                            <div className='uploadvideo-div-inf'>
                                <p className='uploadvideo-p1'>Перетащите видео в это поле</p>
                                <p className='uploadvideo-p2'>.mp3 или .wav, макс.100 гб</p>
                            </div>
                            <p className='or2'>или</p>
                            <div className='div-video'> 
                                <button className='upload-video-button'><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={25} /> Выберите файл</button>
                            </div>
                        </div>
                    </div> */}
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
                    <input type='file' accept="image/*" className='input-file' ref={vertskinSetterRef} onChange={changeSkin}></input>
                </div>
            </div>  
        </section>
    )
}


export default InstallVerticalVideo;