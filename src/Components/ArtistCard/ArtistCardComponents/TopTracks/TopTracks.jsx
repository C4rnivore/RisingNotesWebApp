import './TopTracks.css'

function TopTracks(props){
    const tracks = props.artist.topTracks

    const handleOnTrackClick = (trackIndex) =>{

    }
    
    return(
        <div className="top-tracks-container">
            <span className='top-tracks-title'>Топ Треков</span>
            <div className="tracks">
                {tracks.map((track,index) =>(
                    <div className="track-container" key={index}>
                        <img src={track.trackCover} draggable='false' onClick={() => handleOnTrackClick(index)}/>
                        <span>{track.trackName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopTracks