import { useEffect, useState } from 'react'
import './SearchResults.css'
import backIcon from '../../Images/artist-card/Chevron_Left.svg'
import SearchContent from './SearchContent/SeacrhContent'
import { fetchInput } from './APICallers/GetArtistData'
import Loader from '../Loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { updateValue } from '../../Redux/slices/searchSlice'
import { updateCacheValue } from '../../Redux/slices/cacheSlise'

function SearchResults(props){
    const [activeNav, setActiveNav] = useState('All')
    const [isFetching, setIsFetching] = useState(false)
    const [searchRes, setSearchRes] = useState(undefined)

    const cache = useSelector((state)=>state.cache.value)
    const input = useSelector((state) => state.searchInput.value)
    const dispatch = useDispatch()

    function clearQuery(){
        dispatch(updateValue(''))
    }

    const handleNavClick = (id) =>{
        if(id === activeNav)
            return
        
        document.getElementById(activeNav).classList.remove('active')
        document.getElementById(id).classList.add('active')
        setActiveNav(id)
    }

    useEffect(()=>{
        async function fetchData(){
            setIsFetching(true)
            try{
               var res = getFromCache(input)
               setSearchRes(res)
            }
            catch{
                await fetchInput(input).then(res=>{
                    setSearchRes(res)
                    updateCache(input, res)
                })
            }
            setIsFetching(false)
        }
        fetchData()
    },[input])

    const getFromCache = (input) =>{
        var res = cache.get(input)
        if(!res) throw Error()
        else return res
    }

    const updateCache = (key, value) =>{
        dispatch(
            updateCacheValue({key, value})
        )
    }

    if(input === ''){
        return(<></>)
    }
    else{
        return(
            <section className="search-results">
                <div className="search-results-container">
                    <div className="search-result-back">
                        <button onClick={clearQuery}>
                            <img src={backIcon} alt="" />
                            <span>Назад</span>
                        </button>
                    </div>
                    <div className="search-result-query">
                        <span>Результаты поиска по запросу <span className='highlight'> «{input}»</span>
                        </span>
                    </div>
                    <nav className='search-results-nav'>
                        <div id='All' className="search-nav-el active" onClick={() => handleNavClick('All')}>Все</div>
                        <div id='Tracks' className="search-nav-el" onClick={() =>handleNavClick('Tracks')}>Треки</div>
                        <div id='Clips' className="search-nav-el" onClick={() =>handleNavClick('Clips')}>Клипы</div>
                        <div id='Authors'className="search-nav-el" onClick={() =>handleNavClick('Authors')}>Исполнители</div>
                        <div id='Playlists' className="search-nav-el" onClick={() =>handleNavClick('Playlists')}>Плейлисты</div>
                        <div id='Vertical' className="search-nav-el" onClick={() =>handleNavClick('Vertical')}>Блог</div>
                    </nav>
                    {isFetching? <Loader/>:
                        <SearchContent navChanger={handleNavClick} navType={activeNav} searchQuery={props.searchQuery} search={searchRes}/>
                    }
                </div>
            </section>
        )
    }
}

export default SearchResults