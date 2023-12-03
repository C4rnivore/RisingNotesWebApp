import { useEffect, useState } from "react"


function FilterElement(props){
    const [tags,setTags] = useState([]);
    const [switchState, setSwitchState] = useState('и')
    const filtersList = props.filters

    const handleswitchStateClick = ()=>{
        const swt = document.getElementById(props.id)
        if(swt.classList.contains('filter-switch-toggled')){
            swt.classList.remove('filter-switch-toggled')
            swt.classList.add('filter-switch')
        }
        else{
            swt.classList.add('filter-switch-toggled')
            swt.classList.remove('filter-switch')
        }
        setSwitchState(cur => cur === 'и' ? 'или': 'и' )
    }

    const handleInputClick = (e) =>{
        e.preventDefault()
        let inp = document.getElementById(props.id+"-input")
        if(!inp)
            return
        else if(inp.value == '')
            return
        else if(tags.includes(inp.value))
            return
        setTags(cur => cur = [...cur, inp.value])
    }

    const deleteTag = (value) => {
        let updated = tags.filter(val => val != value)
        setTags(updated)
    }

    function passToParent(filterId, filterValue, filterOrAnd = null){
        props.function(filterId, filterValue, filterOrAnd)
    }

    useEffect(()=>{
        const stateToPass = switchState === 'и' ? 'and': 'or'
        passToParent(props.id, tags, stateToPass )
    }, [tags, switchState])

    return(     
            <div className="filterOption">
                <div className="filter-top">
                    <div className="filter-top-start">
                        <div className="filter-dot"></div>
                        <span className="filter-name">{props.name}</span>
                    </div>
                    <div id={props.id} className="filter-switch" onClick={handleswitchStateClick}>
                        <div className="switch-ball"></div>
                        <span className="switch-state-name">{switchState}</span>
                    </div>
                </div>
                <form className="filters-form">
                    <input className="filters-input" id={props.id + "-input"} list={props.id+'-options'} type="text"  placeholder={'Начните вводить'}/>
                    <datalist id={props.id+'-options'}>
                    {props.filters.map(
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
