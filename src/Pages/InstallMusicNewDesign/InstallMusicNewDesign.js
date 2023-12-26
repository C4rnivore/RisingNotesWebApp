import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import InstallMusicFilterComponent from '../../Components/EditAndCreateTrack/InstallMusicFilterComponent';
import { useState, useEffect, useRef } from 'react'
import InstallMusicText from '../../Components/EditAndCreateTrack/InstallMusicText';
import Save from '../../Images/installmusicimages/save.svg';
import { BsCloudArrowUp } from "react-icons/bs";
import { axiosAuthorized } from '../../Components/App/App';
import { api } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import EditAndCreate from '../../Components/EditAndCreateTrack/EditAndCreate';


function InstallMusicNewDesign(){
    

    return (
            <EditAndCreate/>
        )
}

export default InstallMusicNewDesign;