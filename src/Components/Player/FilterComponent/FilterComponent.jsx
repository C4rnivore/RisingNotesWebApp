import { useEffect,useState } from "react"



function FilterComponent(){

    const passThroughFunc = (filterId, filterValue, filterOrAnd = null) => {
        // on filter changes
        return
    }

    return(
        <div className="filters">
            <FilterElement name="Жанр" id="genre" function = {passThroughFunc}/>
            <FilterElement name="Язык" id="language"/>
            <FilterElement name="На что похоже?" id="similar"/>
            <FilterElement name="Настроение" id="mood" />
        </div>
    )    
}

function FilterElement(props){
    const [tags,setTags] = useState();
    const [switchState, setSwitchState] = useState('и')

    useEffect(()=>{
        setTags([])
    })

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
        setSwitchState(cur => cur == 'и' ? 'или': 'и' )
    }

    const handleInputClick = (e) =>{
       // e.preventDefault()

        let inp = document.getElementById(props.id+"-input")
        if(!inp)
            return

        setTags([1,2,3])
    }


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
        <form className="filters-form" action="">
            <input className="filters-input" id={props.id+"-input"} list="options" type="text"  placeholder={'Начните вводить'}/>
            <button className="submit-tag-input" type="submit" onClick={handleInputClick}>&#10010;</button>
        </form>
        <div className="filter-tags">
            {tags.map(tag => {
                <div className="tag-container">
                    <span className='tag'>{tag}</span>
                    <button className='tag-close'>&#215;</button>
                </div>
            })}
        </div>
    </div>
)}


export default FilterComponent