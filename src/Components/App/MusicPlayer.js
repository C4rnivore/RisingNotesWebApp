import axios from 'axios';
import { useEffect, useState } from 'react';

import alert from '../../Images/controller/alert-octagon.svg'
import heart from '../../Images/controller/heart.svg'
import message from '../../Images/controller/message-circle.svg'
import play from '../../Images/controller/play-circle.svg'
import rewind_forwrad from '../../Images/controller/rewind.svg'
import rewind_backward from '../../Images/controller/rewind-1.svg'
import dislike from '../../Images/controller/thumbs-down.svg'

export const api = 'https://2100237-gs89005.twc1.net/'

export default function MusicPlayer (props) {
    const [isPlaying, setIsPlaying] = useState(false);  
    const [nextSongIndex,setNextSongIndex] = useState(0);

    const handlePlayPause = () => { 
        let audio = document.querySelector('audio');
        if (isPlaying) {
            audio.pause();
        }
        else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        setNextSongIndex(nextSongIndex => nextSongIndex + 1);
    };

    const handlePrevSong = () => {
        setNextSongIndex(nextSongIndex => nextSongIndex - 1);
    };

    return (<>
        <audio src={api + `api/song/${props.songsInfo[nextSongIndex]?.id}/file`} type="audio/mpeg"/>
        <div className="header__track-controller">
            <img className="track-controller__btn warning-btn" src={alert}></img>
            <img className="track-controller__btn dislike-btn" src={dislike}></img>
            <img onClick={handlePrevSong} className="track-controller__btn to-start-btn" src={rewind_backward}></img>
            <img onClick={handlePlayPause} className="track-controller__btn play-btn" src={play}></img>
            <img onClick={handleNextSong} className="track-controller__btn to-end-btn" src={rewind_forwrad}></img>
            <img className="track-controller__btn like-btn" src={heart}></img>
            <img className="track-controller__btn lyrics-btn" src={message}></img>
        </div>
    </>)
}