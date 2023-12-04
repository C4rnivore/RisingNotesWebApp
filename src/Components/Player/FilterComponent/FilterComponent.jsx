import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'
import { useState, useEffect } from 'react'
import { getGenres, getLanguages, getMoods } from './APICallers/FiltersGetter'

function FilterComponent(){
    let filtersInitial = {
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
    }
    const filtersUpdateFunction = (filterId, filterValue, filterOrAnd = null) => {
        let temp = filters
        switch(filterId){
            case "genre":
                temp.genre = filterValue
                temp.genreOrAnd = filterOrAnd
                break
            case "language":
                temp.language = filterValue
                temp.languageOrAnd = filterOrAnd
                break
            case "similar":
                temp.similar = filterValue
                temp.similarOrAnd = filterOrAnd
                break
            case "mood":
                temp.mood = filterValue
                temp.moodOrAnd = filterOrAnd
                break
            case "duration":
                temp.duration = filterValue
                break
            case "extra":
                temp.extra = filterValue
                break
        }
        setFilters(temp)
    }

    const [genreFilters,setGenreFilters] = useState(null)
    const [langFilters,setLangFilters] = useState(null)
    const [moodFilters,setMoodFilters] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filters,setFilters] = useState(filtersInitial)

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
                    <FilterElement name="На что похоже?" id="similar" filters={[1,2]}  function = {filtersUpdateFunction}/>
                    <FilterElement name="Настроение" id="mood" filters={moodFilters} function = {filtersUpdateFunction}/>
                    <FilterTimeElement  name="Длительность" id="duration" function = {filtersUpdateFunction}/>
                    <FilterChckboxElement name="Дополнительно" id="extra" function = {filtersUpdateFunction}/>
                </div>
            </div>
        )    
}


export default FilterComponent