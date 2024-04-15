import './SearchContent.css'
import arrowRight from '../../../Images/artist-card/Chevron_Right.svg'
import { Link } from 'react-router-dom'
import { api, pfpPlaceholder } from '../../App/App'
import Song from '../../Song/Song'
import Playlist from '../../Playlist'
import { useContext } from 'react'
import { SearchQueryContext } from '../../App/App'

function SearchContent(props){
    const {searchInput, setSearchInput} = useContext(SearchQueryContext)
    const searchResult = props.search

    if(!searchResult.artists && !searchResult.tracks && !searchResult.playlists)
        return (<NotFoundPage/>)

    const stockCover='https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg'
    const clipsPlaceholder=[
        {
            name:'Clip 1',
            duration:'2.00',
            authorName:'Author',
            cover:undefined
        },
        {
            name:'Clip 2',
            duration:'2.00',
            authorName:'Author',
            cover:undefined
        },
        {
            name:'Clip 3',
            duration:'2.00',
            authorName:'Author',
            cover:undefined
        },
        {
            name:'Clip 4',
            duration:'2.00',
            authorName:'Author',
            cover:undefined
        },
    ]



    function clearQuery(){
        setSearchInput('')
    }

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
                clearFunc={clearQuery} 
                navType={props.navType}/>)
        case 'Playlists':
            return(<SearchPlaylists 
                playlists={searchResult.playlists} 
                navType={props.navType}/>)
        case 'Clips':
            return (<SearchClips
                    clips={clipsPlaceholder}
                    navType={props.navType}
                    firstThree={false}
            />)
    }

    function SearchAll(props){
        const searchResult = props.searchResult
        return(
            <div className='search-res-container'>
                <SearchTracks tracks={searchResult.tracks} artists={searchResult.artists}/>
                <SearchClips clips={clipsPlaceholder} firstThree={true}/>
                <SearchAuthors artists={searchResult.artists}/>
                <SearchPlaylists playlists={searchResult.playlists}/>
            </div>)
    }

    function SearchTracks(props){
        const tracks = props.tracks
        if(tracks.length == 0 && props.navType == undefined)
            return(<></>)
    
        if(tracks.length == 0 && props.navType == 'Tracks')
            return(<div className="search-tracks-top pink-highlight">Не найдено треков по запросу</div>)
        
        return(
            <div>
                <div className="search-tracks-top">
                    <span>Треки</span>
                    <button className='search-show-more'>
                    {tracks.length>5?
                            <>
                                <span>Смотреть все</span>
                                <img src={arrowRight} alt="" />
                            </>
                            : <></>
                    }
                    </button>
                </div>
                <div className="search-tracks-content">
                    {tracks.map(track =>(
                        <Song key={track.id} id={track.id} name={track.name} duration={track.durationMs} artist={track.artistName} />
                    ))}
                </div>
            </div>)
    }

    function SearchClips(props){
        const clips = props.clips
        const clipsToShow = props.firstThree? clips.slice(0,3):clips

        if (clips.length === 0){
            if(props.navType === undefined)
                return(<></>)

            if(props.navType === 'Clips')
                return(<div className="search-clips-top pink-highlight" >Не найдено исполнителей по запросу</div>)
        }

        return(
                <div>
                    <div className="search-clips-top">
                        <span>Клипы</span>
                        <button className='search-show-more' onClick={()=>updateNavType('Clips')}>
                            {clips.length>3?
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
                            {clipsToShow.map((clip, index) => (
                                <div key={index} className="clip-wrapper">
                                    <div className="cover-wrapper">
                                        <img draggable='false' className="clip-cover" src={clip.cover?clip.cover:stockCover}/>
                                        <span className="clip-duration">{clip.duration}</span>
                                    </div>
                                    <div className="clip-song"> 
                                        <div className="song-img-placeholder"></div>
                                        <div className="song-info-wrapper">
                                            <span className="clip-song-name">{clip.name}</span>
                                            <span className="clip-song-author">{clip.authorName}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
    
    function SearchAuthors(props){
        // const frontend_url = 'http://localhost:3000/'
        const artists = props.artists

        function addDefaultSrc(ev){
            ev.target.src = pfpPlaceholder
        }
    
        if(artists.length == 0 && props.navType == undefined)
        return(<></>)
    
        if(artists.length == 0 && props.navType == 'Authors')
            return(<div className="search-authors-top pink-highlight" >Не найдено исполнителей по запросу</div>)
    
        return(
                <div>
                        <div className="search-authors-top">
                        <span>Исполнители</span>
                        <button className='search-show-more'>
                            {artists.length>5?
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
                        {artists.map((artist, index) => (
                            <div key={index} className="search-artist-card">
                                <Link to={`/artist/${artist.id}`} onClick={clearQuery}>
                                    <img onError={addDefaultSrc} src={api + `api/author/${artist.id}/logo?width=200&height=200`? api + `api/author/${artist.id}/logo?width=200&height=200`:'12'} alt={"нет картинки"} />
                                </Link>
                                <span className='search-artist-name'>{artist.name}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
    )}
    
    function SearchPlaylists(props){
        const playlists = props.playlists
    
        if(playlists.length == 0 && props.navType == undefined)
        return(<></>)
    
        if(playlists.length == 0 && props.navType == 'Playlists'){
            return(<div className="search-playlists-top pink-highlight">Не найдено плейлистов по запросу</div>)
        }
        return(
            <div>
                <div className="search-playlists-top">
                    <span>Плейлисты</span>
                    <button className='search-show-more'>
                    {playlists.length>5?
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
                {playlists.map(playlist =>(
                            <Playlist key={playlist.id} id={playlist.id} />
                        ))}
                </div>
                </div>
            </div>)
    }
    
    function NotFoundPage(props){
        return(
            <div>
                Ничего не найдено
            </div>)
    }
}






export default SearchContent