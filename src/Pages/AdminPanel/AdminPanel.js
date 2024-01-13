import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import RequestSong from './RequestSong';
import { axiosAuthorized } from '../../Components/App/App';

function AdminPanel() {
    const [requestsList, setRequestsList] = useState([]);

    useEffect(() => {
        axiosAuthorized.get('api/song/upload-request/list/for-review')
        .then(response => {
            setRequestsList(response.data.publishRequestShortInfoList);
        })
    }, [])

    return (
        <div className='black-page'>
            <div className='featured'>
                <BackButton/>
                <div className='search-element'>
                    <h2 className='sub-h2'>Уведомления</h2>
                </div>
                <div className=''>
                    {requestsList.map(el => <RequestSong id={el.id} authorName={el.authorName} status={el.status}/>)}
                    
                </div>
            </div>
        </div>
    )
}

export default AdminPanel