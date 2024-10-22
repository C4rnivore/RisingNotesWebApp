import {  useEffect, useState } from 'react'
import {Link, NavLink} from "react-router-dom";
import { api, axiosPictures } from '../App/App';
import { useCookies } from 'react-cookie';
import logotype from '../../Images/logo.svg'
import FallDownMenu from '../FallDownMenu/FallDownMenu';
import Chevron from '../../Images/controller/chevron-left.svg';
import defaultAvatar from '../../Images/main-placeholder.png';
import burderImg from '../../Images/burger.svg';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';
import useMenuToggle from '../../Hooks/useMenuToggle/useMenuToggle';
import { useSelector } from 'react-redux';

import './Header.css';

function Header() {
    const [logo, setLogo] = useState(logotype);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    
    const resize = useSelector((state)=> state.resize.value)
    const {cleanQuery} = useSearchClean()
    const {toggler} = useMenuToggle()

    useEffect(() => {
        // проверка картинки
        if (cookies.userId) {
            setIsUserAuthorized(true);
            axiosPictures.get(api + `api/user/${cookies.userId}/logo?width=400&height=400`)
            .then(() => {
                setIsImageExist(true);
            })
            .catch(err => {
                setIsImageExist(false);
            });
        }
    }, []);

    return (
        <header className='header'>
            {resize === 'mobile' ? (
                <button onClick={toggler}><img src={burderImg} alt='menu'/></button>
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
                    {isMenuOpened ? <FallDownMenu callback={setIsMenuOpened}/> : <></>}
                </>
            ) : (
                <div className='unauth-header'>
                    <NavLink onClick={()=>cleanQuery()} draggable='false' to='/login' className={'header-menu-ref'}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        Войти</NavLink>
                    {resize === 'standart' ?(
                        <NavLink  onClick={()=>cleanQuery()} draggable='false' to='/registration' className={'header-menu-ref'}
                        style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                            Зарегистрироваться</NavLink>
                    ) : (<></>)}
                </div>
            )}
            
           
        </header>
    )
}
export default Header;