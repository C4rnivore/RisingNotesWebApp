import logo from '../../Images/login/logo.png'
import {Link} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useCookies, withCookies } from 'react-cookie';
import headphones from '../../Images/login/headphones.png';
import stripe from '../../Images/login/bottom-design-element.svg';
import { jwtDecode } from 'jwt-decode';

import { PlaylistsContext, SubscriptionsContext, api, axiosAuthorized, axiosUnauthorized } from '../App/App';

function Login() {
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [userName, setUserName] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const {subscriptions, setSubscriptions} = useContext(SubscriptionsContext);
    const {playlists, setPlaylists} = useContext(PlaylistsContext);

    const handleLogin = () => {
        if (!((userName === '' || userName === undefined) || (password === '' || password === undefined))) {
            axiosUnauthorized.post(`connect/token`, {
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
                console.log(response);
                setCookies('accessToken', response.data.access_token, { path: '/' });
                setCookies('refreshToken', response.data.refresh_token, { path: '/' });
                let decoded = jwtDecode(response.data.access_token);
                setCookies('authorId', decoded?.authorId, { path: '/' });
                setCookies('role', decoded.role, { path: '/' });
                const userId = jwtDecode(response.data.access_token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                setCookies('userId', userId, { path: '/' });

                axiosUnauthorized.get(api + `api/subscription/${userId}/list`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + response.data.access_token
                    },
                })
                .then(response => {
                    let arr = [];
                    response.data.subscriptionList.map(e => arr.push(e.authorId));
                    setSubscriptions(arr);
                    getPlaylists(userId);
                })
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    function getPlaylists(userId) {
        axiosUnauthorized.get(`api/playlist/list/${userId}`)
        .then (
            response => {
                let arr = [];
                response.data.playlistInfoList.map(e => arr.push(e.id));
                setPlaylists(arr);
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
                        <button className="login-submit-button"
                            onClick={handleLogin}>Войти</button>
                        <span className="login-form-subtext">
                            Еще нет аккаунта? <Link to="/registration" className='reg-a'>Регистрация</Link>
                    </span>
                </div>
            </div>
            <img src={headphones} className='headphones' alt=""/>
            <img src={stripe} className='decorative-stripe' alt=""/>
        </div>
    );
}
export default Login;