import './SearchContent.css'
import arrowRight from '../../../Images/artist-card/Chevron_Right.svg'
import Song from '../../Song/Song'
import Playlist from '../../Playlist'
import Clip from '../../Clip/Clip'
import pfpPlaceholder from '../../../Images/main-placeholder.png';
import SearchArtistCard from '../../SearchArtistCard/SearchArtistCard'
import useSearchClean from '../../../Hooks/useSearchClean/useSearchClean'

function SearchContent(props){
    const searchResult = props.search

    if(searchResult.artists?.length === 0 && searchResult.tracks?.length === 0 && !searchResult.playlists && !searchResult.clips)
        return (<NotFoundPage/>)


    function updateNavType(type){
        props.navChanger(type)
    }

    switch(props.navType){
        case 'All':
            return(<SearchAll 
                searchResult={searchResult}/>)
        case 'Tracks':
            return(<SearchTracks 
                tracks={searchResult.tracks} 
                artists={searchResult.artists} 
                navType={props.navType}/>)
        case 'Authors':
            return(<SearchAuthors 
                artists={searchResult.artists} 
                navType={props.navType}/>)
        case 'Playlists':
            return(<SearchPlaylists 
                playlists={searchResult.playlists} 
                navType={props.navType}/>)
        case 'Clips':
            return (<SearchClips
                    clips={searchResult.clips}
                    navType={props.navType}
                    firstThree={false}
            />)
    }

    function SearchAll(props){
        const searchResult = props.searchResult
        return(
            <div className='search-res-container'>
                <SearchTracks tracks={searchResult.tracks} artists={searchResult.artists}/>
                <SearchClips clips={searchResult.clips} firstThree={true}/>
                <SearchAuthors artists={searchResult.artists}/>
                <SearchPlaylists playlists={searchResult.playlists}/>
            </div>)
    }

    function SearchTracks(props){
        const tracks = props.tracks
        const validation = validateResult(tracks, props.navType, 'Tracks', 'Не найдено треков по запросу')
        if (!validation.valid) return validation.return
        
        return(
            <div>
                <div className="search-tracks-top">
                    <span>Треки</span>
                    <button className='search-show-more'>
                    {tracks?.length>5?
                            <>
                                <span>Смотреть все</span>
                                <img src={arrowRight} alt="" />
                            </>
                            : <></>
                    }
                    </button>
                </div>
                <div className="search-tracks-content">
                    {tracks?.map(track =>(
                        <Song key={track.id} id={track.id} name={track.name} duration={track.durationMs} artist={track.artistName} />
                    ))}
                </div>
            </div>)
    }

    function SearchClips(props){
        const clips = props.clips
        const validation = validateResult(clips, props.navType, 'Clips', 'Не найдено клипов по запросу')
        if (!validation.valid) return validation.return
    
        const clipsToShow = props.firstThree? clips.slice(0,3):clips
        return(
                <div>
                    <div className="search-clips-top">
                        <span>Клипы</span>
                        <button className='search-show-more' onClick={()=>updateNavType('Clips')}>
                            {clips?.length>3?
                            <>
                                <span>Смотреть все</span>
                                <img src={arrowRight} alt="" />
                            </>
                            : <></>
                            }
                        </button>
                    </div>
                    <div className="search-clips-content">
                        <div className='clips'>
                            {clipsToShow?.map((clip, index) => (
                                <Clip key={index} cover={clip.cover} duration={clip.duration} name={clip.name} authorName={clip.authorName}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
    
    function SearchAuthors(props){
        const artists = props.artists
        const validation = validateResult(artists, props.navType, 'Authors', 'Не найдено исполнителей по запросу')
        if (!validation.valid) return validation.return

        function addDefaultSrc(ev){
            ev.target.src = pfpPlaceholder
        }
    
        return(
                <div>
                    <div className="search-authors-top">
                        <span>Исполнители</span>
                        <button className='search-show-more'>
                            {artists?.length>5?
                            <>
                                <span>Смотреть все</span>
                                <img src={arrowRight} alt="" />
                            </>
                            : <></>
                            }
                        </button>
                    </div>
                    <div className="search-authors-content">
                        <div className='playlists'>
                            {artists?.map((artist, index) => (
                                <SearchArtistCard key={index} artist={artist} srcErrHandler={addDefaultSrc}/>
                            ))}
                        </div>
                    </div>
                </div>
    )}
    
    function SearchPlaylists(props){
        const playlists = props.playlists
        const validation = validateResult(playlists, props.navType, 'Playlists','Не найдено плейлистов по запросу')
        if (!validation.valid) return validation.return

        return(
            <div>
                <div className="search-playlists-top">
                    <span>Плейлисты</span>
                    <button className='search-show-more'>
                    {playlists?.length>5?
                        <>
                            <span>Смотреть все</span>
                            <img src={arrowRight} alt="" />
                        </>
                        : <></>
                    }
                    </button>
                </div>
                <div className="search-playlists-content">
                    <div className='playlists'>
                        {playlists?.map(playlist =>(
                            <Playlist key={playlist.id} id={playlist.id} />
                        ))}
                    </div>
                </div>
            </div>)
    }
    
    function NotFoundPage(props){
        return(
            <div style={{display:'flex', height:300, alignItems:'center', justifyContent:'center'}}>
                Ничего не найдено
            </div>)
    }

    function validateResult(data, navType, correspondingType, errMessage){
        const response = {
            valid: false,
            return: <></>
        }

        if (data === undefined || data.length === 0){
            if(navType === undefined) return response
            if(navType === correspondingType){
                response.return = <div className = { `search-${correspondingType.toLowerCase()}-top pink-highlight`}>{errMessage}</div>
                return response
            }
        }
        else{
            response.valid = true
            return response
        }
    }
}






export default SearchContent