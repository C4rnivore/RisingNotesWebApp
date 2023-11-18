import FilterElement from './FilterElements/FilterElement'
import FilterTimeElement from './FilterElements/FilterTimeElement'
import FilterChckboxElement from './FilterElements/FilterCheckboxElement'
import { useState, useEffect } from 'react'

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
    const [filters,setFilters] = useState(filtersInitial)

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
        console.log(filters);
    }

    return(
        <div className="filters-container">
            <div className="filters">
                <FilterElement name="Жанр" id="genre" function = {filtersUpdateFunction}/>
                <FilterElement name="Язык" id="language" function = {filtersUpdateFunction}/>
                <FilterElement name="На что похоже?" id="similar" function = {filtersUpdateFunction}/>
                <FilterElement name="Настроение" id="mood" function = {filtersUpdateFunction}/>
                <FilterTimeElement  name="Длительность" id="duration" function = {filtersUpdateFunction}/>
                <FilterChckboxElement name="Дополнительно" id="extra" function = {filtersUpdateFunction}/>
            </div>
        </div>
    )    
}


export default FilterComponent