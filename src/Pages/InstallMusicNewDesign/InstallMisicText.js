import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import { useEffect, useState } from "react"



function InstallMusicText(props){
    // const [tags,setTags] = useState([]);


    // const handleswitchStateClick = ()=>{
    //     const swt = document.getElementById(props.id)
    //     if(swt.classList.contains('filter-switch-toggled')){
    //         swt.classList.remove('filter-switch-toggled')
    //         swt.classList.add('filter-switch')
    //     }
    //     else{
    //         swt.classList.add('filter-switch-toggled')
    //         swt.classList.remove('filter-switch')
    //     }
    // }

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
        </div>
    )
}

export default InstallMusicText;