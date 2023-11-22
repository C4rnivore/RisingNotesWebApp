import { useState } from 'react';
import songCoverTemplate from '../../Images/player/coverTemplate.png'

import FilterComponent from './FilterComponent/FilterComponent.jsx'
import SongCover from './PlayerComponents/SongCover.jsx'
import SongLyrics from './PlayerComponents/SongLyrics.jsx'


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

    return (
        <section className="player-area">
            <SongCover track = {currentTrack}/>
            <SongLyrics track = {currentTrack}/>
            <FilterComponent/>
            <img className="player-bg-image" src={currentTrack.trackCover} alt="" />
        </section>
    );
}
export default Player;