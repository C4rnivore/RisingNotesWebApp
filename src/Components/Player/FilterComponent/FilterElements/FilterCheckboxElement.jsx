import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

function FilterCheckboxElement({id,name,updater}){
    const [expContent, setExpContent] = useState('Disabled')
    const [removedContent, setRemovedContent] = useState('Disabled')
    const filters = useSelector((state)=>state.filters.value)

    function passToParent(filterId, filterValue, filterOrAnd = null){
        updater(filterId, filterValue, filterOrAnd)
    }

    useEffect(()=>{
        passToParent(id, {"explicit" : expContent, "removed" : removedContent})
    },[expContent, removedContent])

    useEffect(()=>{
        setExpContent(filters.extra.explicit)
    },[filters])


    const handleCheckboxChange = (id) =>{
        const cb = document.getElementById(id);
        if(cb.checked){
            id === 'explicit' ? setExpContent('Enabled') : setRemovedContent('Enabled')
        }
        else{
            id === 'explicit' ? setExpContent('Disabled') : setRemovedContent('Disabled')
        }
    }

    return(
        <div className="filterOption">
            <div className="filter-top">
                <div className="filter-top-start">
                    <div className="filter-dot"></div>
                    <span className="filter-name">{name}</span>
                </div>
            </div>
            <div className="filter-checkbox-container">
                <div className="filter-checkbox">
                    <input type="checkbox" id="explicit" onChange={() => handleCheckboxChange('explicit')}/>
                    <label>Ненормативная лексика</label>
                </div>
            </div>
        </div>
    )
}

export default FilterCheckboxElement