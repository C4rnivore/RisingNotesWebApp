import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import EditableSong from '../../Components/EditebleSong';

class AdminMessages extends React.Component {
    render() {
        return (
            <div className='color-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>

                    <h2>Уведомления</h2>
                    <div className='tracks'>
                        <EditableSong/>
                        <EditableSong/>
                        <EditableSong/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminMessages