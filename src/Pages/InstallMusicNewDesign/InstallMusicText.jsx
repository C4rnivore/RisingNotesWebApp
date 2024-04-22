import React from 'react';
import { useEffect, useState, useRef } from "react"



function InstallMusicText(props){

    const [toggleButton, setToggleButton] = useState(0);
    const handleswitchStateClick = ()=>{
        const targetDiv = document.getElementById("myDiv");
        if (toggleButton === 0 & targetDiv.style.display !== "block") {
            setToggleButton(1);
            targetDiv.style.display = "block";
        } else {
            targetDiv.style.display = "none";
            setToggleButton(0);
        }
    }


    return (
        <div className='song-availability-text'>
            <h2 className='column1-h2'>Текст</h2>
            <div onClick={handleswitchStateClick} className={toggleButton === 0 ? 'text-switch' : 'text-switch-toggled'}>
                <div className="switch-ball"></div>
            </div>
        </div>
    )
}

export default InstallMusicText;