import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import RequestSong from './RequestSong';
import { api, axiosAuthorized } from '../../Components/App/App';

import './AdminPanel.css';

function AdminPanel() {
    const [requestsList, setRequestsList] = useState([]);
    const [currPage, setCurrPage] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getRequestsList();
    }, []);

    const handleChangePage = (id) => {
        // смена страницы в лк
        setCurrPage(id);
    };

    async function getRequestsList(params) {
        let list = [];
        let correctList = [];
        await axiosAuthorized.get('api/song/upload-request/list/for-review')
        .then(response => {
            list = response.data.publishRequestShortInfoList;
        });

        for (var el of list) {
            try {
                let response = await axiosAuthorized.get('/api/song/upload-request/' + el.id);
                correctList = [...correctList, {
                    name: response.data.songName,
                    logo: api + 'api/song/upload-request/' + el.id + '/logo',
                    genre: response.data.genreList[0],
                    id: el.id,
                    status: el.status,
                    authorName: el.authorName,
                    publishedId: response.data.publishedSongId
                }];
            }
            catch (err) {
                console.log(err);
            }
        }

        setRequestsList(correctList);
        setIsLoaded(true);
    }

    if (isLoaded)
    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='search-element'>
                    <h2 className='sub-h2'>Панель администратора</h2>
                </div>

                <div className="account-page-menu">
                        <a onClick={() => handleChangePage(0)} 
                            className={currPage === 0 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                            Уведомления
                        </a>
                        <a onClick={() => handleChangePage(1)} 
                            className={currPage === 1 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                            Пользователи
                        </a>
                </div>

                <div className=''>
                    {requestsList.map(el => <RequestSong info={el}/>)}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel