import { NavLink } from "react-router-dom";
import userIcon from '../../Images/account-page/user-icon.svg';
import settingsIcon from '../../Images/account-page/settings-icon.svg';
import exitIcon from '../../Images/account-page/exit-icon.svg';
import { useCookies } from "react-cookie";

export default function FallDownMenu () {
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);

    const logoutUser = () => {
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'authorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        window.location.replace('/');
    }

    return (
        <div className="fall-down-menu">
            <NavLink to='/account' className={'fall-down-menu-ref'}
            style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                <img src={userIcon}/>Личный кабинет</NavLink>
            {cookies.role === 'admin' ? (
                 <NavLink to='/adminpanel' className={'fall-down-menu-ref'}
                 style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={settingsIcon}/>Админ панель</NavLink>
                 
            ) : <></>}

            <button className="logout-button" onClick={logoutUser}>
                     <img src={exitIcon}/>Выход</button>
           
        </div>
    )
}