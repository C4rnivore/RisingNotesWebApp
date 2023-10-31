import searchIcon from '../../Images/sidebar/Vector.svg'
import wave from '../../Images/sidebar/vave.svg'
import warning from '../../Images/sidebar/warning.svg'
import like from '../../Images/sidebar/like.svg'
import thumb from '../../Images/sidebar/playlist_thumb.png'
import { useState } from 'react';
import {Link, NavLink} from "react-router-dom";
import player from "../Player/Player";

function Sidebar() {
   const [search, setSearch] = useState(searchIcon)

   // Подтягивать с бэка?
   const [playlists,setPlaylists] = useState([
      {name:'Лучшие треки', thumb: thumb },
      {name:'Подборка trash metal', thumb: thumb },
      {name:'Треки для вечеринки', thumb: thumb },
      {name:'Для поездок под дождем', thumb: thumb },
   ])

   return(
    <div className="sidebar">
      <div className="searchbar_container">
         <form action="" method='GET'>
            <button className='searchbar_submit' type='submit'>
               <img src={search} alt="" />
            </button>
            <input className='searchbar' type="text" placeholder='Поиск'/>
         </form>
      </div>
      <div className="music_container">
         <span className="section_title">Музыка</span>
         <nav className='music_nav'>
            <ul className="nav_links">
               <li>
                  <NavLink className ={({ isActive }) => (isActive ? 'nav_link wave active' : 'nav_link wave' )} 
                   to={'/'} 
                   style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={wave} alt="" className="nav_icon" />
                     <span className='link_label'>Моя волна</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink className ={({ isActive }) => (isActive ? 'nav_link fav active' : 'nav_link fav ' )}
                  to={'/login'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={like} alt="" className="nav_icon" />
                     <span className='link_label'>Избранное</span>
                  </NavLink>
               </li>
               <li> 
                  <NavLink className ={({ isActive }) => (isActive ? 'nav_link remove active' : 'nav_link remove ' )}
                  to={'/registration  '} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={warning} alt="" className="nav_icon" />
                     <span className='link_label'>Исключенное</span>
                  </NavLink>
               </li>
            </ul>
         </nav>
      </div>
      <div className="playlists-container">
         <span className="section_title">Плейлисты</span>
         <ul className="sidebar_playlists">
            {playlists.map((pl => 
               <li className='sidebar_playlist'>
                  <img className='sidebar_playlist_thumb' src={pl.thumb} alt="" />
                  <span className='sidebar_playlist_name'> {pl.name} </span>
               </li>
            ))}
            <li className='add_playlist'>
               <button className="add_playlist_btn">+</button>
               <span className='sidebar_playlist_name'>Добавить плейлист</span>
            </li>
         </ul>
      </div>
    </div>
   )
}
export default Sidebar;