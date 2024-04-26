import { useContext, useEffect, useState } from 'react'
import logotype from '../../Images/logo.svg'
import {Link, NavLink} from "react-router-dom";
import FallDownMenu from '../FallDownMenu/FallDownMenu';
import Chevron from '../../Images/controller/chevron-left.svg';
import { ResizeContext, api, axiosUnauthorized } from '../App/App';
import { useCookies } from 'react-cookie';
import defaultAvatar from '../../Images/main-placeholder.png';
import burderImg from '../../Images/burger.svg';
import axios from 'axios';

import './Header.css';

function Header() {
    const [logo, setLogo] = useState(logotype);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const {resize, setResize} = useContext(ResizeContext);
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        if (cookies.userId) {
            setIsUserAuthorized(true);
            axiosUnauthorized.get(api + `api/user/${cookies.userId}/logo?width=400&height=400`)
            .then(() => {
                setIsImageExist(true);
            })
            .catch(err => {
                console.log(1111);
                setIsImageExist(false);
            });
        }
    }, []);

    const handleToggleMenu = () =>{
        const sidebar = document.getElementById('sidebar')
        if(sidebar.classList.contains('collapse')){
           sidebar.classList.remove('collapse')
           // document.documentElement.style.setProperty('--sidebar-width', '400px');
           setCollapsed(false)
        }
        else{
           sidebar.classList.add('collapse')
           // document.documentElement.style.setProperty('--sidebar-width', '40px');
           setCollapsed(true)
        }
    }

    return (
        <header className='header'>
            {resize === 'mobile' ? (
                <button onClick={handleToggleMenu}><img src={burderImg} alt='menu'/></button>
            ) : (
            <></>)}
            <div className="header_logo">
                <img draggable='false' src={logo} alt="" />
                <span className='logo_txt'><Link to={'/'} className='logo_link'>RISING NOTES</Link></span>
            </div>
            {isUserAuthorized ? (
                <>
                    <div className='header_pfp'>
                        {resize === 'standart' ? (
                            <span className={isMenuOpened ? "pfp_dropdown-down" : "pfp_dropdown-up"} 
                                onClick={() => setIsMenuOpened(!isMenuOpened)}>
                                <img draggable='false' src={Chevron}/>
                            </span>
                        ) : (
                        <></>)}
                        <img draggable='false' className="pfp_image" src={isImageExist ? 
                            api + `api/user/${cookies.userId}/logo?width=400&height=400` : defaultAvatar} alt="avatar"  
                            onClick={() => setIsMenuOpened(!isMenuOpened)}/>
                    </div>
                    {isMenuOpened ? <FallDownMenu/> : <></>}
                </>
            ) : (
                <div className='unauth-header'>
                    <NavLink draggable='false' to='/login' className={'header-menu-ref'}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        Войти</NavLink>
                    {resize === 'standart' ?(
                        <NavLink draggable='false' to='/registration' className={'header-menu-ref'}
                        style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                            Зарегистрироваться</NavLink>
                    ) : (<></>)}
                </div>
            )}
            
           
        </header>
    )
}
export default Header;