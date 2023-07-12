import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import BackButton from '../BackButton';
import DownloadCard from '../InstallMusic/UploadCard';


function InstallMusicMusician() {
    return (
        <div className='DownloadMusicMusician'>
            <Sidebar/>
            <div className='backbutton2'>
                    <BackButton/>
            </div>
            <div className='DownloadCard'>
                <DownloadCard/>
            </div>
            <div className='save-button2'>
                <button className='save-but'>
                    Сохранить
                </button>
            </div>
        </div>
    );
}
export default InstallMusicMusician;