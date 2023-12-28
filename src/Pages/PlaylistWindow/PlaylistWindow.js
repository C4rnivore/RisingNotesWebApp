import React, { useEffect } from 'react';
import cover from '../../Images/image-placeholder/song-cover-default.png';
import SongCover from '../../Images/Group 73.png';
import edit from '../../Images/controller/edit-2.svg';
import Chevron from '../../Images/controller/chevron-left.svg';
import del from '../../Images/controller/x.svg';
import Song from '../../Components/Song/Song';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import pencil from '../../Images/pencil_gray.svg';
import trash from '../../Images/trash.svg';
import { useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeaturedContext, PlaylistsContext, api, axiosAuthorized, axiosUnauthorized} from '../../Components/App/App';
import axios from 'axios';





function PlaylistWindow(){
    const imageSetterRef = useRef(null);
    const [songs, setSongs] = useState([]);
    const [namePlaylist, setNamePlaylist] = useState('');
    const {playlist, setPlaylists} = useContext(PlaylistsContext);
    const [isreviewSkin, setReviewSkin] = useState(false);
    let params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [logofile, setLogofile] = useState(undefined);
    const [isPrivate, setIsPrivate] = useState(false);
    

    function reviewAvatar() {
        axiosUnauthorized.get(api + `api/playlist/${params.id}/logo?width=400&height=400`)
        .then (
            setReviewSkin(true)
        )
        .catch (
            error => {setReviewSkin(false)}
        )
    }

    useEffect(() => {
        axiosUnauthorized.get(`api/playlist/${params.id}`)
        .then(
            response => {
                setNamePlaylist(response.data.name)
                reviewAvatar();
            }
        )
    }, []) 

    async function deletePlaylist() {
        try {
          await axiosAuthorized.delete(`api/playlist/${params.id}`);
          setPlaylists(prevPlaylists => prevPlaylists.filter(id => id !== params.id));
          navigate(`/featured`)
        } catch (error) {
          console.error('Error:', error);
        }
    }

    const handleImageInput = () => {
        imageSetterRef.current.click();
    }

   async function uploadLogo(event){
        const reader = new FileReader();
        reader.onload = (event) => {
            setLogofile(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        const formData = new FormData();
        formData.append('LogoFile.File', event.target.files[0])
        await axiosAuthorized.patch(`/api/playlist/${params.id}/logo`, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then ( () => {
            setReviewSkin(true)
        }
        )
    };
   
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event) => {
        setNamePlaylist(event.target.value);
    };

    const handleCheckboxChange = () => {
        setIsPrivate(!isPrivate);
     };

     const handleBlur = async () => {
        const playlistId = params.id;
        await axiosAuthorized.patch(`/api/playlist/${playlistId}`, { name: namePlaylist, isPrivate: isPrivate }).then(() => {
            setIsEditing(false);
        });
     };

    // useEffect(() => {
    //     const playlistId = params.id;
    //     axiosAuthorized.patch(`/api/playlist/${playlistId}`, { isPrivate: isPrivate }).then(() => {
    //     });
    // }, [isPrivate]);

    // const handleCheckboxChange = async () => {
    //     setIsChecked(!isChecked);
    //     const playlistId = params.id;
    //     try {
    //       await axiosAuthorized.patch(`/api/playlists/${playlistId}`, {
    //         isPrivate: !isChecked
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //    };

        return (
            <div className='comment-page-wrapper'>
                <div className='featured'>
                    <BackButton/>
                    <div className='playlist-information'>
                        <div className='image-playlistskin'>
                            <img className='playlistskin' alt='playlist cover' src={isreviewSkin ? (logofile ?? api + `api/playlist/${params.id}/logo?width=400&height=400`) : SongCover} onClick={handleImageInput}/>
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
                                    <input type="checkbox" className='checkbox-button' checked={isPrivate} onChange={handleCheckboxChange}/>
                                    <label className='private-playlist'>Приватный</label>
                                </div>
                                {/* <p className='rename-playlist'><img className='pencil-icon' alt='pencil' src={pencil} /> Переименовать</p> */}
                                <p className='delete-playlist' onClick={() => deletePlaylist()}><img className='pencil-icon' alt='pencil' src={trash}/> Удалить плейлист</p>
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
                <input type='file' accept="image/*" className='input-file' ref={imageSetterRef} onChange={uploadLogo}></input>
            </div>
        )

}

export default PlaylistWindow