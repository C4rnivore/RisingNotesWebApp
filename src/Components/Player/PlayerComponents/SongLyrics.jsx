import { useState } from "react"

import openLyricsBtnIcon from '../../../Images/player/openLyricsButtonIcon.svg'

function SongLyrics(props){
    const [isOpened,setIsOpened] = useState(true)
    const toggleOpenLyrics = () =>{
        setIsOpened(!isOpened)
    }

    let currentTrack = props.track

    return(
        <div className="lyrics-container">
            <h1 className="song-name">
                {currentTrack.trackName}
            </h1>
            <span className="song-authors">
                {currentTrack.authors
                .map(author => author)
                .reduce((prev, curr) => [prev, ', ', curr])}
            </span>
            <div className="song-tags">
                {currentTrack.tags
                .map(tag => <div key={tag.toString()} className='song-tag'> {tag} </div>)}
            </div>
            <p className={!isOpened ? "song-lyrics closed-lyrics" : "song-lyrics opened-lyrics" }>
                {/* <div className="cover-gradient"></div> */}
                {currentTrack.lyrcs}
            </p>   
            <button className = "open-lyrics-button"  onClick={toggleOpenLyrics}>
                <img src={openLyricsBtnIcon} alt="" />
                {!isOpened ? "Открыть текст песни": "Скрыть текст песни"}
            </button>
        </div>
    )
}
export default SongLyrics