import { useEffect,useState } from "react"



function FilterComponent(props){
    const [tags,setTags] = useState(['Рок','Джаз','Техно','Диско','Rock\'n Roll'])
    const [selectedTags, setSelectedTags] = useState(['231'])

    useEffect(() => {
            setTags(['Рок','Джаз','Техно','Диско','Rock\'n Roll']) 
    },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    }

    return(
        <div className="filterOption">
            <div className="filter-top">
                <div className="filter-top-start">
                    <div className="filter-dot"></div>
                    <span className="filter-name">{props.name}</span>
                </div>
                <div className="filter-switch"></div>
            </div>
            <form className="filters-form" action="" onSubmit={handleSubmit}>
                <input list="options" type="text" className="filters-input" placeholder={'Начните вводить'}/>
                <datalist id="options">
                    {tags.map((item, key) =>
                        <option key={key} value={item} />
                    )}
                </datalist>
                <input type="submit"/>
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
    )
}

export default FilterComponent