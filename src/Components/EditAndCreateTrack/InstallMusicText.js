import React from 'react';
import BackButton from '../BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import { useEffect, useState, useRef } from "react"



function InstallMusicText(props){

    
   
   
    // toggleButton.onclick = function () {
    //   if (targetDiv.style.display !== "none") {
    //     targetDiv.style.display = "none";
    //   } else {
    //     targetDiv.style.display = "block";
    //   }
    // };
    // const [tags,setTags] = useState([]);

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

    // const handleInputClick = (e) =>{
    //     e.preventDefault()

    //     let inp = document.getElementById(props.id+"-input")

    //     if(!inp)
    //         return
    //     else if(inp.value === '')
    //         return
    //     else if(tags.includes(inp.value))
    //         return

    //     setTags(cur => cur = [...cur, inp.value])
    // }

    // const deleteTag = (value) => {
    //     let updated = tags.filter(val => val != value)
    //     setTags(updated)
    // }

    // function passToParent(filterId, filterValue = null){
    //     props.function(filterId, filterValue)
    // }

    // useEffect(()=>{
    //     passToParent(props.id, tags)
    // }, [tags])

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