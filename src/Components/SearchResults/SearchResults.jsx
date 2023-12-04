import { useEffect, useState } from 'react'
import './SearchResults.css'
import backIcon from '../../Images/artist-card/Chevron_Left.svg'
import SearchContent from './SearchContent/SeacrhContent'
import { fetchInput } from './APICallers/GetArtistData'

function SearchResults(props){
    const [activeNav, setActiveNav] = useState('All')
    const [isFetching, setIsFetching] = useState(false)
    const [searchRes, setSearchRes] = useState(undefined)

    const input = props.searchQuery

    const handleNavClick = (id) =>{
        if(id === activeNav)
            return
        document.getElementById(activeNav).classList.remove('active')
        document.getElementById(id).classList.add('active')
        setActiveNav(id)
    }

    useEffect(()=>{
        async function fetchData(){
            await setIsFetching(true)
            await fetchInput(input).then(res=>setSearchRes(res))
            await setIsFetching(false)
        }
        fetchData()
    },[input])

    
    if(input == ''){
        return(<></>)
    }
    else{
        return(
            <section className="search-results">
                <div className="search-results-container">
                    <div className="search-result-back">
                        <button>
                            <img src={backIcon} alt="" />
                            <span>Назад</span>
                        </button>
                    </div>
                    <div className="search-result-query">
                        <span>Результаты запроса по запросу <span className='highlight'> «{props.searchQuery}»</span>
                        </span>
                    </div>
                    <nav className='search-results-nav'>
                        <div id='All' className="search-nav-el active" onClick={() => handleNavClick('All')}>Все</div>
                        <div id='Tracks' className="search-nav-el" onClick={() =>handleNavClick('Tracks')}>Треки</div>
                        <div id='Authors'className="search-nav-el" onClick={() =>handleNavClick('Authors')}>Исполнители</div>
                        <div id='Playlists' className="search-nav-el" onClick={() =>handleNavClick('Playlists')}>Плейлисты</div>
                    </nav>
                    {isFetching? <div className="">Fetching data</div>:
                    <SearchContent navType={activeNav} searchQuery={props.searchQuery} search={searchRes}/>
                    }
                </div>
            </section>
        )
    }
}

export default SearchResults