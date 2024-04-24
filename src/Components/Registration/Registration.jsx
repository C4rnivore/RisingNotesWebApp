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
import CustomButton from '../CustomButton/CustomButton';

function Registration() {
    const [userName, setUserName] = useState(undefined);
    const [mail, setMail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const handleRegistration = async () => {
        if (!((userName === '' || userName === undefined) || 
            (password === '' || password === undefined) ||
            (mail === '' || mail === undefined))) {
                try {
                    await axiosUnauthorized.post('api/profile/registration', {
                        userName:userName,
                        email: mail,
                        password: password
                    });
                    
                    window.location.replace('/login');
                }
                catch(err) {
                    console.log(err);
                    return Promise.reject(err);
                }
            }
        else {
            throw ErrorEvent;
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
                        {/* <button className="login-submit-button reg-button"
                            onClick={handleRegistration} >Зарегистрироваться</button> */}
                        <CustomButton text={'Зарегистрироваться'} func={handleRegistration} success={'Вы зарегистрированы!'}/>
                        <span className="login-form-subtext">
                            Уже зарегистрированы? <Link draggable='false' to="/login" className='reg-a'>Войти</Link>
                    </span>
                </div>
            </div>
            <img draggable='false' src={headphones} className='headphones' alt=""/>
            <img draggable='false' src={stripe} className='decorative-stripe' alt=""/>
        </div>
    );
}
export default Registration;