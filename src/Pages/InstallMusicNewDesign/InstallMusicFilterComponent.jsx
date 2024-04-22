import React from 'react';
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';


function InstallMusicFilterComponent(props){
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState(false)

    
    const [curVibe, setCurvibe] = useState('');
    const [vibe, setVibe] = useState(props.list);

    function addCurVibe() {
        if (curVibe != '') {
            setVibe(e => e = [...e, curVibe]);
            setCurvibe('');
        }
        console.log('error');
        props.setList(vibe);
    }

    function deleteTag(tag) {
        setVibe(e => e = e.filter(el => el != tag))
        props.setList(vibe);
    }

    // useEffect(() => {
    //     setVibe(props.list)
    // }, [props]);


    return (
        <div>
            <div className='input-filtercomponent'>
                <input className="input-installmusic" placeholder={props.placeholder} value={curVibe} onChange={e => setCurvibe(e.target.value)}/>
                <button className="submit-tag-input-track" onClick={addCurVibe}>&#10010;</button>
            </div>
            <div className="filter-tags">
                {vibe.map((tag, index) => (
                    <div className="tag-container2" key={index} id={index.id}  >
                        <span className='tag'>{tag}</span>
                        <button className='tag-close' onClick={ e => deleteTag(tag)}>&#215;</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InstallMusicFilterComponent;