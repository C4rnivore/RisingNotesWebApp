import React, { useContext } from 'react';
import BackButton from '../../Components/BackButton';
import VideoPrewiew from '../../Images/installvideo/videoprewiew.svg';
import { useState, useRef } from 'react'
import { BsCloudArrowUp } from "react-icons/bs";
import { VideoPlayerContext, api, axiosAuthorized } from '../../Components/App/App';
import bigEdit from '../../Images/account-page/edit-big.svg';
import closeImg from '../../Images/x.svg';
import uploadImg from '../../Images/upload.svg';
import playImg from '../../Images/play.svg';
import pauseImg from '../../Images/Pause.svg';


import './UploadVideo.css';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useDropzone } from 'react-dropzone';
import InputSongs from './InputSongs';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../../Components/VideoPLayer/VideoPlayer';

function UploadVideo(){
    const {video, setVideo} = useContext(VideoPlayerContext);
    const navigate = useNavigate();
    const skinSetterRef = useRef(null);
    const [skinfile, setSkinfile] = useState(undefined);
    const [currentSkin, setCurrentSkin] = useState(VideoPrewiew);
    const [videoFile, setVideofile] = useState(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef();
    const [videoFileName, setVideoFileName] = useState(null);
    const videoSetterRef = useRef(null);
    const [description, setDescription] = useState(undefined);
    const [songId, setSongId] = useState([]);
    const [title, setTitle] = useState([]);
    const formData= new FormData();
    

    function handleChoosenSong(id, title) {
        setTitle(title);
        setSongId(id);
    }

    async function uploadVideo() {
        
        formData.append('Title', title);
        console.log(title)
        formData.append('Description', description);
        console.log(description)
        formData.append('SongId', songId);
        console.log(songId)
        formData.append('PreviewFile.File', skinfile);
        console.log(skinfile)
        formData.append('ClipFile.File', videoFile);
        console.log(videoFile)
        console.log(formData);

        await axiosAuthorized.post('api/music-clip', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {navigate('/account')})
        .catch(err => {return Promise.reject(err)});
        
    }

    function handlePlayVideo() {
        // плеер видео
        setVideo(videoFile);
        // if (isPlaying) {
        //     videoRef.current.pause();
        //     setIsPlaying(false);
        // }
        // else if (typeof videoFile === "string" && videoFile.includes('api/music-clip')) {
        //     setIsPlaying(true);
        //     videoRef.current.src = videoFile;
        //     videoRef.current.play();
        // }
        // else {
        //     setIsPlaying(true);
        //     const url = URL.createObjectURL(videoFile);
        //     videoRef.current.src = url;
        //     videoRef.current.play();
        // }
    }

    const changeVideo = (event) => {
        // смена клипа
        event.preventDefault();
        setVideoFileName(event.target.files[0].name);
        setVideofile(event.target.files[0]);
    }


    const handleSkinInput = () => {
        skinSetterRef.current.click();
    }

    const { getRootProps: getInputFile } = useDropzone({
        // обработка файла закинутого drag & drop
        accept: ".mp4,.mkv,.avi,.mov",
        onDrop: acceptedFiles => {
            setVideoFileName(acceptedFiles[0].name);
            setVideofile(acceptedFiles[0]);
        },
    });   

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
                        {videoFile ? <button className='close-button' onClick={() => setVideofile(undefined)}><img src={closeImg}/></button> : <></>}
                        <div className={videoFile ? 'uploadtrack-div red-border' : 'uploadtrack-div'}>
                            {videoFile ? (
                                <div className='div-track'>
                                <button className='play-button' onClick={handlePlayVideo}><img src={isPlaying ? pauseImg : playImg}/></button>
                                {videoFileName && <p className='name-new-song'>{`${videoFileName}`}</p>}
                            </div>
                            ) : (
                                <div className='div-track' {...getInputFile()}> 
                                    <div className='uploadtrack-div-inf'>
                                        <p className='uploadtrack-p1'>Перетащите свой клип сюда</p>
                                        <p className='uploadtrack-p2'>.mp4 или .mkv, макс. 200мб</p>
                                    </div>
                                    <p className='or'>или</p>
                                    <CustomButton text={'Выберите файл'} func={() => {return}} success={'Изменить'} icon={uploadImg}/>
                                </div>
                            )}
                        </div>
                    </span>
                </div>
                <div className='video-information-2'>
                    <div className='column1-2'>
                        <h2 className='uploadvideo-h2'>Выберите связанный трек</h2>
                        <InputSongs placeholder={"Выберите связанный трек..."} setSong={handleChoosenSong}/>
                    </div> 
                    <div className='column1-2'>
                        <h2 className='uploadvideo-h2'>Описание</h2>
                        <textarea className="input-installvideo" placeholder={'Введите описание...'} value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className='video-information-3' >
                    <CustomButton text={'Опубликовать*'} func={() => uploadVideo()} success={'Опубликовано'} icon={uploadImg}/>
                    <text className='warning-upload'>*перед публикацией видео будет отправлено на модерацию</text>

                    <input type='file' accept=".jpg,.png" className='input-file' ref={skinSetterRef} onChange={changeSkin}></input>
                    <input type='file' accept=".mp4,.avi,.mkv,.mov" className='input-file' ref={videoSetterRef} onChange={changeVideo}></input>
                </div>
            </div>  
        </section>
    )
}


export default UploadVideo;