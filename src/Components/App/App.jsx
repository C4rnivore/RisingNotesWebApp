import './App.css';

import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";

import ArtistCard from '../../Pages/ArtistCard/ArtistCard.jsx'
import {Routes,Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, useSubmit, useNavigate} from 'react-router-dom';
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
import InstallVideo from '../../Pages/InstallVideo/InstallVideo';
import InstallVerticalVideo from '../../Pages/InstallVerticalVideo/InstallVerticalVideo';
import ErrorPage from '../../Pages/404Page/404Page';
import EditSong from '../../Pages/EditingSong/EditingSong';
import { FiltersProvider } from '../../Hooks/useFilters/useFilters';

import {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import AccountPage from '../../Pages/AccountPage/AccountPage';
import BlogVideo from '../../Pages/BlogVideo/BlogVideo.jsx';

export const api = 'https://rising-notes.tw1.su/';

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

export const axiosRefresh = axios.create({
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
export const SearchQueryContext = createContext({});

function App() {
    const navigate = useNavigate();

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
    const [searchInput, setSearchInput] = useState('')
  
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
            navigate("/login");
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
                navigate("/login");
            }
            return config;
        },
        error => {
            // Promise.reject(error);
            console.log(error);
        }
    );

    axiosAuthorized.interceptors.response.use(
        config => {
            return config;
        },
        error => {
            if (error.response.status === 404) {
                window.location.replace('/404');
                return Promise.reject(error.response);
            }
            else if (error.response.status === 500) {
                return Promise.reject(error.response);
                console.log("Ошибка на сервере");
            }
            else if (error.response.status === 401) {
                window.location.replace('/login');
                return Promise.reject(error.response);
            }
            else {
                return Promise.reject(error);
            }
        }
    );

    axiosUnauthorized.interceptors.response.use(
        config => {
            return config;
        },
        error => {
            if (error.response.status === 404) {
                // window.location.replace('/404');
                return Promise.reject(error.response);
            }
            else if (error.response.status === 500) {
                return Promise.reject(error.response);
                console.log("Ошибка на сервере");
            }
            else if (error.response.status === 401) {
                window.location.replace('/login');
                return Promise.reject(error.response);
            }
            else {
                return Promise.reject(error);
            }
        }
    )

    useEffect(() => {
        localStorage.setItem('SONGS', JSON.stringify(songs));
        localStorage.setItem('CURR_SONG', JSON.stringify(currentSong));
        localStorage.setItem('SUBS', JSON.stringify(subscriptions));
        localStorage.setItem('FEATURED', JSON.stringify(featured));
        localStorage.setItem('EXCLUDED', JSON.stringify(excluded));
        localStorage.setItem('PLAYLISTS', JSON.stringify(playlists));
    }, [songs, currentSong, subscriptions, featured, excluded, playlists]);
    // обновление переменных в браузере, только тогда когда чет поменялось

    function searchInputHandler(input) {
        setSearchInput(input)
    }

    return (
        <FiltersProvider>
        <SearchQueryContext.Provider value={{searchInput, setSearchInput}}>
            <PlaylistsContext.Provider value={{playlists, setPlaylists}}>
                <ExcludedContext.Provider value={{excluded, setExcluded}}>
                    <FeaturedContext.Provider value={{featured, setFeatured}}>
                        <SubscriptionsContext.Provider value={{subscriptions, setSubscriptions}}>
                            <CurrentSongContext.Provider value={{currentSong, setCurrentSong}}>
                                <PlayerContext.Provider value={{songs, setSongs}}>
                                    <div className="App">
                                        <Header/>
                                        <MusicPlayer/>
                                        <Sidebar></Sidebar>
                                        <SearchResults/>
                                        <Routes>
                                            <Route path={'/'} element={<Player/>}/>
                                            <Route path={'/login'} element={<Login/>}/>
                                            <Route path={'/registration'} element={<Registration/>}/>
                                            <Route path={'/artist/:id'} element={<ArtistCard/>}/>
                                            <Route path={'/featured'} element={<Featured/>}/>
                                            <Route path={'/excluded'} element={<Excluded/>}/>
                                            <Route path={'/account'} element={<AccountPage/>}/>
                                            <Route path={'/subscriptions'} element={<Subscriptions/>}/>
                                            <Route path={'/commentaries/:id'} element={<Commentaries/>}/>
                                            <Route path={'/adminpanel'} element={<AdminPanel/>}/>
                                            <Route path={'/playlist/:id'} element={<PlaylistWindow/>}/>
                                            <Route path={'/uploadmusic'} element={<InstallMusicNewDesign/>}/>
                                            <Route path={'/uploadvideo'} element={<InstallVideo/>}/>
                                            <Route path={'/uploadvertvideo'} element={<InstallVerticalVideo/>}/>
                                            <Route path={'/uploadmusic/:id'} element={<InstallMusicNewDesign/>}/>
                                            <Route path={'*'} element={<ErrorPage/>}/>
                                            <Route path={'/edit'} element={<EditSong/>}/>
                                            <Route path={'/verticalvideo'} element={<BlogVideo/>}/>
                                        </Routes>  
                                    </div>
                                </PlayerContext.Provider>
                            </CurrentSongContext.Provider>
                        </SubscriptionsContext.Provider>
                    </FeaturedContext.Provider>
                </ExcludedContext.Provider>
            </PlaylistsContext.Provider>
        </SearchQueryContext.Provider>
    </FiltersProvider>
    );
}

export default App;