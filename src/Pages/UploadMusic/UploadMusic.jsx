import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/main-placeholder.png';
import InputWithTags from './InputWithTags';
import { useState, useEffect, useRef } from 'react'
import InstallMusicText from './InstallMusicText';
import { api, axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import bigEdit from '../../Images/account-page/edit-big.svg';
import uploadImg from '../../Images/upload.svg';
import { useDropzone } from 'react-dropzone';
import playImg from '../../Images/play.svg';
import pauseImg from '../../Images/Pause.svg';
import closeImg from '../../Images/x.svg';
import trashImg from '../../Images/trash.svg';

import './UploadMusic.css';
import CustomButton from '../../Components/CustomButton/CustomButton';

function UploadMusic(){
    const navigate = useNavigate()
    const params = useParams();
    const imageSetterRef = useRef(null);
    const songSetterRef = useRef(null);
    const [name, setName] = useState(undefined);
    const [lyrics, setLyrics] = useState('');
    const [instrumental, setInstrumental] = useState(true);
    const [genre, setGenre] = useState([]);
    const [vibe, setVibe] = useState([]);
    const [language, setLanguage] = useState([]);
    const [gender, setGender] = useState([0]);
    const [songfile, setSongfile] = useState(undefined);
    const [logofile, setLogofile] = useState(undefined);
    const [curVibe, setCurvibe] = useState('');
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [currentImage, setCurrentImage] = useState(PlaylistInstallSkin);
    const [songFileName, setSongFileName] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [role, setRole] = useState('');
    const [comment, setComment] = useState('');
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);

    const [genreList, setGenreList] = useState([]);
    const [vibeList, setVibeList] = useState([]);
    const [languageList, setLanguageList] = useState([]);
    const [title, setTitle] = useState('Новый трек');

    const formData = new FormData();

    async function uploadToModeration() {
        // Отправка на модерацию
        formData.append('Name', name)
        formData.append('Lyrics', lyrics)
        formData.append('Instrumental', lyrics ? lyrics.length > 0 : false)
        vibe.forEach((item, index) => {
            formData.append(`VibeList[${index}]`, item);
        });
        language.forEach((item, index) => {
            formData.append(`LanguageList[${index}]`, item);
        });
        genre.forEach((item, index) => {
            formData.append(`GenreList[${index}]`, item);
        });
        formData.append('VocalGenderList', gender)

        if (!(role === "authoredit" && typeof songfile === 'string')) {
            formData.append('SongFile.File', songfile)
        }

        formData.append('LogoFile.File', logofile)

        if (role === 'author') {
            // новая песня
            await axiosAuthorized.post(`/api/song/upload-request`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {navigate('/account')})
            .catch(err => {return Promise.reject(err)});
        }
        else if (role === 'authoredit') {
            // редактирование песни
            await axiosAuthorized.patch(`/api/song/upload-request/${params.id}/author`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {navigate('/account')})
            .catch(err => {return Promise.reject(err)});
        }
    }

    const handleImageInput = () => {
        imageSetterRef.current.click();
    }

    const handleSongInput = () => {
        songSetterRef.current.click();
    }

    const changeLogo = (event) => {
        // смена картинки
        event.preventDefault();
        setLogofile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            setCurrentImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    const changeSong = (event) => {
        // смена песни
        event.preventDefault();
        setSongFileName(event.target.files[0].name);
        setSongfile(event.target.files[0]);
    }

    useEffect(() => {
        redirect();
        LoadAllInfo();
    }, []);

    async function LoadAllInfo() {
        if (params?.id)
            await getInfo();

        await getGenreList();
        await getLanguageList();
        await getVibeList();
        setIsLoaded(true)
    }

    const acceptSong = () => {
        // Одобрение заявки
        axiosAuthorized.patch(`/api/song/upload-request/${params.id}/admin`, {
            status: 3, 
            comment: comment
        })
        .then( response => {navigate(-1)})
        .catch(err => console.log(err));
        
    }

    const declineSong = () => {
        // Отклонение заявки
        axiosAuthorized.patch(`/api/song/upload-request/${params.id}/admin`, {
            status: 4, 
            comment: comment
        })
        .then( response => {navigate(-1)})
        .catch(err => console.log(err));
    }

    const deleteSong = () => {
        // Удаление песни
        axiosAuthorized.patch(`/api/song/upload-request/${params.id}/admin`, {
            status: 5, 
            comment: comment
        })
        .then( response => {navigate(-1)})
        .catch(err => console.log(err));
    }

    async function getGenreList() {
        // Получение списка жанров
        try {
            let response = await axiosUnauthorized.get('api/common-data/genre/list');
            setGenreList(response.data.genreList);
        }
        catch (err) {
            setGenreList([]);
        }
    }

    async function getLanguageList() {
        // Получение списка языков
        try {
            let response = await axiosUnauthorized.get('api/common-data/language/list');
            setLanguageList(response.data.languageList);
        }
        catch (err) {
            setLanguageList([]);
        }
    }

    async function getVibeList() {
        // Получение списка настроений
        try {
            let response = await axiosUnauthorized.get('api/common-data/vibe/list');
            setVibeList(response.data.vibeList);
        }
        catch (err) {
            setVibeList([]);
        }
    }

    function redirect() {
        // Перенаправление
        if (cookies?.role === 'author'){
            setRole('author');
        } else if(cookies?.role === 'admin') {
            setRole('admin');
            setTitle('Модерация трека');
        } else {
            navigate('/login');
        }
    }

    async function getInfo() {
        // Подгрузка информации о заявке
        await axiosAuthorized.get(`/api/song/upload-request/${params.id}`).then(response => {
            setName(response?.data?.songName);
            setLyrics(response?.data.lyrics);
            setInstrumental(response?.data.instrumental);
            setGender(response?.data.vocalGenderList[0]);
            setGenre(response?.data.genreList);
            setVibe(response?.data.vibeList);
            setLanguage(response?.data.languageList);
            setSongFileName(response?.data?.songName);
            
            if (cookies?.role !== 'admin'){
                setRole('authoredit');
                setTitle('Редактирование трека');
            }
            setComment(response?.data?.reviewerComment);
        })
        .catch(err => {console.log(err)});

        setCurrentImage(api + `api/song/upload-request/${params.id}/logo`);
        setSongfile(api + `api/song/upload-request/${params.id}/file`);
    }

    const { getRootProps: getInputFile } = useDropzone({
        // обработка файла закинутого drag & drop
        accept: ".mp3",
        onDrop: acceptedFiles => {
            setSongFileName(acceptedFiles[0].name);
            setSongfile(acceptedFiles[0]);
        },
    });   
    
    function handlePlayFile() {
        // плеер музыкального файла
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
        else if (typeof songfile === "string" && songfile.includes('api/song/upload-request')) {
            setIsPlaying(true);
            audioRef.current.src = songfile;
            audioRef.current.play();
        }
        else {
            setIsPlaying(true);
            const url = URL.createObjectURL(songfile);
            audioRef.current.src = url;
            audioRef.current.play();
        }
    }

    if (isLoaded)
    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='song-information-1'>
                    <div className='playlist-image-wrapper' onClick={handleImageInput}>
                        <div className='playlist-image-change'><img draggable='false' src={bigEdit}/></div>
                        <img draggable='false' className='playlist-image' alt='playlist cover' src={currentImage}/>
                    </div>
                    <span className='song-info'>
                        <h1 className='newtrack-h1'>{title}</h1>
                        {songfile ? <button className='close-button' onClick={() => setSongfile(undefined)}><img src={closeImg}/></button> : <></>}
                        <div className={songfile ? 'uploadtrack-div red-border' : 'uploadtrack-div'}>
                            {songfile ? (
                                <div className='div-track'>
                                    <button className='play-button' onClick={handlePlayFile}><img src={isPlaying ? pauseImg : playImg}/></button>
                                    {songFileName && <p className='name-new-song'>{`${songFileName}`}</p>}
                                </div>
                            ) : (
                                <div className='div-track' {...getInputFile()}> 
                                    <div className='uploadtrack-div-inf'>
                                        <p className='uploadtrack-p1'>Перетащите свой трек сюда</p>
                                        <p className='uploadtrack-p2'>.mp3 или .wav, макс.100мб</p>
                                    </div>
                                    <p className='or'>или</p>
                                    <CustomButton text={'Выберите файл'} func={() => {return}} success={'Изменить'} icon={uploadImg}/>
                                </div>
                            )}
                            
                        </div>
                    </span>
                </div>

                <div className='song-information-2'>
                    <div className='column'>
                        <h2 className='column1-h2'>Название трека</h2>
                        <input className='inp-column1' placeholder={'Введите название...'} value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className='column'>
                        <h2 className='column1-h2'>Настроение</h2>
                        <InputWithTags placeholder={"Введите настроение..."} list={vibe} setList={setVibe} availableOptions={vibeList}/>
                    </div>
                    <div className='column'>
                        <h2 className='column1-h2'>Жанры</h2>
                        <InputWithTags placeholder={"Введите жанр..."} list={genre} setList={setGenre} availableOptions={genreList}/>
                    </div>
                    <div className='column'>
                        <h2 className='column1-h2'>Пол исполнителя</h2>
                        <select className="filters-select" onChange={e => setGender(e.target.value)} value={gender}>
                            <option value={0}>-</option>
                            <option value={1}>Женский</option>
                            <option value={2}>Мужской</option>
                        </select>
                    </div>
                </div>

                <div className='song-information-3' >
                    <InstallMusicText lyrics={lyrics}/>
                    <div id="myDiv" className='div-text'>
                        <h2 className='column2-h2'>Язык трека</h2>
                        <InputWithTags placeholder={"Введите язык..."} list={language} setList={setLanguage} availableOptions={languageList}/>
                        <h2 className='column2-h2'>Текст</h2>
                        <textarea id='myinput' className='song-text-area' placeholder={'Введите текст...'} value={lyrics} onChange={e => setLyrics(e.target.value)}/>
                        <div className="text-checkbox">
                            <input type="checkbox" className='checkbox-button'/>
                            <label className='label-checkbox'>Ненормативная лексика</label>
                        </div>
                    </div>
                    
                    {role === 'author' ? <div>
                        <div className='button-and-text'>
                            <CustomButton text={'Опубликовать*'} func={uploadToModeration} success={'Отправлено на модерацию'} icon={uploadImg}/>
                        </div>
                            <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                    </div> : ''}

                    {role === 'admin' ? <div>
                        <div className='button-and-text'>
                            <CustomButton text={'Одобрить'} func={acceptSong} success={'Одобрено'} icon={uploadImg}/>
                            <button className='save-installmusic' onClick={declineSong}><img src={closeImg}/>Отклонить</button>
                            <button className='save-installmusic' onClick={deleteSong}><img src={trashImg}/>Удалить</button>
                        </div>
                        <h2 className='column1-h2'>Комментарий</h2>
                        <input id='myinput' value={comment} onChange={event => setComment(event.target.value)} className='inp-column1' placeholder={'Введите комментарий...'}/>
                    </div>: ''}

                    {role === 'authoredit' ? <div>
                        <div className='button-and-text'>
                            <CustomButton text={'Сохранить*'} func={uploadToModeration} success={'Сохранено'} icon={uploadImg}/>
                            <button className='save-installmusic' onClick={deleteSong}><img src={trashImg}/>Удалить</button>
                        </div>
                        <h2 className='column1-h2'>Комментарий модератора</h2>
                            {role === 'admin' ? (
                                <input id='myinput' value={comment} onChange={event => setComment(event.target.value)} className='inp-column1' placeholder={'Введите комментарий...'}/>
                            ) : (<></>)}

                            {role !== 'admin' && comment !== '' ? (
                                <>
                                    <p className='inp-column1' style={{padding: '10px 16px'}}>{comment}</p>
                                    <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                                </>
                            ) : (<></>)}
                    </div> : ''}

                    <input type='file' accept="image/*" className='input-file' ref={imageSetterRef} onChange={changeLogo}></input>
                    <input type='file' className='input-file' ref={songSetterRef} onChange={changeSong}></input>
                    <audio ref={audioRef} src={songFileName ? api + `api/song/${songFileName}/file` : ''}
                        type="audio/mpeg" controls style={{ display: 'none' }}/>
                </div>
            </div>
        </div>
        )
}


export default UploadMusic;