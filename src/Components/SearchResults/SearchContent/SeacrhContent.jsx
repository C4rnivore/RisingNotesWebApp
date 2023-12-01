import './SearchContent.css'
import arrowRight from '../../../Images/artist-card/Chevron_Right.svg'

function SearchContent(props){
    switch(props.navType){
        case 'All':
            return(<SearchAll/>)
        case 'Tracks':
            return(<SearchTracks/>)
        case 'Authors':
            return(<SearchAuthors/>)
        case 'Playlists':
            return(<SearchPlaylists/>)
    }
}

function SearchAll(props){
    return(
        <div>
            <SearchTracks/>
            <SearchAuthors/>
            <SearchPlaylists/>
        </div>)
}
function SearchTracks(props){
    return(
        <div>
            <div className="search-tracks-top">
                <span>Треки</span>
                <button className='search-show-more'>
                    <span>Смотреть все</span>
                    <img src={arrowRight} alt="" />
                </button>
            </div>
            <div className="search-tracks-content">
                <ul>
                    <li>track</li>
                    <li>track</li>
                    <li>track</li>
                </ul>
            </div>
        </div>)
}
function SearchAuthors(props){
    return(
        <div>
             <div className="search-authors-top">
                <span>Исполнители</span>
                <button className='search-show-more'>
                    <span>Смотреть все</span>
                    <img src={arrowRight} alt="" />
                </button>
            </div>
            <div className="search-authors-content">
                <ul>
                    <li>author</li>
                    <li>author</li>
                    <li>author</li>
                </ul>
            </div>
        </div>)
}

function SearchPlaylists(props){
    return(
        <div>
            <div className="search-playlists-top">
                <span>Плейлисты</span>
                <button className='search-show-more'>
                    <span>Смотреть все</span>
                    <img src={arrowRight} alt="" />
                </button>
            </div>
            <div className="search-playlists-content">
                <ul>
                    <li>playlists</li>
                    <li>playlists</li>
                    <li>playlists</li>
                </ul>
            </div>
        </div>)
}   

export default SearchContent