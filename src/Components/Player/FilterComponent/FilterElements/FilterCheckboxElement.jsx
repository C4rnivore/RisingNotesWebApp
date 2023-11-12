import { useEffect, useState } from "react"


function FilterCheckboxElement(props){
    const [expContent, setExpContent] = useState('Disabled')
    const [removedContent, setRemovedContent] = useState('Disabled')

    function passToParent(filterId, filterValue, filterOrAnd = null){
        props.function(filterId, filterValue, filterOrAnd)
    }

    useEffect(()=>{
        passToParent(props.id, {"explicit" : expContent, "removed" : removedContent})
    },[expContent, removedContent])


    const handleCheckboxChange = (id) =>{
        const cb = document.getElementById(id);
        if(cb.checked)
            id === 'explicit' ? setExpContent('Enabled') : setRemovedContent('Enabled')
        else
            id === 'explicit' ? setExpContent('Disabled') : setRemovedContent('Disabled') 
    }

    return(
        <div className="filterOption">
            <div className="filter-top">
                <div className="filter-top-start">
                    <div className="filter-dot"></div>
                    <span className="filter-name">{props.name}</span>
                </div>
            </div>
            <div className="filter-checkbox-container">
                <div className="filter-checkbox">
                    <input type="checkbox" id="explicit" onChange={e=>handleCheckboxChange('explicit')}/>
                    <label>Ненормативная лексика</label>
                </div>
                <div className="filter-checkbox cb-offset">
                    <input type="checkbox" id="removed" onChange={e=>handleCheckboxChange('removed')}/>
                    <label>Добавить исключенные</label>
                </div>
            </div>
        </div>
    )
}

export default FilterCheckboxElement