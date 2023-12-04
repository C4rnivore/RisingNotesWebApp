import './SearchContent.css'
import arrowRight from '../../../Images/artist-card/Chevron_Right.svg'
import pfpTemplate from '../../../Images/artist-card/artist-template.png'

function SearchContent(props){
    const searchResult = props.search

    if(!searchResult.artists && !searchResult.tracks && !searchResult.playlists)
        return (<NotFoundPage/>)

    switch(props.navType){
        case 'All':
            return(<SearchAll searchResult={searchResult}/>)
        case 'Tracks':
            return(<SearchTracks tracks={searchResult.tracks} artists={searchResult.artists}/>)
        case 'Authors':
            return(<SearchAuthors artists={searchResult.artists}/>)
        case 'Playlists':
            return(<SearchPlaylists playlists={searchResult.playlists}/>)
    }
}

function SearchAll(props){
    const searchResult = props.searchResult

    return(
        <div className='search-res-container'>
            <SearchTracks tracks={searchResult.tracks} artists={searchResult.artists}/>
            <SearchAuthors artists={searchResult.artists}/>
            <SearchPlaylists playlists={searchResult.playlists}/>
        </div>)
}
function SearchTracks(props){
    const tracks = props.tracks

    if(!tracks){
        return(<div className="search-tracks-top pink-highlight">Не найдено треков по запросу</div>)
    }
    else{
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
                    {
                        // tracks.map((track)=>(

                        // ))
                    }
                </div>
            </div>)
    }
}

// async function getAuthorName(id){
//     try{
//         const response = await axios({
//             method:'GET',
//             url: api + 'api/author/'+ id,
//             responseType: 'application/json',
//         })
//         const result = JSON.parse(response.data).name
//         return result
//     }
//     catch(err){
//         console.log('error in getAuthorName func');
//     }
// }

function SearchAuthors(props){
    const artists = props.artists

    if(artists.length == 0){
        return(<div className="search-authors-top pink-highlight" >Не найдено исполнителей по запросу</div>)
    }
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
                {artists.map((artist,index)=>(
                    <div key={index} className="search-artist-card">
                        <img src={pfpTemplate} alt="" />
                        <span className='search-artist-name'>{artist.name}</span>
                    </div>
                ))}
            </div>
        </div>)
}

function SearchPlaylists(props){
    const playlists = props.playlists

    if(!playlists){
        return(<div className="search-playlists-top pink-highlight">Не найдено плейлистов по запросу</div>)
    }
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

function NotFoundPage(props){
    return(
        <div>
            Ничего не найдено
        </div>)
}

export default SearchContent