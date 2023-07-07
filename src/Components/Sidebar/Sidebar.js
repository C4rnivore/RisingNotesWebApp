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
                    <li className="nav-el" id="player">
                        <NavLink className="nav-link" to="/" >
                            Моя волна
                        </NavLink>
                    </li>
                    <li className="nav-el" id="favourites">
                        <NavLink className="nav-link" to="/path" >
                            Избранные
                        </NavLink>
                    </li>
                    <li className="nav-el" id="excluded">
                        <NavLink className="nav-link" to="/path" >
                            Исключенные
                        </NavLink>
                    </li>
                    <li className="nav-el" id="subs">
                        <NavLink className="nav-link" to="/path" >
                            Подписки
                        </NavLink>
                    </li>
                    <li className="nav-el" id="personal-page">
                        <NavLink className="nav-link" to="/path" >
                            Личный кабинет
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;