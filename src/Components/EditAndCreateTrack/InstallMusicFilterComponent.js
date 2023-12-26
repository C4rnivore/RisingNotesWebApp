import React from 'react';
import BackButton from '../BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import { useEffect, useState } from "react"



function InstallMusicFilterComponent(props){
    
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

    return (
        <div>
            <div className=''>
                <input className="input-installmusic" placeholder={props.placeholder} value={curVibe} onChange={e => setCurvibe(e.target.value)}/>
                <button className="submit-tag-input" onClick={addCurVibe}>&#10010;</button>
            </div>
            <div className="filter-tags">
                {vibe.map((tag, index) => (
                    <div className="tag-container" key={index} id={index.id}  >
                        <span className='tag'>{tag}</span>
                        <button className='tag-close' onClick={ e => deleteTag(tag)}>&#215;</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InstallMusicFilterComponent;