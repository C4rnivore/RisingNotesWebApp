import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function FilterTimeElement({id, name, updater}){
    const[duration, setDuration] = useState('any')
    const filters = useSelector((state)=>state.filters.value)

    useState(()=>{
        console.log(filters.duration)
        // setDuration(props.filters.duration)
    },[filters])

    useEffect(()=>{
        passToParent(id, duration)
    },[duration])

    function passToParent(filterId, filterValue, filterOrAnd = null){
        updater(filterId, filterValue, filterOrAnd)
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
                    <span className="filter-name">{name}</span>
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