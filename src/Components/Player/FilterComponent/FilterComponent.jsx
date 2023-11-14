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

    const passThroughFunc = (filterId, filterValue, filterOrAnd = null) => {
        updateFilters(filterId, filterValue, filterOrAnd)
        return
    }

    function updateFilters(filterId, filterValue, filterOrAnd){
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
        //console.log(filters);
    }

    useEffect(()=>{
    },[filters])

    return(
        <div className="filters">
            <FilterElement name="Жанр" id="genre" function = {passThroughFunc}/>
            <FilterElement name="Язык" id="language" function = {passThroughFunc}/>
            <FilterElement name="На что похоже?" id="similar" function = {passThroughFunc}/>
            <FilterElement name="Настроение" id="mood" function = {passThroughFunc}/>
            <FilterTimeElement  name="Длительность" id="duration" function = {passThroughFunc}/>
            <FilterChckboxElement name="Дополнительно" id="extra" function = {passThroughFunc}/>
        </div>
    )    
}


export default FilterComponent