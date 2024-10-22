import logo from '../../Images/login/logo.png'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import headphones from '../../Images/login/headphones.png';
import stripe from '../../Images/login/bottom-design-element.svg';
import { jwtDecode } from 'jwt-decode';
import { api, axiosUnauthorized } from '../App/App';
import './Login.css';
import CustomButton from '../CustomButton/CustomButton';

import { useDispatch } from 'react-redux';
import { updatePlaylistsValue } from '../../Redux/slices/playlistsSlice';
import { updateExcludedValue } from '../../Redux/slices/excludedSlice';
import { updateFeaturedValue } from '../../Redux/slices/featuredSlice';
import { updateSubscriptionsValue } from '../../Redux/slices/subscriptionsSlice';

function Login() {
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [userName, setUserName] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const dispatch = useDispatch()

    async function handleLogin () {
        let decoded = undefined;
        let userId = undefined;
        let access_token = undefined;
        try {
            if (!((userName === '' || userName === undefined) || (password === '' || password === undefined))) {
                await axiosUnauthorized.post(`connect/token`, {
                    client_id: 'Api',
                    client_secret: 'megaclientsecret',
                    grant_type: 'password',
                    scope: 'Api offline_access',
                    username: userName,
                    password: password
                }, {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    }
                })
                .then(response => {
                    access_token = response.data.access_token;
                    setCookies('accessToken', response.data.access_token, { path: '/' });
                    setCookies('refreshToken', response.data.refresh_token, { path: '/' });
                    decoded = jwtDecode(response.data.access_token);
                    setCookies('authorId', decoded?.authorId, { path: '/' });
                    setCookies('role', decoded.role, { path: '/' });
                    userId = jwtDecode(response.data.access_token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                    setCookies('userId', userId, { path: '/' });
                })
                .catch(err => {
                    console.log(err);
                })

                await axiosUnauthorized.get(api + `api/subscription/${userId}/list`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + access_token
                    },
                })
                .then(response => {
                    let arr = [];
                    response.data.subscriptionList.map(e => arr.push(e.authorId));
                    dispatch(updateSubscriptionsValue(arr));
                })

                await axiosUnauthorized.get('api/song/favorite/list', {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + access_token
                    },
                })
                .then(response => {
                    let arr = []
                    response.data.songInfoList.map(el => arr.push(el.id));
                    dispatch(updateFeaturedValue(arr))
                })

                await axiosUnauthorized.get('api/excluded-track/list', {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + access_token
                    },
                })
                .then(response => {
                    let arr = []
                    response.data.excludedTrackList.map(el => arr.push(el.id));
                    dispatch(updateExcludedValue(arr))
                })
                
                await getPlaylists(userId);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async function getPlaylists(userId) {
        await axiosUnauthorized.get(`api/playlist/list/${userId}`)
        .then (
            response => {
                let arr = [];
                response.data.playlistInfoList.map(e => arr.push(e.id));
                dispatch(updatePlaylistsValue(arr))
                window.location.replace('/');
            })
    }

    return (
        <div className="login_wrapper">
            <div className="login__content">
                <img className="login-logo" src={logo} alt="" draggable="false"/>
                <div className="login__content-form">
                    <span className="login-auth-form__label">Вход</span>
                        <input type="email" placeholder="Почта" className="login-input"
                            onChange={(e) => setUserName(e.target.value)} value={userName}/>
                        {userName == '' ? (<p className='warning-login'>*Обязательное поле</p>) : (<p className='warning-login'> </p>)}
                        <input type="password" placeholder="Пароль" className="login-input"
                            onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {password == '' ? (<p className='warning-login'>*Обязательное поле</p>) : (<p className='warning-login'> </p>)}
                        {/* <button className="login-submit-button"
                            onClick={handleLogin}>Войти</button> */}
                        <CustomButton text={'Войти'} func={handleLogin} success={'Вы вошли в аккаунт!'}/>
                        <span className="login-form-subtext">
                            Еще нет аккаунта? <Link draggable='false' to="/registration" className='reg-a'>Регистрация</Link>
                    </span>
                </div>
            </div>
            <img draggable='false' src={headphones} className='headphones' alt=""/>
            <img draggable='false' src={stripe} className='decorative-stripe' alt=""/>
        </div>
    );
}
export default Login;