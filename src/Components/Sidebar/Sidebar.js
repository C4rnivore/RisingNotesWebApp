import logo from '../../Images/login/logo.svg'
import searchIcon from '../../Images/player/search-ico.svg'
import {Link, NavLink} from "react-router-dom";
import player from "../Player/Player";

function Sidebar() {
    function ToggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('sidebar-expanded')
    }
    const path = window.location.pathname+window.location.search;


    return (
        <div className="sidebar">
            <div id="sidebar" className="player__sidebar">
                <div className="sidebar__toggle-btn" onClick={ToggleSidebar}>
                    <div className="sidebar__toggle-btn-el"></div>
                    <div className="sidebar__toggle-btn-el"></div>
                    <div className="sidebar__toggle-btn-el"></div>
                </div>
                <div className="sidebar__label">
                    <span className="label">
                         music everywhere.<br/>for everyone
                    </span>
                    <img  src={logo} alt="" className="sidebar-logo"/>
                </div>
                <div className="sidebar__searchbar">
                    <form className="searchbar-form" action="#" method="post">
                        <input className="search-input" type="text" placeholder="Поиск музыканта" />
                        <button className="search" type="submit">
                            <img src={searchIcon} alt="" className="search-img"/>
                        </button>
                    </form>
                </div>
                <ul className="sidebar__menu">
                    <a className="sidebar-link" href="/">
                        <li className="nav-el" id="player">
                            <NavLink className="nav-link" to="/" >
                                Моя волна
                            </NavLink>
                        </li>
                    </a>
                    <a href="/featured">
                        <li className="nav-el" id="favourites">
                            <NavLink className="nav-link" to="/featured" >
                                Избранные
                            </NavLink>
                        </li>
                    </a>
                    <a href="/excluded">
                        <li className="nav-el" id="excluded">
                            <NavLink className="nav-link" to="/excluded" >
                                Исключенные
                            </NavLink>
                        </li>
                    </a>
                    <a href="/subscriptions">
                        <li className="nav-el" id="subs">
                            <NavLink className="nav-link" to="/subscriptions" >
                                Подписки
                            </NavLink>
                        </li>
                    </a>
                    <a href="/artistpage">
                        <li className="nav-el" id="personal-page">
                            <NavLink className="nav-link" to="/account" >
                                Личный кабинет
                            </NavLink>
                        </li>
                    <li className="nav-el" id="personal-page">
                        <NavLink className="nav-link" to="/adminpanel" >
                            Все авторы
                        </NavLink>
                    </li>
                    <li className="nav-el" id="personal-page">
                        <NavLink className="nav-link" to="/messages" >
                            Уведомления
                        </NavLink>
                    </li>
                    </a>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;