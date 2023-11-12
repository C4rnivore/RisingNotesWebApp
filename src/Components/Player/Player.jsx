import { useState } from 'react';
import songCoverTemplate from '../../Images/player/coverTemplate.png'

import openLyricsBtnIcon from '../../Images/player/openLyricsButtonIcon.svg'
import currentSongIcon from '../../Images/player/currentSongIcon.svg'
import authorButtonIcon from '../../Images/player/authorButtonIcon.svg'
import FilterComponent from './FilterComponent/FilterComponent.jsx'


function Player() {
    const [currentTrack,setCurrentTrack] = useState({
        trackName: 'Deconstructive Achievements',
        trackCover: songCoverTemplate,
        authors: ['Francis Owens','ZIA'],
        tags: ['Рок','Джаз','Техно','Диско','Rock\'n Roll','Электро', 'Классика'],
        lyrcs: `
I feel so lonely in a lonely world.
When man is screaming on a metal sword.
And when another man is shouting all aboard.
I feel a little tired saying

Oh, Lord.
My faith and love will die within my new fault.
And when I broke my last chord
I'll say it all again

Some dreams are not becoming true, but other do. 
I guess I will survive in spite of being in a bad view.

I feel so lonely in a lonely world.
When man is screaming on a metal sword.
And when another man is shouting all aboard.
I feel a little tired saying

Oh, Lord.
My faith and love will die within my new fault.
And when I broke my last chord
I'll say it all again

Some dreams are not becoming true, but other do. 
I guess I will survive in spite of being in a bad view.
`
    })

    const [isOpened,setIsOpened] = useState(true)
    const [selectedTags, setSelectedTags] = useState([])
    const [tags, setTags] = useState(['32'])

    const handleAuthorBtnClick = () =>{
        return
    }
    const toggleOpenLyrics = () =>{
        setIsOpened(!isOpened)
    }

    return (
        <section className="player-area">
            <div className="main-player-container">
                <div className="current-song-title">
                    <img src={currentSongIcon} alt="" className="current-song-img" />
                    <span className="current-song-span">Сейчас играет</span>
                </div>
                <img src={currentTrack.trackCover} alt="" className="track-cover" />
                <button className="about-author" onClick={handleAuthorBtnClick}>
                    <img src={authorButtonIcon}  alt="" className="author-btn-icon" />
                    Подробее об { currentTrack.authors.length > 1 ? 'авторах' : 'авторе' }
                </button>
            </div>
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
            <div className="filters-container">
                <FilterComponent/>
            </div>
            <img className="player-bg-image" src={currentTrack.trackCover} alt="" />
        </section>
    );
}
export default Player;