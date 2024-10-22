import './App.css';
import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";

import ArtistCard from '../../Pages/ArtistCard/ArtistCard.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { createContext } from "react";
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';
import Subscriptions from '../../Pages/Subsriptions/Subscriptions';
import Commentaries from '../../Pages/Commentaries/Commentaries';
import AdminPanel from '../../Pages/AdminPanel/AdminPanel';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import PlaylistWindow from '../../Pages/PlaylistWindow/PlaylistWindow';
import SearchResults from '../SearchResults/SearchResults';
import UploadMusic from '../../Pages/UploadMusic/UploadMusic.jsx';
import UploadVideo from '../../Pages/InstallVideo/UploadVideo.jsx';
import InstallVerticalVideo from '../../Pages/UploadVerticalVideo/UploadVertVideo.jsx';
import ErrorPage from '../../Pages/404Page/404Page';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import AccountPage from '../../Pages/AccountPage/AccountPage';
import BlogVideo from '../../Pages/BlogVideo/BlogVideo.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import Footer from '../Footer/Footer.jsx';
import VideoPlayer from '../VideoPLayer/VideoPlayer.jsx';
import VertVideoPlayer from '../BlogVideoPlayer/BlogVideoPlayer.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { updateResizeValue } from '../../Redux/slices/resizeSlice.js';

export const api = process.env.REACT_APP_API_ENDPOINT;

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
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

export const axiosPictures = axios.create({
    baseURL: api,
    headers: {
        "Content-Type": "application/json",
    },
});

export const VideoPlayerContext = createContext({});
export const VertVideoPlayerContext = createContext({});
export const VertVideoInfoContext = createContext({});
// ссылка на переменную

function App() {
    //Redux Dispatcher
    const dispatch = useDispatch()

    //Redux slices
    const resize_ = useSelector((state) => state.resize.value)
    const playlists_ = useSelector((state) => state.playlists.value)
    const excluded_ = useSelector((state) => state.excluded.value)
    const featured_ = useSelector((state) => state.featured.value)
    const subscriptions_ = useSelector((state) => state.subscriptions.value)
    const currentSong_ = useSelector((state) => state.currentSong.value)
    const songs_ = useSelector((state) => state.songs.value)
    
    const navigate = useNavigate();
    const [errorVisibility, setErrorVisibility] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [video, setVideo] = useState('');
    const [vertvideo, setVertVideo] = useState('');
    const [vertVideoInfo, setVertVideoInfo] = useState('');
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);

    useEffect(() => {
        // изменение со стандартной на мобильную версию
        function handleResize() {
            if (window.innerWidth <= 720) {
                dispatch(updateResizeValue('mobile'))
            }
            else {
                dispatch(updateResizeValue('standart'))
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //обновление токена
    async function refreshTokens(config) {
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
                setCookies('userId', decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"], { path: '/' });
                setCookies('role', decoded.role, { path: '/' });
                setCookies('authorId', decoded?.authorId, { path: '/' });
                if (decoded.exp > new Date().getTime() / 1000)
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
            if (error.response?.status === 404) {
                setErrorText('Указанного объекта не существует');
                setErrorVisibility(true);
                // window.location.replace('/404');
                // return Promise.reject(error.response);
            }
            else if (error.response?.status === 413) {
                setErrorText('Слишком большой файл');
                setErrorVisibility(true);
                return Promise.reject(error.response);
            }
            else if (error.response?.status === 500) {
                console.log("Ошибка на сервере");
                setErrorText('Ошибка 500 на сервере');
                setErrorVisibility(true);
                return Promise.reject(error.response);
            }
            else if (error.response?.status === 401) {
                setErrorText('Вы не авторизированы');
                setErrorVisibility(true);
                window.location.replace('/login');
                return Promise.reject(error.response);
            }
            else if (error.response?.status === 400) {
                setErrorText(error.message);
                setErrorVisibility(true);
                return Promise.reject(error);
            }
            else {
                setErrorText(error.message);
                setErrorVisibility(true);
                return Promise.reject(error);
            }
        }
    );

    axiosUnauthorized.interceptors.response.use(
        config => {
            return config;
        },
        error => {
            if (error.response?.status === 404) {
                setErrorText('Указанного объекта не существует');
                setErrorVisibility(true);
                // window.location.replace('/404');
                // return Promise.reject(error.response);
            }
            else if (error.response?.status === 500) {
                setErrorText('Ошибка 500 на сервере');
                setErrorVisibility(true);
                console.log("Ошибка на сервере");
                return Promise.reject(error.response);
            }
            else if (error.response?.status === 401) {
                setErrorText('Вы не авторизированы');
                setErrorVisibility(true);
                window.location.replace('/login');
                return Promise.reject(error.response);
            }
            else if (error.response?.status === 400) {
                setErrorText(error.message);
                setErrorVisibility(true);
                return Promise.reject(error);
            }
            else {
                setErrorText(error.message);
                setErrorVisibility(true);
                return Promise.reject(error);
            }
        }
    )

    useEffect(() => {
        // логика появления ошибки
        if (errorVisibility) {
            const timer = setTimeout(() => {
                setErrorText('');
                setErrorVisibility(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorVisibility])

    useEffect(() => {
        // обновление переменных в браузере, только тогда когда чет поменялось
        localStorage.setItem('SONGS', JSON.stringify(songs_));
        localStorage.setItem('CURR_SONG', JSON.stringify(currentSong_));
        localStorage.setItem('SUBS', JSON.stringify(subscriptions_));
        localStorage.setItem('FEATURED', JSON.stringify(featured_));
        localStorage.setItem('EXCLUDED', JSON.stringify(excluded_));
        localStorage.setItem('PLAYLISTS', JSON.stringify(playlists_));
        localStorage.setItem('RESIZE', JSON.stringify(resize_));
    }, [songs_, currentSong_, subscriptions_, featured_, excluded_, playlists_, resize_]);

    return (
    <VideoPlayerContext.Provider value={{ video, setVideo }}>
        <VertVideoPlayerContext.Provider value={{ vertvideo, setVertVideo }}>
            <VertVideoInfoContext.Provider value={{vertVideoInfo, setVertVideoInfo}}>
                <div className="App">
                    <VertVideoPlayer />
                    <VideoPlayer />
                    <Header/>
                    <MusicPlayer/>
                    {cookies.role === 'admin' ? <></> : <Sidebar></Sidebar>}
                    <SearchResults/>
                    <ErrorMessage text={errorText} visibility={errorVisibility}/>
                    <Routes>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/artist/:id'} element={<ArtistCard/>}/>
                        <Route path={'/commentaries/:id'} element={<Commentaries/>}/>
                        <Route path={'/playlist/:id'} element={<PlaylistWindow/>}/>
                        <Route path={'/uploadmusic/:id'} element={<UploadMusic/>}/>
                        <Route path={'*'} element={<ErrorPage/>}/>
                        <Route path={'/verticalvideo'} element={<BlogVideo/>}/>
                        {cookies.role === 'admin' ? (<>
                            <Route path={'/'} element={<AdminPanel/>}/>
                        </>) : (
                        <>
                            <Route path={'/'} element={<Player/>}/>
                            <Route path={'/featured'} element={<Featured/>}/>
                            <Route path={'/excluded'} element={<Excluded/>}/>
                            <Route path={'/account'} element={<AccountPage/>}/>
                            <Route path={'/subscriptions'} element={<Subscriptions/>}/>
                            <Route path={'/uploadmusic'} element={<UploadMusic/>}/>
                            <Route path={'/uploadvideo'} element={<UploadVideo/>}/>
                            <Route path={'/uploadvertvideo'} element={<InstallVerticalVideo/>}/>
                        </>
                        )}
                        
                    </Routes>  
                    <Footer/>
                </div>
            </VertVideoInfoContext.Provider>
        </VertVideoPlayerContext.Provider>
    </VideoPlayerContext.Provider>
    );
}

export default App;