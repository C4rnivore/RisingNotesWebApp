import React from 'react';
import BackButton from '../../Components/BackButton';
import VideoPrewiew from '../../Images/installvideo/videoprewiew.svg';
// import InstallMusicFilterComponent from '../../Pages/InstallMusicNewDesign/InstallMusicFilterComponent.jsx'
import { useState, useEffect, useRef } from 'react'
// import InstallMusicText from '../../Pages/InstallMusicNewDesign/InstallMusicText.jsx';
import { BsCloudArrowUp } from "react-icons/bs";
import { axiosAuthorized } from '../../Components/App/App';
import { api } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import bigEdit from '../../Images/account-page/edit-big.svg';


import './InstallVideo.css';
import CustomButton from '../../Components/CustomButton/CustomButton';

function InstallVideo(){
    const skinSetterRef = useRef(null);
    const [skinfile, setSkinfile] = useState(undefined);
    const [currentSkin, setCurrentSkin] = useState(VideoPrewiew);

    const handleSkinInput = () => {
        skinSetterRef.current.click();
    }

    const changeSkin = (event) => {
        // смена обложки
        event.preventDefault();
        setSkinfile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            setCurrentSkin(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    return (
        <section className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='video-information-1'>
                    <div className='video-skin-wrapper' onClick={handleSkinInput}>
                        <div className='video-skin-change'><img draggable='false' src={bigEdit}/></div>
                        <img draggable='false' className='video-prewiew' alt='video prewiew' src={currentSkin}/> 
                    </div>
                    <span className='song-info'>
                        <h1 className='newtrack-h1'>Новый клип</h1>
                        {/* {songfile ? <button className='close-button' onClick={() => setSongfile(undefined)}><img src={closeImg}/></button> : <></>} */}
                        <div className='uploadtrack-div'>
                                <div className='div-track'> 
                                    <div className='uploadtrack-div-inf'>
                                        <p className='uploadtrack-p1'>Перетащите свой трек сюда</p>
                                        <p className='uploadtrack-p2'>.mp3 или .wav, макс.100мб</p>
                                    </div>
                                    <p className='or'>или</p>
                                    <CustomButton text={'Выберите файл'} func={() => {return}} success={'Изменить'}/>
                                </div>
                        </div>
                    </span>
                    {/* <div className='video-inf-in'>
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
                    </div> */}
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
                    <input type='file' accept="image/*" className='input-file' ref={skinSetterRef} onChange={changeSkin}></input>
                </div>
            </div>  
        </section>
    )
}


export default InstallVideo;