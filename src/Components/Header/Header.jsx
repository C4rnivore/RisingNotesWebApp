import { useEffect, useState } from 'react'
import pfp_placeholder from '../../Images/image-placeholder/pfp_placeholder.jpg'
import logotype from '../../Images/logo.svg'
import {Link, NavLink} from "react-router-dom";
import FallDownMenu from '../FallDownMenu/FallDownMenu';
import Chevron from '../../Images/controller/chevron-left.svg';
import { api, axiosUnauthorized } from '../App/App';
import { useCookies } from 'react-cookie';
import defaultAvatar from '../../Images/account-page/image-placeholder.png';

function Header() {
    const [pfp,setPfp] = useState(pfp_placeholder);
    const [logo, setLogo] = useState(logotype);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);

    useEffect(() => {
        if (cookies.userId) {
            setIsUserAuthorized(true);
            axiosUnauthorized.get(api + `api/user/${cookies.userId}/logo?width=400&height=400`)
            .then(setIsImageExist(true))
            .catch(err => {
                console.log(err);
                setIsImageExist(false)
            });
        }
    }, [])

    return (
        <header className='header'>
            <div className="header_logo">
                <img src={logo} alt="" />
                <span className='logo_txt'><Link to={'/'} className='logo_link'>RISING NOTES</Link></span>
            </div>
            {isUserAuthorized ? (
                <>
                    <div className='header_pfp'>
                        <span className={isMenuOpened ? "pfp_dropdown-down" : "pfp_dropdown-up"} 
                            onClick={() => setIsMenuOpened(!isMenuOpened)}>
                            <img src={Chevron}/>
                        </span>
                        
                        <img className="pfp_image" src={isImageExist ? 
                            api + `api/user/${cookies.userId}/logo?width=400&height=400` : defaultAvatar} alt="avatar"  
                            onClick={() => setIsMenuOpened(!isMenuOpened)}/>
                    </div>
                    {isMenuOpened ? <FallDownMenu/> : <></>}
                </>
            ) : (
                <div className='unauth-header'>
                    <NavLink to='/login' className={'header-menu-ref'}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        Войти</NavLink>/
                    <NavLink to='/registration' className={'header-menu-ref'}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        Зарегистрироваться</NavLink>
                </div>
            )}
            
           
        </header>
    )
}
export default Header;