import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import RequestSong from './RequestSong';

class AdminPanel extends React.Component {
    render() {
        return (
            <div className='black-page'>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Уведомления</h2>
                    </div>
                    <div className=''>
                        <RequestSong/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPanel