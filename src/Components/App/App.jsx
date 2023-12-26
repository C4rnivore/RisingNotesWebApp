import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../Registration/Registration.css';
import  '../Player/Player.css';
import  '../Sidebar/Sidebar.css';
import '../../Pages/Subsriptions/Subscriptions.css';
import '../../Pages/Commentaries/Commentaries.css';
import '../ArtistCard/ArtistCard.css';
import  '../Song/Song.css';

import  '../../Pages/ArtistPersonalPage/ArtistPersonalPage.css';
import '../../Pages/ArtistCard/ArtistCard.css';
import '../../Pages/Featured/Featured.css';
import '../LK/LK.css';
import '../InstallMusic/InstallMusic.css';
import '../../Pages/AdminPanel/AdminPanel.css';
import '../Player/FilterComponent/FilterComponent.css';
import '../MusicPlayer/MusicPlayer.css';
import '../../Pages/AccountPage/AccountPage.css';
import '../../Pages/PlaylistWindow/PlaylistWindow.css';
import '../../Pages/InstallMusicNewDesign/InstallMusicNewDesign.css';
import '../../Pages/404Page/404Page.css';
import '../../Pages/EditingSong/EditingSong.css';


import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";
import ArtistPersonalPage from "../../Pages/ArtistPersonalPage/ArtistPersonalPage";

import ArtistCard from '../ArtistCard/ArtistCard'
import LK from "../LK/LK";
import LKlistener from "../LKlistener/LKlistener";
import InstallMusic from "../InstallMusic/InstallMusic";
import InstallMusicMusician from '../InstallMusicMusician/InstallMusicMusician';
import {Routes,Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useSubmit} from 'react-router-dom';
import React, {Fragment, createContext} from "react";
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';
import Subscriptions from '../../Pages/Subsriptions/Subscriptions';
import Commentaries from '../../Pages/Commentaries/Commentaries';
import AdminPanel from '../../Pages/AdminPanel/AdminPanel';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import PlaylistWindow from '../../Pages/PlaylistWindow/PlaylistWindow';
import SearchResults from '../SearchResults/SearchResults';
import InstallMusicNewDesign from '../../Pages/InstallMusicNewDesign/InstallMusicNewDesign';
import ErrorPage from '../../Pages/404Page/404Page.js';
import EditSong from '../../Pages/EditingSong/EditingSong.js';




import {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import AccountPage from '../../Pages/AccountPage/AccountPage';

export const api = 'https://2100237-gs89005.twc1.net/';

export const axiosAuthorized = axios.create({
    baseURL: api,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosUnauthorized = axios.create({
    baseURL: api,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosRefresh = axios.create({
    baseURL: api,
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

export const PlayerContext = createContext({});
export const CurrentSongContext = createContext({});
export const SubscriptionsContext = createContext({});
export const FeaturedContext = createContext({});
export const ExcludedContext = createContext({});
export const PlaylistsContext = createContext({});
// ссылка на переменную

function App() {
    const songsJSON = localStorage.getItem('SONGS');
    const currentSongJSON = localStorage.getItem('CURR_SONG');
    const subsJSON = localStorage.getItem('SUBS');
    const featuredJSON = localStorage.getItem('FEATURED');
    const excludedJSON = localStorage.getItem('EXCLUDED');
    const playlistsJSON = localStorage.getItem('PLAYLISTS');
    // подгружаю из браузера

    const [subscriptions, setSubscriptions] = useState(subsJSON ? JSON.parse(subsJSON) : []);
    const [featured, setFeatured] = useState(featuredJSON ? JSON.parse(featuredJSON): []);
    const [songs, setSongs] = useState(songsJSON ? JSON.parse(songsJSON) : []);
    const [excluded, setExcluded] = useState(excludedJSON ? JSON.parse(excludedJSON) : []);
    const [currentSong, setCurrentSong] = useState(currentSongJSON ? JSON.parse(currentSongJSON) : '');
    // проверка на наличие
    const [playlists, setPlaylists] = useState(playlistsJSON ? JSON.parse(playlistsJSON) : []);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
  
    //обновление токена
    async function refreshTokens (config) {
        await axiosRefresh.post('connect/token', {
            client_id: 'Api',
            client_secret: 'megaclientsecret',
            grant_type: 'refresh_token',
            refresh_token: cookies.refreshToken
        })
        .then(response => {
            setCookies('accessToken', response.data.access_token, { path: '/' });
            setCookies('refreshToken', response.data.refresh_token, { path: '/' });

            let decoded = jwtDecode(response.data.access_token);
            setCookies('authorId', decoded?.authorId, { path: '/' });

            const userId = jwtDecode(response.data.access_token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            setCookies('userId', userId, { path: '/' });
            setCookies('role', decoded.role, { path: '/' });

            config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
        })
        .catch(err => {
            document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'authorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            window.location.replace('login');
        })
    }
  
    //Вставка токена в запрос и его проверка
    axiosAuthorized.interceptors.request.use(
        async config => {
            const accessToken = cookies.accessToken;
            const refreshToken = cookies.refreshToken;
            if (accessToken) {
                let decoded = jwtDecode(accessToken);
                setCookies('userId', decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],{ path: '/' });
                setCookies('role', decoded.role,{ path: '/' });
                setCookies('authorId', decoded?.authorId, { path: '/' });
                if (decoded.exp > new Date().getTime()/1000)
                    config.headers['Authorization'] = 'Bearer ' + accessToken;
                else {
                    await refreshTokens(config);
                }  
            }
            else if (refreshToken) {
                await refreshTokens(config);
            }
            else {
                window.location.replace('/login');
            }
            return config;
        },
        error => {
            Promise.reject(error);
            console.log(error);
        }
    );

    useEffect(() => {
        localStorage.setItem('SONGS', JSON.stringify(songs));
        localStorage.setItem('CURR_SONG', JSON.stringify(currentSong));
        localStorage.setItem('SUBS', JSON.stringify(subscriptions));
        localStorage.setItem('FEATURED', JSON.stringify(featured));
        localStorage.setItem('EXCLUDED', JSON.stringify(excluded));
        localStorage.setItem('PLAYLISTS', JSON.stringify(playlists));
    }, [songs, currentSong, subscriptions, featured, excluded, playlists]);
    // обновление переменных в браузере, только тогда когда чет поменялось

    const [searchInput, setSearchInput] = useState('')

    function searchInputHandler(input) {
        setSearchInput(input)
    }

    return (
        <PlaylistsContext.Provider value={{playlists, setPlaylists}}>
            <ExcludedContext.Provider value={{excluded, setExcluded}}>
                <FeaturedContext.Provider value={{featured, setFeatured}}>
                    <SubscriptionsContext.Provider value={{subscriptions, setSubscriptions}}>
                        <CurrentSongContext.Provider value={{currentSong, setCurrentSong}}>
                            <PlayerContext.Provider value={{songs, setSongs}}>
                                <div className="App">
                                    <Header/>
                                    <MusicPlayer/>
                                    <Sidebar searchHandler = {searchInputHandler} ></Sidebar>
                                    <SearchResults searchQuery={searchInput}/>
                                    <Routes>
                                        <Route path={'/'} element={<Player/>}/>
                                        <Route path={'/login'} element={<Login/>}/>
                                        <Route path={'/registration'} element={<Registration/>}/>
                                        <Route path={'/artist/:id'} element={<ArtistCard/>}/>
                                        <Route path={'/featured'} element={<Featured/>}/>
                                        <Route path={'/excluded'} element={<Excluded/>}/>
                                        <Route path={'/account'} element={<AccountPage/>}/>
                                        {/* <Route path={'/LKlistener'} element={<LKlistener/>}/> */}
                                        <Route path={'/upload'} element={<InstallMusic/>}/>
                                        <Route path={'/subscriptions'} element={<Subscriptions/>}/>
                                        <Route path={'/commentaries/:id'} element={<Commentaries/>}/>
                                        <Route path={'/adminpanel'} element={<AdminPanel/>}/>
                                        <Route path={'/artistpage'} element={<ArtistPersonalPage/>}/>
                                        <Route path={'/playlist/:id'} element={<PlaylistWindow/>}/>
                                        <Route path={'/installmusic'} element={<InstallMusicNewDesign/>}/>
                                        <Route path={'*'} element={<ErrorPage/>}/>
                                        <Route path={'/edit'} element={<EditSong/>}/>
                                    </Routes>  
                                </div>
                            </PlayerContext.Provider>
                        </CurrentSongContext.Provider>
                    </SubscriptionsContext.Provider>
                </FeaturedContext.Provider>
            </ExcludedContext.Provider>
        </PlaylistsContext.Provider>
    );
}

export default App;
