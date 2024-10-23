import { NavLink, useNavigate } from "react-router-dom";
import userIcon from '../../Images/account-page/user-icon.svg';
import settingsIcon from '../../Images/account-page/settings-icon.svg';
import exitIcon from '../../Images/account-page/exit-icon.svg';
import { useCookies } from "react-cookie";
import useSearchClean from "../../Hooks/useSearchClean/useSearchClean";

import './FallDownMenu.css';
import { useEffect } from "react";

export default function FallDownMenu ({callback}) {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);
    const {cleanQuery} = useSearchClean()

    const logoutUser = () => {
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'authorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        localStorage.clear();
        // navigate('/');
        window.location.replace('/');
    }

    return (
        <div className="fall-down-menu">
            
            {cookies.role === 'admin' ? (
                <NavLink draggable='false' to='/' className={'fall-down-menu-ref'} onClick={() => {cleanQuery(); callback(false)}}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                    <img draggable='false'src={settingsIcon}/>
                    Админ панель
                </NavLink>   
            ) : (
                <NavLink draggable='false' to='/account' className={'fall-down-menu-ref'} onClick={() => {cleanQuery(); callback(false)}}
                    style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                    <img draggable='false'src={userIcon}/>
                    Личный кабинет
                </NavLink>)
            }

            <button className="logout-button" onClick={logoutUser}>
                     <img draggable='false'src={exitIcon}/>Выход</button>
           
        </div>
    )
}