import React, { useEffect, useState } from 'react';
import BackButton from '../../Components/BackButton';
import RequestSong from './RequestSong';
import { api, axiosAuthorized } from '../../Components/App/App';
import searchIcon from '../../Images/sidebar/Vector.svg';

import './AdminPanel.css';
import UserCard from '../../Components/UserCard/UserCard';
import ChosenUser from '../../Components/ChosenUser/ChosenUser';
import Loader from '../../Components/Loader/Loader';

function AdminPanel() {
    const [requestsList, setRequestsList] = useState([]);
    const [currPage, setCurrPage] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState(searchIcon);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        if (currPage === 0)
            getRequestsList();
        else 
            getUsersList();
    }, [currPage, searchQuery]);

    const handleChangePage = (id) => {
        // смена страницы в лк
        setCurrPage(id);
        setIsLoaded(false);
    };

    async function getRequestsList() {
        // получение заявок с песнями
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
    };

    async function getUsersList() {
        let list = [];
        let correctList = [];
        await axiosAuthorized.get('api/author/list' + `?NameWildcard=${searchQuery}`)
        .then(response => {
            list = response.data.authorList;
        });

        // for (var el of list) {
        //     try {
        //         let response = await axiosAuthorized.get('api/user/' + el.id);
        //         correctList = [...correctList, {
        //             name: el.name,
        //             logo: api + 'api/user/' + el.id + '/logo',
        //             role: '~Музыкант',
        //             id: el.id,
        //             email: response.data.email
        //         }];
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // }

        // setUsers(correctList);
        setUsers(list);
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

                {currPage === 0 ? (
                    <div className=''>
                        {requestsList.map(el => <RequestSong info={el} key={el.id}/>)}
                    </div>
                ) : (<></>)}
                
                {currPage === 1 ? (
                    <div className='admin-users'>
                        <div className='admin-users-list'>
                            <div className="searchbar-container">
                                <form>
                                    <button className='searchbar-submit' type='submit'>
                                        <img src={search} alt="" draggable='false' />
                                    </button>
                                    <input 
                                        className='searchbar' 
                                        type="text" 
                                        placeholder='Поиск'
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}/>
                                </form>
                            </div>

                            {users?.map(el => <button onClick={() => setCurrentUser(el)} key={el.id}><UserCard  info={el} /></button>)}
                            
                        </div>
                        <ChosenUser info={currentUser}/>
                    </div>
                ) : (<></>)}
            </div>
        </div>
    )
    else {
        return(
            <div className='comment-page-wrapper'>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Панель администратора</h2>
                    </div>
                    <Loader/>
                </div>
            </div>
        )
    }
}

export default AdminPanel