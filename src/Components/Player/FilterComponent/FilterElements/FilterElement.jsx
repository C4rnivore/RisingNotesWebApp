import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

function FilterElement({
    name,
    id,
    options,
    updater
}){
    const [tags, setTags] = useState([]);
    const [predicate, setPredicate] = useState('and')
    const filters = useSelector((state)=>state.filters.value)

    useEffect(()=>{
        switch(id){
            case "genre":
                setPredicate(filters.genreOrAnd) 
                setTags(filters.genre)
                break
            case "language":
                setPredicate(filters.languageOrAnd) 
                setTags(filters.language)
                break
            case "similar":
                setPredicate(filters.similarOrAnd) 
                setTags(filters.similar)
                break
            case "mood":
                setPredicate(filters.moodOrAnd) 
                setTags(filters.mood)
                break
        }

    },[filters])



    const handleInputClick = (e) =>{
        e.preventDefault()
        let inp = document.getElementById(id+"-input")
        if(!inp)
            return
        else if(inp.value === '')
            return
        else if(tags.includes(inp.value))
            return
        setTags(cur => cur = [...cur, inp.value])
        inp.value = ''
    }

    const deleteTag = (value) => {
        let updated = tags.filter(val => val !== value)
        setTags(updated)
    }

    function passToParent(filterId, filterValue, filterOrAnd = null){
        updater(filterId, filterValue, filterOrAnd)
    }

    useEffect(()=>{ 
        passToParent(id, tags, predicate)
    }, [tags, predicate])

    return(     
            <div className="filterOption">
                <div className="filter-top">
                    <div className="filter-top-start">
                        <div className="filter-dot"></div>
                        <span className="filter-name">{name}</span>
                    </div>
                    <div id={id} className={predicate === 'and'? "filter-switch":'filter-switch-toggled'} onClick={()=>setPredicate(predicate === 'and'? 'or': 'and')}>
                        <div className="switch-ball"></div>
                        <span className="switch-state-name">{predicate === 'and'? 'и':'или'}</span>
                    </div>
                </div>
                <form className="filters-form">
                    <input className="filters-input" id={id + "-input"} list={id+'-options'} type="text"  placeholder={'Начните вводить'}/>
                    <datalist id={id+'-options'}>
                    {options?.map(
                        (opt, i) => <option key = {i}>{opt}</option>
                    )}
                    </datalist>
                    <button className="submit-tag-input" type="submit" onClick={handleInputClick}>&#10010;</button>
                </form>
                <div className="filter-tags">
                    {tags.map((tag, index) => (
                        <div className="tag-container" key={index} id={index.id}  >
                            <span className='tag'>{tag}</span>
                            <button className='tag-close' onClick={ e => deleteTag(tag)}>&#215;</button>
                        </div>
                    ))}
                </div>
            </div>
)}
export default FilterElement
