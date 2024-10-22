import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'
import FilterNotificationPopup from './FilterElements/FilterNotificationPopup'

import { useDispatch, useSelector } from 'react-redux'
import { updateFilterValue, setDefaultFilterValue } from '../../../Redux/slices/filtersSlice'
import { updateSongsValue } from '../../../Redux/slices/songsSlice'

import { useState, useEffect } from 'react'
import { getGenres, getLanguages, getMoods } from './APICallers/FiltersGetter'
import { songsByFiltersGetter, extractSongsIdsList } from './FIlters/Filters';

import './FilterComponent.css';

function FilterComponent(){
    const [genreFilters,setGenreFilters] = useState(null)
    const [langFilters,setLangFilters] = useState(null)
    const [moodFilters,setMoodFilters] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const filters = useSelector((state)=> state.filters.value)
    const dispatch = useDispatch()

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

    /**
    * Главная функция обновления фильров
    * @function
    * 
    * @param {any} filterId - тип фильтра: genre | language | similar | mood | duration | extra
    * @param {any} filterValue - значение фильтра
    * @param {any} filterOrAnd - значение предиката для фильтра default = null
    */
    const filtersUpdateFunction = (filterId, filterValue, filterOrAnd = null) => {
        dispatch(
            updateFilterValue({filterId, filterValue, filterOrAnd})
        )
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
            dispatch(updateSongsValue(songs))
        })
        .catch(err=> {
            console.log('Error while getting songs by filters: \n')
            console.log(err)
        } )
        setFiltersDisabled(true)
    }

    const popupCallback = () =>{
        dispatch(
            setDefaultFilterValue()
        )
        setPopupVisible(false)
    }

    if(!isLoading)
        return(
            <div id='filters-container-id' className="filters-container"> 
                <div className="filters">
                    <span className="filters-title">Фильтры</span>
                    <FilterElement name="Жанр" id="genre" options={genreFilters} updater = {filtersUpdateFunction}/>
                    <FilterElement name="Язык" id="language" options={langFilters} updater = {filtersUpdateFunction}/>
                    <FilterElement name="На что похоже?" id="similar" options={[]}  updater = {filtersUpdateFunction}/>
                    <FilterElement name="Настроение" id="mood" options={moodFilters} updater = {filtersUpdateFunction}/>
                    <FilterTimeElement  name="Длительность" id="duration" updater = {filtersUpdateFunction}/>
                    <FilterChckboxElement name="Дополнительно" id="extra"  updater = {filtersUpdateFunction}/>
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