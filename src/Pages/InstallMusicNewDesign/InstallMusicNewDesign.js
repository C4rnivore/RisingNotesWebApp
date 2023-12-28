import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import InstallMusicFilterComponent from './InstallMusicFilterComponent';
import { useState, useEffect, useRef } from 'react'
import InstallMusicText from './InstallMusicText';
import Save from '../../Images/installmusicimages/save.svg';
import { BsCloudArrowUp } from "react-icons/bs";
import { axiosAuthorized } from '../../Components/App/App';
import { api } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


function InstallMusicNewDesign(){
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
    const [gender, setGender] = useState([]);
    const [songfile, setSongfile] = useState(undefined);
    const [logofile, setLogofile] = useState(undefined);
    const [curVibe, setCurvibe] = useState('');
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    console.log(cookies)
    const [currentImage, setCurrentImage] = useState(PlaylistInstallSkin);
    const [currentSong, setCurrentSong] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [role, setRole] = useState('');
    const [comment, setComment] = useState('');

    const formData = new FormData();

    async function uploadToModeration() {
        formData.append('Name', name)
        formData.append('Lyrics', lyrics)
        formData.append('Instrumental', false)
        vibe.forEach((item, index) => {
            formData.append(`VibeList[${index}]`, item);
        });
        // gender.forEach((item, index) => {
        //     formData.append(`VocalGenderList[${index}]`, item);
        // });
        language.forEach((item, index) => {
            formData.append(`LanguageList[${index}]`, item);
        });
        genre.forEach((item, index) => {
            formData.append(`GenreList[${index}]`, item);
        });
        // formData.append('VibeList', JSON.stringify(vibe))
        formData.append('VocalGenderList', gender)
        // formData.append('LanguageList', JSON.stringify(language))
        formData.append('SongFile.File', songfile)
        formData.append('LogoFile.File', logofile)
        // formData.append('GenreList', JSON.stringify(genre))
        for (var value of formData.values()) {
            console.log(value);
        }
        await axiosAuthorized.post(`/api/song/upload-request`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(
            response => {navigate('/account')}
        )
        .catch(
            err => {throw err}
        )
    }

    const handleImageInput = () => {
        imageSetterRef.current.click();
    }

    const handleSongInput = () => {
        songSetterRef.current.click();
    }

    const changeLogo = (event) => {
        event.preventDefault();
        setLogofile(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            setCurrentImage(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    const changeSong = (event) => {
        event.preventDefault();
        setCurrentSong(event.target.files[0].name);
        setSongfile(event.target.files[0]);
        
    }

    useEffect(() => {
        if (cookies?.role === 'author'){
            setRole('author')
        } else if(cookies?.role === 'admin') {
            setRole('admin')
        } else {
            navigate('/login')
        }
        if (params?.id) {
            axiosAuthorized.get(`/api/song/upload-request/${params.id}`).then(response => {
                setName(response.data.songName)
                setLyrics(response.data.lyrics)
                setInstrumental(response.data.instrumental)
                setGender(response.data.vocalGenderList[0])
                setGenre(response.data.genreList)
                setVibe(response.data.vibeList)
                setRole('authoredit')
                setComment('текст комментария')
                console.log(response.data)
                setIsLoaded(true)
            })
        } else {
            setIsLoaded(true)
        }
    }, []);

    const acceptSong = () => {
        axiosAuthorized.patch(`/api/song/upload-request/${params.id}/admin`, {
            status: 3, 
        }).then (
            navigate('/adminpanel')
        )
    }

    const declineSong = () => {
        axiosAuthorized.patch(`/api/song/upload-request/${params.id}/admin`, {
            status: 4, 
            comment: comment
        }).then (
            navigate('/adminpanel')
        )
    }

    async function refreshRequest() {
        formData.append('Name', name)
        formData.append('Lyrics', lyrics)
        formData.append('Instrumental', false)
        vibe.forEach((item, index) => {
            formData.append(`VibeList[${index}]`, item);
        });
        // gender.forEach((item, index) => {
        //     formData.append(`VocalGenderList[${index}]`, item);
        // });
        language.forEach((item, index) => {
            formData.append(`LanguageList[${index}]`, item);
        });
        genre.forEach((item, index) => {
            formData.append(`GenreList[${index}]`, item);
        });
        // formData.append('VibeList', JSON.stringify(vibe))
        formData.append('VocalGenderList', gender)
        // formData.append('LanguageList', JSON.stringify(language))
        // formData.append('SongFile.File', songfile)
        // formData.append('LogoFile.File', logofile)
        // formData.append('GenreList', JSON.stringify(genre))
        for (var value of formData.values()) {
            console.log(value);
        }
        await axiosAuthorized.patch(`/api/song/upload-request/${params.id}/author`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(
            response => {navigate('/account')}
        )
        .catch(
            err => {throw err}
        )
    }


    
    if (isLoaded)
    return (
                <div className='account-page-wrapper'>
                    <div className='glav-installmusic'>
                        <BackButton/>
                        <div className='song-information-1'>
                            <div className='image-playlistskin'>
                                <img className='playlistskin' alt='song-install-skin' src={currentImage} onClick={handleImageInput}/> 
                            </div>
                            <h1 className='newtrack-h1'>Новый трек</h1>
                            <div className='uploadtrack-div'>
                                {/* <div className='uploadtrack-div-inf'>
                                    <p className='uploadtrack-p1'>Перетащите свой трек сюда</p>
                                    <p className='uploadtrack-p2'>.mp3 или .wav, макс.100мб</p>
                                </div> */}
                                {/* <p className='or'>или</p> */}
                                <div className='div-track'> 
                                    {currentSong && <p className='name-new-song'>{`${currentSong}`}</p>} 
                                    <button className='upload-file-installmusic' onClick={handleSongInput}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={25} /> Выберите файл</button>
                                </div>
                            </div>
                        </div>
                        <div className='song-information-2'>
                            <div className='column1'>
                                <h2 className='column1-h2'>Название трека</h2>
                                <input className='inp-column1' placeholder={'Введите название...'} value={name} onChange={e => setName(e.target.value)}/>
                                {/* <h2 className='column1-h2'>Соавторы</h2> */}
                                {/* <div className=''>
                                    <input className="input-installmusic" type="text" placeholder={'Начните вводить'} />
                                    <button className="submit-tag-input" type="submit">&#10010;</button>
                                </div> */}
                                <h2 className='column1-h2'>Настроение</h2>
                                <InstallMusicFilterComponent placeholder={"Введите настроение..."} list={vibe} setList={setVibe}/>
                            </div>
                            <div className='column2'>
                                <h2 className='column2-h2'>Жанры</h2>
                                <InstallMusicFilterComponent placeholder={"Введите настроение..."} list={genre} setList={setGenre}/>
                                <h2 className='column2-h2'>Пол исполнителя</h2>
                                <select className="filters-select" onChange={e => setGender(e.target.value)}>
                                    <option value={0}>-</option>
                                    <option value={1}>Женский</option>
                                    <option value={2}>Мужской</option>
                                </select>
                                {/* <h2 className='column2-h2'>На что похоже</h2>
                                <InstallMusicFilterComponent placeholder={"Введите настроение..."} list={} setList={setVibe}/> */}
                            </div>
                        </div>
                        <div className='song-information-3' >
                            <InstallMusicText/>
                            <div id="myDiv" className='div-text'>
                                <h2 className='column1-h2'>Язык трека</h2>
                                <InstallMusicFilterComponent placeholder={"Введите язык..."} list={language} setList={setLanguage}/>
                                <h2 className='column1-h2'>Текст</h2>
                                <input id='myinput' className='inp-column1' placeholder={'Введите текст...'}/>
                                <div className="text-checkbox">
                                    <input type="checkbox" className='checkbox-button'/>
                                    <label className='label-checkbox'>Ненормативная лексика</label>
                                </div>
                            </div>
                            {role === 'author' ? <div>
                                <div className='button-and-text'>
                                    <button className='upload-track-installmusic' onClick={uploadToModeration}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Опубликовать*</button>
                                    {/* <button className='save-installmusic'><img className='savetrack' alt='savetrack' src={Save}/> Сохранить</button> */}
                                </div>
                                 <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                            </div> : ''}
                            {role === 'admin' ? <div>
                                <div className='button-and-text'>
                                    <button className='upload-track-installmusic' onClick={acceptSong}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Опубликовать</button>
                                    <button className='save-installmusic' onClick={declineSong}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Отклонить</button>
                                    {/* <button className='save-installmusic' onClick={uploadToModeration}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Удалить</button> */}
                                </div>
                                <h2 className='column1-h2'>Комментарий</h2>
                                <input id='myinput' value={comment} onChange={event => setComment(event.target.value)} className='inp-column1' placeholder={'Введите комментарий...'}/>
                            </div>: ''}
                            {role === 'authoredit' ? <div>
                                <div className='button-and-text'>
                                    <h2 className='column1-h2'>Комментарий</h2>
                                    <input id='myinput' value={comment} onChange={event => setComment(event.target.value)} className='inp-column1' placeholder={'Введите комментарий...'}/>
                                    <button className='upload-track-installmusic' onClick={refreshRequest}><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23} />Опубликовать*</button>
                                    {/* <button className='save-installmusic'><img className='savetrack' alt='savetrack' src={Save}/> Сохранить</button> */}
                                </div>
                                 <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                            </div> : ''}
                            <input type='file' accept="image/*" className='input-file' ref={imageSetterRef} onChange={changeLogo}></input>
                            <input type='file' className='input-file' ref={songSetterRef} onChange={changeSong}></input>
                        </div>
                    </div>
                </div>
        )
}


export default InstallMusicNewDesign;