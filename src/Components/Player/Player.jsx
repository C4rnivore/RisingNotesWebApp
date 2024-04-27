import { useContext, useEffect, useState } from 'react';
import songCoverTemplate from '../../Images/main-placeholder.png';

import FilterComponent from './FilterComponent/FilterComponent.jsx'
import SongCover from './PlayerComponents/SongCover.jsx'
import SongLyrics from './PlayerComponents/SongLyrics.jsx'
import FilterBtn from '../../Images/player/FilterBtn.svg';

import './Player.css';
import { CurrentSongContext, api, axiosUnauthorized } from '../App/App.jsx';


function Player() {
    const {currentSong, setCurrentSong} = useContext(CurrentSongContext);
    const [currentTrack,setCurrentTrack] = useState({
        trackName: 'Нет треков',
        trackCover: songCoverTemplate,
        authors: [],
        tags: [],
        lyrcs: ``
    });
    const [isLoaded, setIsLoaded] = useState(false);

    const getCurrentTrackInfo = async () => {
        setIsLoaded(false);
        let isImageExist = false;
        let info = {};

        await axiosUnauthorized.get(`api/song/` + currentSong + `/logo`)
        .then(response => {
            isImageExist = true;
        })
        .catch(err => {console.log(err)});

        await axiosUnauthorized.get(`api/song/` + currentSong)
        .then(response => {
            info = {
                authorId: response.data.authorId,
                trackName: response.data.name,
                authors: [response.data.authorName],
                tags: response.data.genreList,
                trackCover: isImageExist ? api + `api/song/` + currentSong + `/logo` : songCoverTemplate
            }
        })
        .catch(err => {console.log(err)});

        await axiosUnauthorized.get(`api/user/` + info.authorId + `/logo`)
        .then(response => {
            info.authorLogo = api + `api/user/` + info.authorId + `/logo`
        })
        .catch(err => {
            info.authorLogo = songCoverTemplate
        });

        setCurrentTrack(info);

        setIsLoaded(true);
    }

    useEffect(() => {
        getCurrentTrackInfo();
    }, [currentSong])

    const toggleFilters = () =>{
        let filters = document.getElementById('filters-container-id')
        let btn = document.getElementById('f-toggle-btn')
        if(!filters) return
        filters.classList.toggle('filters-toggled')
        btn.classList.toggle('f-btn-active')
    }

    if (isLoaded)
    return (
        <>
            <section className="comment-page-wrapper">           
                <SongCover track = {currentTrack}/>
                <div className="player-filters-toggle">
                    <button id='f-toggle-btn' onClick={toggleFilters} className="player-filters-toggle-btn">
                        
                    </button>
                    <img className='player-filters-toggle-img' src={FilterBtn} alt="" />
                </div>  
            </section>
            <FilterComponent/>
            <img className="player-bg-image" src={currentTrack.trackCover} alt="" />
        </>
    );
}
export default Player;