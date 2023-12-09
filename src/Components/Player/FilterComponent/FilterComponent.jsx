import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'

import { useState, useEffect } from 'react'
import { getGenres, getLanguages, getMoods } from './APICallers/FiltersGetter'
import { filtersInitial, filtersUpdater, filtersFormatter } from './FIlters/Filters'

function FilterComponent(){
    const [genreFilters,setGenreFilters] = useState(null)
    const [langFilters,setLangFilters] = useState(null)
    const [moodFilters,setMoodFilters] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filters,setFilters] = useState(filtersInitial)

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
        setFilters(cur=> cur = updated)
    }

    useEffect(() => {
        async function fetchFilters() {
            await setIsLoading(true);
            await Promise.all([
                getGenres().then(res=>setGenreFilters(res)).catch(err=>console.log(err)),
                getLanguages().then(res=>setLangFilters(res)).catch(err=>console.log(err)),
                getMoods().then(res=>setMoodFilters(res)).catch(err=>console.log(err))
             ])
            await setIsLoading(false);
        }
        fetchFilters();
    }, []); 

    if(!isLoading)
        return(
            <div className="filters-container">
                <div className="filters">
                    <span className="filters-title">Фильтры</span>
                    <FilterElement name="Жанр" id="genre" filters={genreFilters} function = {filtersUpdateFunction}/>
                    <FilterElement name="Язык" id="language" filters={langFilters} function = {filtersUpdateFunction}/>
                    <FilterElement name="На что похоже?" id="similar" filters={[]}  function = {filtersUpdateFunction}/>
                    <FilterElement name="Настроение" id="mood" filters={moodFilters} function = {filtersUpdateFunction}/>
                    <FilterTimeElement  name="Длительность" id="duration" function = {filtersUpdateFunction}/>
                    <FilterChckboxElement name="Дополнительно" id="extra" function = {filtersUpdateFunction}/>
                </div>
            </div>
        )    
}
export default FilterComponent