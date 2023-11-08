
import volume from '../../Images/controller/volume-2.svg'
import track_placeholder from '../../Images/image-placeholder/song-placeholder.png'
import {Link, Outlet, useLoaderData} from "react-router-dom";
import { useEffect } from 'react';
import { GetSong } from '../App/MusicPlayer';
import { useState } from 'react';
import axios from 'axios';
import MusicPlayer from '../App/MusicPlayer';
const api = 'https://2100237-gs89005.twc1.net/'

function Header() {    
    const [songs, setSongs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get(api + `api/song/list/${'4347606b-3d32-4a85-8244-edc3e31b497b'}`)
            .then(response => {
                setIsLoaded(true);
                setSongs(response.data.songInfoList);
                console.log(response.data.songInfoList);
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }, [])

    function showModal() {
       const vl_md = document.getElementById('volume-modal')
        if(vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.remove('volume-modal-hidden')
        }
    }

    function hideModal() {
        const vl_md = document.getElementById('volume-modal')
        if(!vl_md.classList.contains('volume-modal-hidden')){
            vl_md.classList.add('volume-modal-hidden')
        }
    }
    if (isLoaded) {
        return (
            <>
            <header className="header">
                <div className="header-left-container">
                    <div className="header__track">
                        <img className="header__track-image" src={track_placeholder} alt=""/>
                        <div className="header__track-options">
                            <span className="header-text header__track-name">Francis Owens - Deconstructive Ac...</span>
                            <div className="track-range">
                                <input type="range" id="time" name="volume"
                                    min="0" max="100"/>
                                <span className="header-text header__track-duration">2:03</span>
                            </div>
                        </div>
                        <MusicPlayer songsInfo={songs}/>
                    </div>
                </div>
                <div className="header-right-container">
                    <div className="volume-container">
                        <div id='volume-modal' className="volume-modal volume-modal-hidden" onMouseLeave={hideModal}>
                            <input type="range"/>
                        </div>
                        <img className="header-volume-btn" src={volume} onMouseOver={showModal} ></img>
                    </div>

                    <div className="entrance-holder">
                        <span className="header-text entrance-btn entrance-signup-btn"><Link className="header-link" to='/registration'>Зарегистрироваться</Link></span>
                        <span className="header-text entrance-btn entrance-login-btn"><Link className="header-link" to='/login'>Войти</Link></span>
                    </div>
                </div>
            </header>
            <Outlet/>
            </>
        );
    }
}

export default Header;