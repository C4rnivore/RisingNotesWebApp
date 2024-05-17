import React, { useRef } from 'react';
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';


function InputWithTags({list, setList, placeholder, availableOptions}){
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const select = useRef();
    
    const [currentTag, setCurrentTag] = useState('');
    const [currentList, setCurrentList] = useState(list);
    const [filteredOptions, setOptions] = useState(availableOptions);

    function addTag(fastCopy='') {
        let tag = currentTag;
        if (fastCopy !== '') {
            tag = fastCopy;
        }
        // добавление тега
        if (tag != '' && availableOptions.includes(tag)) {
            let arr = [...currentList, tag];
            setCurrentList(e => e = arr);
            setCurrentTag('')
            setList(arr);
        }
    }

    function deleteTag(tag) {
        // удаление тега
        let arr = currentList.filter(el => el != tag);
        setCurrentList(e => e = arr);
        setList(arr);
    }

    useEffect(() => {
        // Изменение списка предложенных тегов
        if (currentTag !== '') {
            let arr = availableOptions.filter(e => e.toLowerCase().includes(currentTag.toLowerCase()));
            setOptions(arr);
            select.current.className = "input-options";
        }
        else {
            select.current.className = "hidden-options";
        }
    }, [currentTag]);

    function handleInputChange(e) {
        e.preventDefault();
        setCurrentTag(e.target.value);
    }

    function handleOptionClick(e) {
        setCurrentTag(e);
        addTag(e);
    }

    return (
        <div className='input-with-tags'>
            <div className='input-filtercomponent'>
                <input className="input-installmusic" placeholder={placeholder} value={currentTag} onChange={handleInputChange}/>
                <button className="submit-tag-input-track" onClick={addTag}>&#10010;</button>
                <ul ref={select}>
                    {filteredOptions.map(el => <li className="input-option" onClick={e => handleOptionClick(el)}>{el}</li>)}
                </ul>
            </div>
            <div className="filter-tags">
                {currentList.map((tag, index) => (
                    <div className="tag-container2" key={index} id={index.id}  >
                        <span className='tag'>{tag}</span>
                        <button className='tag-close' onClick={() => deleteTag(tag)}>&#215;</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InputWithTags;