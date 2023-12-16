import searchIcon from '../../Images/sidebar/Vector.svg'
import wave from '../../Images/sidebar/vave.svg'
import warning from '../../Images/sidebar/warning.svg'
import like from '../../Images/sidebar/like.svg'
import thumb from '../../Images/sidebar/playlist_thumb.png'
import { useContext, useEffect, useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import player from "../Player/Player";
import SidebarCollapser from './SidebarCollpaser/SidebarCollapser'
import subsIcon from '../../Images/sidebar/subs-icon.svg';
import { SearchQueryContext } from '../App/App'

function Sidebar(props) {
   const [search, setSearch] = useState(searchIcon)
   const [collapsed, setCollapsed] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
   const {searchInput, setSearchInput} = useContext(SearchQueryContext)

   // Подтягивать с бэка?
   const [playlists,setPlaylists] = useState([
      {name:'Лучшие треки', thumb: thumb },
      {name:'Подборка trash metal', thumb: thumb },
      {name:'Треки для вечеринки', thumb: thumb },
      {name:'Для поездок под дождем', thumb: thumb },
   ])

   const handleCreatePlaylistBtn = () =>{
      return
   }

   useEffect(()=>{
      setSearchInput(searchQuery)
   },[searchQuery])

   const handleToggleMenu = () =>{
      const sidebar = document.getElementById('sidebar')
      if(sidebar.classList.contains('collapse')){
         sidebar.classList.remove('collapse')
         document.documentElement.style.setProperty('--sidebar-width', '400px');
         setCollapsed(false)
      }
      else{
         sidebar.classList.add('collapse')
         document.documentElement.style.setProperty('--sidebar-width', '40px');
         setCollapsed(true)
      }
   }

   const handleQueryChange = (e) =>{
      setSearchQuery(e.target.value)
   }

   return(
    <div className="sidebar" id='sidebar'>
      <SidebarCollapser collapseFunc={handleToggleMenu} collapsed={collapsed}/>
      <div className="sidebar-content">
         <div className="searchbar-container">
            <form action="" method='GET'>
               <button className='searchbar-submit' type='submit'>
                  <img src={search} alt="" />
               </button>
               <input 
               className='searchbar' 
               type="text" 
               placeholder='Поиск'
               value={searchInput}
               onInput={handleQueryChange}/>
            </form>
         </div>
         <div className="music-container">
            <span className="section_title">Музыка</span>
            <nav className='music-nav'>
               <ul className="nav-links">
                  <li>
                     <NavLink className ={({ isActive }) => (isActive ? 'nav-link wave active' : 'nav-link wave' )} 
                     to={'/'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={wave} alt="" className="nav-icon" />
                        <span>Моя волна</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink className ={({ isActive }) => (isActive ? 'nav-link fav active' : 'nav-link fav ' )}
                     to={'/featured'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={like} alt="" className="nav_icon" />
                        <span >Избранное</span>
                     </NavLink>
                  </li>
                  <li> 
                     <NavLink className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                     to={'/excluded'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={warning} alt="" className="nav-icon" />
                        <span >Исключенное</span>
                     </NavLink>
                  </li>
               <li> 
                  <NavLink className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/subscriptions'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={subsIcon} alt="" className="nav-icon" />
                     <span>Подписки</span>
                  </NavLink>
               </li>
               <li> 
                  <NavLink className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/login'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={subsIcon} alt="" className="nav-icon" />
                     <span>логин</span>
                  </NavLink>
               </li>
               <li> 
                  <NavLink className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/registration'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={subsIcon} alt="" className="nav-icon" />
                     <span>рега</span>
                  </NavLink>
               </li>
               <li> 
                  <NavLink className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/account'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={subsIcon} alt="" className="nav-icon" />
                     <span>аккаунт</span>
                  </NavLink>
               </li>
               </ul>
            </nav>
         </div>
         <div className="playlists-container">
            <span className="section-title">Плейлисты</span>
            <ul className="sidebar-playlists">
               {playlists.map((pl => 
                  <li className='sidebar-playlist' key={pl.name.toString()}>
                     <img className='sidebar-playlist-thumb' src={pl.thumb} alt="" />
                     <span className='sidebar-playlist-name'> {pl.name} </span>
                  </li>
               ))}
               <li className='add-playlist' onClick={handleCreatePlaylistBtn}>
                  <span className="add-playlist-icon">+</span>
                  <span className='sidebar-playlist-name'>Добавить плейлист</span>
               </li>
            </ul>
         </div>
      </div>
    </div>
   )
}
export default Sidebar;