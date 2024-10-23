import React, { useContext } from 'react';
import BackButton from '../../Components/BackButton';
import VideoPrewiew from '../../Images/installvideo/vertvideo.svg';
import { useState, useEffect, useRef } from 'react'
import { VertVideoInfoContext, VertVideoPlayerContext, VideoPlayerContext, axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';
import bigEdit from '../../Images/account-page/edit-big.svg';
import closeImg from '../../Images/x.svg';
import uploadImg from '../../Images/upload.svg';
import playImg from '../../Images/play.svg';
import pauseImg from '../../Images/Pause.svg';

import './UploadVertVideo.css';
import CustomButton from '../../Components/CustomButton/CustomButton';
import InputSongs from '../UploadVideo/InputSongs';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

function InstallVerticalVideo(){
    const {vertvideo, setVertVideo} = useContext(VertVideoPlayerContext);
    const { vertVideoInfo, setVertVideoInfo } = useContext(VertVideoInfoContext);
    const vertskinSetterRef = useRef(null);
    const [vertskinfile, setVertSkinfile] = useState(undefined);
    const [currentVertSkin, setCurrentVertSkin] = useState(VideoPrewiew);
    const navigate = useNavigate();
    const [videoFile, setVideofile] = useState(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoFileName, setVideoFileName] = useState(null);
    const videoSetterRef = useRef(null);
    const [description, setDescription] = useState(undefined);
    const [songId, setSongId] = useState(undefined);
    const [title, setTitle] = useState([]);

    const [songName, setSongName] = useState('Песня не указана');
    const [authorName, setAuthorName] = useState('Автор не указан');

    const formData= new FormData();
    
    useEffect(() => {
        if (songId !== undefined) {
            axiosUnauthorized.get(`/api/song/${songId}`)
            .then(response => {
                setAuthorName(response.data.authorName);
                setSongName(response.data.name);
            });
        }
    }, [songId]);

    const handleVertSkinInput = () => {
        vertskinSetterRef.current.click();
    }

    const changeSkin = (event) => {
        // смена обложки
        event.preventDefault();
        if (event.target.files.length > 0) {
            setVertSkinfile(event.target.files[0]);
            const reader = new FileReader();
            reader.onload = (event) => {
                setCurrentVertSkin(event.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    function handleChoosenSong(id, title) {
        setTitle(title);
        setSongId(id);
    }

    async function uploadVideo() {
        // загрузка видео
        formData.append('Title', title);
        console.log(title)
        formData.append('Description', description);
        console.log(description)
        formData.append('RelatedSongId', songId);
        console.log(songId)
        formData.append('PreviewFile.File', vertskinfile);
        console.log(vertskinfile)
        formData.append('ClipFile.File', videoFile);
        console.log(videoFile)
        console.log(formData);

        await axiosAuthorized.post('api/short-video', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {navigate('/account')})
        .catch(err => {return Promise.reject(err)});
    }

    function handlePlayVideo() {
        // плеер видео
        setVertVideoInfo({
            description: description,
            title: songName,
            author: authorName,
            songId: songId
        });
        setVertVideo(videoFile);
    }

    const changeVideo = (event) => {
        // смена клипа
        event.preventDefault();
        if (event.target.files.length > 0) {
            setVideoFileName(event.target.files[0].name);
            setVideofile(event.target.files[0]);
        }
    }


    const { getRootProps: getInputFile } = useDropzone({
        // обработка файла закинутого drag & drop
        accept: {
            "video/mp4": [".mp4", ".avi"],
            "video/x-msvideo": [".mkv"],
            "video/mpeg": [".mov"]
        },
        maxSize: 200000000,
        onDrop: acceptedFiles => {
            if (acceptedFiles.length > 0) {
                setVideoFileName(acceptedFiles[0].name);
                setVideofile(acceptedFiles[0]);
            }
        },
    });   


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
                        <h1 className='newtrack-h1'>Новое видео в блог</h1>
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
                                            <p className='uploadtrack-p1'>Перетащите свое видео сюда</p>
                                            <p className='uploadtrack-p2'>.mp4 или .mkv, макс. 100ГБ</p>
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
                    <div className='button-and-text'>
                            <CustomButton text={'Опубликовать'} func={() => uploadVideo()} success={'Опубликовано'} icon={uploadImg}/>
                    </div>
                    {/* <text className='warning-upload'>*перед публикацией видео будет отправлено на модерацию</text> */}
                    <input type='file' className='input-file' ref={videoSetterRef} onChange={changeVideo}></input>
                    <input type='file' accept="image/*" className='input-file' ref={vertskinSetterRef} onChange={changeSkin}></input>
                </div>
            </div>  
        </section>
    )
}


export default InstallVerticalVideo;