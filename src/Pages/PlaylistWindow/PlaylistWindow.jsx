import React, { useEffect } from 'react';
import SongCover from '../../Images/main-placeholder.png';
import Song from '../../Components/Song/Song';
import BackButton from '../../Components/BackButton';
import trash from '../../Images/trash.svg';
import bigEdit from '../../Images/account-page/edit-big.svg';
import { useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeaturedContext, PlaylistsContext, api, axiosAuthorized, axiosPictures, axiosUnauthorized} from '../../Components/App/App';

import './PlaylistWindow.css';

function PlaylistWindow(){
    const imageSetterRef = useRef(null);
    const [songs, setSongs] = useState([]);
    const [namePlaylist, setNamePlaylist] = useState('');
    const {playlists, setPlaylists} = useContext(PlaylistsContext);
    const [isreviewSkin, setReviewSkin] = useState(false);
    let params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [logofile, setLogofile] = useState(undefined);
    const [isPrivate, setIsPrivate] = useState(false);
    

    function reviewAvatar() {
        // проверка на наличие картинки
        axiosPictures.get(api + `api/playlist/${params.id}/logo?width=400&height=400`)
        .then (
            setReviewSkin(true)
        )
        .catch (
            error => {setReviewSkin(false)}
        )
    }

    useEffect(() => {
        getPlaylistInfo();
    }, [params]);

    async function getPlaylistInfo() {
        // подгрузка информации о плейлисте
        await axiosUnauthorized.get(`api/playlist/${params.id}`)
        .then(
            response => {
                setNamePlaylist(response.data.name);
                setIsPrivate(response.data.isPrivate);
                reviewAvatar();
            }
        )
        .catch(err => {navigate(-1)});

        await axiosAuthorized.get(`api/playlist/` + params.id +`/song/list`)
        .then(
            response => {
                setSongs(response.data.songList);
        })
    }

    async function deletePlaylist() {
        // удаление плейлиста
        try {
          await axiosAuthorized.delete(`api/playlist/${params.id}`);
          setPlaylists(prevPlaylists => prevPlaylists.filter(id => id !== params.id));
          navigate(`/featured`)
        } 
        catch (error) {
          console.error('Error:', error);
        }
    }

    const handleImageInput = () => {
        imageSetterRef.current.click();
    }

    async function uploadLogo(event) {
        // обновление картинки
        setPlaylists(arr => arr.filter(el => el != params.id));

        const reader = new FileReader();
        reader.onload = (event) => {
            setLogofile(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        const formData = new FormData();
        formData.append('LogoFile.File', event.target.files[0])
        await axiosAuthorized.patch(`/api/playlist/${params.id}/logo`, formData, { 
            headers: { 
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then ( () => {
            setReviewSkin(true)
        });

        setPlaylists(arr => arr = [...arr, params.id]);
    };
   
    const toggleEditMode = () => {
        // переход в режим редактирования и удаление текущего плейлиста из списка
        setIsEditing(!isEditing);
        setPlaylists(arr => arr.filter(el => el != params.id));
    };

    const handleInputChange = (event) => {
        setNamePlaylist(event.target.value);
    };

    const handleBlur = async () => {
        // Изменение информации о плейлисте и возвращение в список
        const playlistId = params.id;
        await axiosAuthorized.patch(`/api/playlist/${playlistId}`, { 
            name: namePlaylist, 
            isPrivate: isPrivate 
        })
        .then(() => {
            setIsEditing(false);
        });

        setPlaylists(arr => arr = [...arr, params.id]);
    };

    const handleCheckboxChange = async () => {
        // приватизация плейлиста
        const playlistId = params.id;
        try {
          await axiosAuthorized.patch(`/api/playlist/${playlistId}`, {
            isPrivate: !isPrivate
          });
        } catch (error) {
          console.error(error);
        }

        setIsPrivate(!isPrivate);
    };

    return (
        <div className='comment-page-wrapper'>
            <div className='comment-page'>
                <BackButton/>
                <div className='playlist-information'>
                    <div className='playlist-image-wrapper' onClick={handleImageInput}>
                        <div className='playlist-image-change'><img draggable='false' src={bigEdit}/></div>
                        <img draggable='false' className='playlist-image' alt='playlist cover' 
                            src={isreviewSkin ? (logofile ?? api + `api/playlist/${params.id}/logo?width=400&height=400`) : SongCover}/>
                    </div>
                    <div className='nameplaylist-and-buttons'>
                        {isEditing ? (
                            <input
                            className='input-name-playlist'
                            type="text"
                            value={namePlaylist}
                            placeholder={'Введите название...'}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            />
                            ) : (
                            <p className='playlistname' onClick={toggleEditMode}>{namePlaylist}</p>
                        )}
                        <div className='playlist-edit'>
                            <div className="private-checkbox">
                                <input type="checkbox" className='checkbox' checked={isPrivate}/>
                                <span className="checkbox-icon"></span>
                                <label className='private-playlist' onClick={handleCheckboxChange}>Приватный</label>
                            </div>
                            {/* <p className='rename-playlist'><img className='pencil-icon' alt='pencil' src={pencil} /> Переименовать</p> */}
                            <p className='delete-playlist' onClick={() => deletePlaylist()}><img className='pencil-icon' alt='pencil' src={trash}/>Удалить плейлист</p>
                        </div>
                    </div>
                </div>
                <div className='tracks'>
                    {songs.map(el => (
                        <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={el.authorName} genres={el.genreList}/>
                    ))}
                </div>
            </div>
            <img className="playlist-bg-image" src={isreviewSkin ? (logofile ?? api + `api/playlist/${params.id}/logo?width=400&height=400`) : ''} alt="" />
            <input type='file' accept=".jpg,.png" className='input-file' ref={imageSetterRef} onChange={uploadLogo}></input>
        </div>
    )

}

export default PlaylistWindow