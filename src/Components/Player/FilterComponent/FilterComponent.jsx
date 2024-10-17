import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'
import FilterNotificationPopup from './FilterElements/FilterNotificationPopup'
import { useFilters } from '../../../Hooks/useFilters/useFilters'

import { PlayerContext, CurrentSongContext } from '../../App/App'
import { useState, useEffect, useContext } from 'react'
import { getGenres, getLanguages, getMoods } from './APICallers/FiltersGetter'
import { filtersInitial, songsByFiltersGetter, extractSongsIdsList } from './FIlters/Filters';

import './FilterComponent.css';

function FilterComponent(){
    const [genreFilters,setGenreFilters] = useState(null)
    const [langFilters,setLangFilters] = useState(null)
    const [moodFilters,setMoodFilters] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState(filtersInitial)

    const {setSongs} = useContext(PlayerContext);
    const [filtersDisabled, setFiltersDisabled] = useState(false)
    const [popupVisible, setPopupVisible] = useState(false)

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
        fetchFilters().then(() => updateSongs());
    }, []); 

    
    useEffect(()=>{ 
        console.log(filters)
    }, [filters])

    /**
    * Главная функция обновления фильров
    * @function
    * 
    * @param {any} filterId - тип фильтра: genre | language | similar | mood | duration | extra
    * @param {any} filterValue - значение фильтра
    * @param {any} filterOrAnd - значение предиката для фильтра default = null
    */
    const filtersUpdateFunction = (filterId, filterValue, filterOrAnd = null) => {
        switch(filterId){
            case "genre":
                setFilters({
                    ...filters,
                    genre: filterValue,
                    genreOrAnd: filterOrAnd
                })
                break
            case "language":
                setFilters({
                    ...filters,
                    language: filterValue,
                    languageOrAnd: filterOrAnd
                })
                break
            case "similar":
                setFilters({
                    ...filters,
                    similar: filterValue,
                    similarOrAnd: filterOrAnd
                })
                break
            case "mood":
                setFilters({
                    ...filters,
                    mood: filterValue,
                    moodOrAnd: filterOrAnd
                })
                break
            case "duration":
                setFilters({
                    ...filters,
                    duration: filterValue
                })
                break
            case "extra":
                setFilters({
                    ...filters,
                    extra: filterValue
                })
                break
        }
        setFiltersDisabled(false)
    }

    /**
    * Функция для обновления списка песен по фильтрам
    * @function
    */
    function updateSongs(){
        songsByFiltersGetter(filters)
        .then(res=> {
            if(res == -1 || res == [] ){
                setPopupVisible(true)
                return
            }
            
            const songs = extractSongsIdsList(res)
            setPopupVisible(false)
            setSongs(songs)
        })
        .catch(err=> {
            console.log('Error while getting songs by filters: \n')
            console.log(err)
        } )
        setFiltersDisabled(true)
    }

    const popupCallback = () =>{
        setFilters({
            genre : [],
            genreOrAnd: 'and',
            language : [],
            languageOrAnd: 'and',
            similar : [],
            similarOrAnd: 'and',
            mood : [],
            moodOrAnd: 'and',
            duration : 'any',
            extra: {
                    explicit : "Disabled",
                    removed : "Disabled"}
        })
        setPopupVisible(false)
    }

    if(!isLoading)
        return(
            <div id='filters-container-id' className="filters-container"> 
                <div className="filters">
                    <span className="filters-title">Фильтры</span>
                    <FilterElement name="Жанр" id="genre" filters={filters} options={genreFilters} updater = {filtersUpdateFunction}/>
                    <FilterElement name="Язык" id="language"  filters={filters} options={langFilters} updater = {filtersUpdateFunction}/>
                    <FilterElement name="На что похоже?" id="similar" filters={filters} options={[]}  updater = {filtersUpdateFunction}/>
                    <FilterElement name="Настроение" id="mood" filters={filters} options={moodFilters} updater = {filtersUpdateFunction}/>
                    <FilterTimeElement  name="Длительность" id="duration" filters={filters} updater = {filtersUpdateFunction}/>
                    <FilterChckboxElement name="Дополнительно" id="extra" filters={filters}  updater = {filtersUpdateFunction}/>
                    <button className='filters-apply-btn' disabled={filtersDisabled} onClick={updateSongs}>Применить фильтры</button>
                    
                    <FilterNotificationPopup 
                        visible={popupVisible}
                        notificationText={'К сожалению, нам не удалось найти песни с подходящими фильтрами'}
                        actionButtonText={'Сбросить фильтры'}
                        actionButtonCallback={popupCallback}
                    />
                </div>
            </div>
        )    
}
export default FilterComponent