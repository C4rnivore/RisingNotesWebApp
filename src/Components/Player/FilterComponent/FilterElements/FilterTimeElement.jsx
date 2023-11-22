import { useEffect, useState } from "react"


function FilterTimeElement(props){
    const[duration, setDuration] = useState('any')

    useEffect(()=>{
        passToParent(props.id, duration)
    },[duration])

    function passToParent(filterId, filterValue, filterOrAnd = null){
        props.function(filterId, filterValue, filterOrAnd)
    }

    const handleDurationChange = () =>{
        const value = document.getElementById("durations").value;
        if(!value)
            return
        setDuration(value)
    }

    return(
        <div className="filterOption">
            <div className="filter-top">
                <div className="filter-top-start">
                    <div className="filter-dot"></div>
                    <span className="filter-name">{props.name}</span>
                </div>
            </div>
            <form className="filters-form">
                <select className="filters-input" id="durations" onChange={handleDurationChange}>
                    <option value="any">Не имеет значения</option>
                    <option value="less-than-minute">Меньше 1:00</option>
                    <option value="minute-five">От 1:00 до 5:00</option>
                    <option value="more-than-five">Больше 5:00</option>
                </select>
            </form>
        </div>
    )
}

export default FilterTimeElement