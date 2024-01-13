import searchIcon from '../../Images/sidebar/Vector.svg'
import wave from '../../Images/sidebar/vave.svg'
import warning from '../../Images/sidebar/warning.svg'
import like from '../../Images/sidebar/like.svg'
import thumb from '../../Images/sidebar/playlist_thumb.png'
import { useContext, useEffect, useState } from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import player from "../Player/Player";
import SidebarCollapser from './SidebarCollpaser/SidebarCollapser'
import subsIcon from '../../Images/sidebar/subs-icon.svg';
import { PlaylistsContext, SearchQueryContext, axiosAuthorized, axiosUnauthorized } from '../App/App'
import { useCookies } from 'react-cookie'

function Sidebar(props) {
   const [search, setSearch] = useState(searchIcon)
   const [collapsed, setCollapsed] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
   const {searchInput, setSearchInput} = useContext(SearchQueryContext);
   const {playlists, setPlaylists} = useContext(PlaylistsContext);
   const [playlistsInfo, setPlaylistsInfo] = useState([]); 
   const navigate = useNavigate();
   const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);

   // Подтягивать с бэка?
   // const [playlists,setPlaylists] = useState([
   //    {name:'Лучшие треки', thumb: thumb },
   //    {name:'Подборка trash metal', thumb: thumb },
   //    {name:'Треки для вечеринки', thumb: thumb },
   //    {name:'Для поездок под дождем', thumb: thumb },
   // ])

   useEffect(()=>{
      setSearchInput(searchQuery);
      getPlaylistsInfo();
   },[searchQuery, playlists])

   function getPlaylistsInfo () {
      let arr = []

      playlists.map(el => {
         axiosUnauthorized.get(`api/playlist/${el}`)
         .then(
            response => {
               arr.push({
                  name: response.data.name,
                  id: el
               });
               setPlaylistsInfo(arr);
            }
         );
      });

      
   }

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
   const clearQuery =(e)=>{
      setSearchQuery('')
   }

   async function addNewPlaylist() {
      if (!cookies?.role) {
         navigate('/login');
      }
      let id = 0
      let formData = new FormData();
      formData.append('Name', 'Новый плейлист')
      await axiosAuthorized.post('api/playlist', formData, { headers: {
          "Content-Type": "multipart/form-data",
      }})
      .then (
         response => {
            id = response.data.id
            setPlaylists(e => e = [...e, id])
         }
      )
      navigate(`/playlist/${id}`)
  };

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
                     <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link wave active' : 'nav-link wave' )} 
                     to={'/'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={wave} alt="" className="nav-icon" />
                        <span>Моя волна</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link fav active' : 'nav-link fav ' )}
                     to={'/featured'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={like} alt="" className="nav_icon" />
                        <span >Избранное</span>
                     </NavLink>
                  </li>
                  <li> 
                     <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                     to={'/excluded'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={warning} alt="" className="nav-icon" />
                        <span >Исключенное</span>
                     </NavLink>
                  </li>
               <li> 
                  <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/subscriptions'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={subsIcon} alt="" className="nav-icon" />
                     <span>Подписки</span>
                  </NavLink>
               </li>
               </ul>
            </nav>
         </div>
         <div className="playlists-container">
            <span className="section-title">Плейлисты</span>
            <ul className="sidebar-playlists">
               {playlistsInfo.map((pl => 
                  <li className='sidebar-playlist' key={pl.id}>
                     {/* <img className='sidebar-playlist-thumb' alt="" /> */}
                     <NavLink to={`/playlist/${pl.id}`} className='sidebar-playlist-name' style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>{pl.name}</NavLink>
                  </li>
               ))}
               <li className='add-playlist' onClick={addNewPlaylist}>
                  <span className="add-playlist-icon">+</span>
                  <span className='sidebar-playlist-name'> Добавить плейлист</span>
               </li>
            </ul>
         </div>
      </div>
    </div>
   )
}
export default Sidebar;