import logo from '../../Images/login/logo.png';
import {Link} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import { api } from '../App/App';
import headphones from '../../Images/login/headphones.png';
import stripe from '../../Images/login/bottom-design-element.svg';

import { axiosAuthorized, axiosUnauthorized } from '../App/App';

import './Registration.css';

function Registration() {
    const [userName, setUserName] = useState(undefined);
    const [mail, setMail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleRegistration = () => {
        if (!((userName === '' || userName === undefined) || 
            (password === '' || password === undefined) ||
            (mail === '' || mail === undefined))) {
                axiosUnauthorized.post('api/profile/registration', {
                    userName:userName,
                    email: mail,
                    password: password
                })
                .then(response => {
                    window.location.replace('/login');
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                })
            }
    }

    return (
        <div className="login_wrapper">
            <div className="login__content">
                <img className="login-logo" src={logo} alt="" draggable="false"/>
                <div className="login__content-form">
                    <span className="login-auth-form__label">Регистрация</span>
                        <input type="text" placeholder="Никнейм" className="login-input"
                            onChange={(e) => setUserName(e.target.value)} value={userName}/>
                        {userName == '' ? (<p className='warning-login'>*Обязательное поле</p>) : (<p className='warning-login'> </p>)}
                        <input type="email" placeholder="Почта" className="login-input"
                            onChange={e => setMail(e.target.value)} value={mail}/>
                        {mail == '' ? (<p className='warning-login'>*Обязательное поле</p>) : (<p className='warning-login'> </p>)}
                        <input type="password" placeholder="Пароль" className="login-input"
                            onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {password == '' ? (<p className='warning-login'>*Обязательное поле</p>) : (<p className='warning-login'> </p>)}
                        <button className="login-submit-button reg-button"
                            onClick={handleRegistration} >Зарегистрироваться</button>
                        <span className="login-form-subtext">
                            Уже зарегистрированы? <Link to="/login" className='reg-a'>Войти</Link>
                    </span>
                </div>
            </div>
            <img src={headphones} className='headphones' alt=""/>
            <img src={stripe} className='decorative-stripe' alt=""/>
        </div>
    );
}
export default Registration;