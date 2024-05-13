import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'
import { useFilters } from '../../../Hooks/useFilters/useFilters'

import { PlayerContext, CurrentSongContext } from '../../App/App'
import { useState, useEffect, useContext } from 'react'
import { getGenres, getLanguages, getMoods } from './APICallers/FiltersGetter'
import { filtersInitial, filtersUpdater,songsByFiltersGetter, extractSongsIdsList } from './FIlters/Filters';

import './FilterComponent.css';

function FilterComponent(){
    const [genreFilters,setGenreFilters] = useState(null)
    const [langFilters,setLangFilters] = useState(null)
    const [moodFilters,setMoodFilters] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {filters, updateFilters} = useFilters()
    const {songs, setSongs} = useContext(PlayerContext);

    /**
    * Главная функция обновления фильров
    * @function
    * 
    * @param {any} filterId - тип фильтра: genre | language | similar | mood | duration | extra
    * @param {any} filterValue - значение фильтра
    * @param {any} filterOrAnd - значение предиката для фильтра default = null
    */
    const filtersUpdateFunction = (filterId, filterValue, filterOrAnd = null) => {
        let updated = filtersUpdater(filterId, filterValue, filterOrAnd, filters)
        updateFilters(updated)
        updateSongs()
    }

    /**
    * Функция для обновления списка песен по фильтрам
    * @function
    */
    function updateSongs(){
        songsByFiltersGetter(filters)
        .then(res=> {
            const songs = extractSongsIdsList(res)
            setSongs(curSongs => curSongs = songs)
        })
        .catch(err=> {
            console.log('Error while getting songs by filters: \n')
            console.log(err)
        } )
    }

    useEffect(() => {
        async function fetchFilters() {
            setIsLoading(true);
            await Promise.all([
                getGenres().then(res=>setGenreFilters(res)).catch(err=>console.log(err)),
                getLanguages().then(res=>setLangFilters(res)).catch(err=>console.log(err)),
                getMoods().then(res=>setMoodFilters(res)).catch(err=>console.log(err))
             ])
            setIsLoading(false);
        }
        fetchFilters();
    }, []); 

    if(!isLoading)
        return(
            <div id='filters-container-id' className="filters-container"> 
                <div className="filters">
                    <span className="filters-title">Фильтры</span>
                    <FilterElement name="Жанр" id="genre" switch={filters.genreOrAnd} tags={filters.genre} filters={genreFilters} function = {filtersUpdateFunction}/>
                    <FilterElement name="Язык" id="language" switch={filters.languageOrAnd} tags={filters.language} filters={langFilters} function = {filtersUpdateFunction}/>
                    <FilterElement name="На что похоже?" id="similar" switch={filters.similarOrAnd} tags={filters.similar} filters={[]}  function = {filtersUpdateFunction}/>
                    <FilterElement name="Настроение" id="mood" switch={filters.moodOrAnd} tags={filters.mood} filters={moodFilters} function = {filtersUpdateFunction}/>
                    <FilterTimeElement  name="Длительность" id="duration" function = {filtersUpdateFunction}/>
                    <FilterChckboxElement name="Дополнительно" id="extra"  function = {filtersUpdateFunction}/>
                </div>
            </div>
        )    
}
export default FilterComponent