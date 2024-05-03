import searchIcon from '../../Images/sidebar/Vector.svg';
import wave from '../../Images/sidebar/vave.svg';
import warning from '../../Images/sidebar/warning.svg';
import like from '../../Images/sidebar/like.svg';
import placeholder from '../../Images/main-placeholder.png';
import { useContext, useEffect, useState } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import SidebarCollapser from './SidebarCollpaser/SidebarCollapser'
import subsIcon from '../../Images/sidebar/subs-icon.svg';
import { PlaylistsContext, SearchQueryContext, api, axiosAuthorized, axiosPictures } from '../App/App'
import { useCookies } from 'react-cookie';
import useSearchClean from '../../Hooks/useSearchClean/useSearchClean';

import './Sidebar.css';



function Sidebar(props) {
   const [search, setSearch] = useState(searchIcon)
   const [collapsed, setCollapsed] = useState(true)
   const [searchQuery, setSearchQuery] = useState('')
   const {searchInput, setSearchInput} = useContext(SearchQueryContext);
   const {playlists, setPlaylists} = useContext(PlaylistsContext);
   const [playlistsInfo, setPlaylistsInfo] = useState([]); 
   const navigate = useNavigate();
   const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
   const {cleanQuery} = useSearchClean()

   useEffect(()=>{
      setSearchInput(searchQuery);
   },[searchQuery]);

   useEffect(() => {
      getPlaylistsInfo();
   }, [playlists])

   useEffect(()=>{
      setCollapsed(getInitState())
   },[])

   const updateLocalState = (value) =>{
      localStorage.setItem('SIDEBAR_STATE',value)
   }

   const getInitState = () =>{
      const collapsed = localStorage.getItem('SIDEBAR_STATE')
      if(!collapsed){
         localStorage.setItem('SIDEBAR_STATE','1')
         return true
      }
      return collapsed==='1' ? true : false  
   }


   async function getPlaylistsInfo() {
      // Получить или обновить информацию о плейлистах
      try {
         const arr = await Promise.all(playlists.map(async (el) => {
            const response = await axiosAuthorized.get(`api/playlist/${el}`)
            .catch(err => console.log(err));
            let img = true;
            await axiosPictures.get(api + `api/playlist/${el}/logo?width=400&height=400`)
            .catch(err => {
               img = false;
            });

            return {
               name: response?.data?.name,
               id: el,
               img: img
            };
         }));
      
         setPlaylistsInfo(arr);
      }
      catch (err) {
         console.log(err);
      }
   }     

   const handleToggleMenu = () =>{
      const sidebar = document.getElementById('sidebar')
      if(sidebar.classList.contains('collapse')){
         updateLocalState('0')
         setCollapsed(false) 
      }
      else{
         updateLocalState('1')
         setCollapsed(true)
      }
   }
   const handleQueryChange = (e) =>{
      setSearchQuery(e.target.value)
   }

   async function addNewPlaylist() {
      // Добавить новый плейлист
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
    <div className={collapsed ? "sidebar collapse" : "sidebar"} id='sidebar'>
      <SidebarCollapser collapseFunc={handleToggleMenu} collapsed={collapsed}/>
      <div className="sidebar-content">
         <div className="searchbar-container">
            <form action="" method='GET'>
               <button className='searchbar-submit' type='submit'>
                  <img src={search} alt="" draggable='false' />
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
                     <NavLink draggable='false' onClick={cleanQuery} className ={({ isActive }) => (isActive ? 'nav-link wave active' : 'nav-link wave' )} 
                     to={'/'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={wave} alt="" className="nav-icon" draggable='false' />
                        <span>Моя волна</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink draggable='false' onClick={cleanQuery} className ={({ isActive }) => (isActive ? 'nav-link fav active' : 'nav-link fav ' )}
                     to={'/featured'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={like} alt="" className="nav_icon" draggable='false' />
                        <span >Избранное</span>
                     </NavLink>
                  </li>
                  <li> 
                     <NavLink draggable='false' onClick={cleanQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                     to={'/excluded'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={warning} alt="" className="nav-icon" draggable='false' />
                        <span >Исключенное</span>
                     </NavLink>
                  </li>
                  <li> 
                     <NavLink draggable='false' onClick={cleanQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                     to={'/subscriptions'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={subsIcon} alt="" className="nav-icon" draggable='false' />
                        <span>Подписки</span>
                     </NavLink>
                  </li>
               </ul>
            </nav>
         </div>
         {cookies.accessToken !== undefined || cookies.role !== undefined || cookies.userId !== undefined ? 
            <div className="playlists-container">
            <span className="section-title">Плейлисты</span>
            <ul className="sidebar-playlists">
               {playlistsInfo.map((pl => 
                  <li className='sidebar-playlist' key={pl.id}>
                     <NavLink onClick={()=>cleanQuery()} draggable='false' to={`/playlist/${pl.id}`} className='sidebar-playlist-name' 
                        style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                           <img draggable='false' src={pl.img ? api + `api/playlist/${pl.id}/logo?width=400&height=400` : placeholder}/>
                           {pl.name}
                     </NavLink>
                  </li>
               ))}
               <li className='add-playlist' onClick={addNewPlaylist}>
                  <span className="add-playlist-icon">+</span>
                  <span className='sidebar-playlist-name'> Добавить плейлист</span>
               </li>
            </ul>
         </div> :
         <></>}
      </div>
    </div>
   )
}


export default Sidebar;