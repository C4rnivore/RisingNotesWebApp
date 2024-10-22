import'./SidebarCollapser.css'
import wave from '../../../Images/sidebar/vave.svg'
import warning from '../../../Images/sidebar/warning.svg'
import like from '../../../Images/sidebar/like.svg'
import { NavLink} from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import subsIcon from '../../../Images/sidebar/subs-icon.svg';

import { useDispatch, useSelector } from 'react-redux'
import { updateValue } from '../../../Redux/slices/searchSlice';

import './SidebarCollapser.css';

function SidebarCollapser(props){
   
   const resize = useSelector((state)=> state.resize.value)
   const [searchQuery, setSearchQuery] = useState('')
   const dispatch = useDispatch()

   const handleToggle = () => {
      props.collapseFunc()
   }
   
   const clearQuery =(e)=>{
      setSearchQuery('')
   }

   useEffect(()=>{
      dispatch(updateValue(searchQuery));
   },[searchQuery])



   if (resize === 'standart')
   return(
      <div className="collapser">
         {!props.collapsed? <button onClick={handleToggle}>&#x2039;</button> :<button onClick={handleToggle}>&#x203A;</button> }
         
         <nav className={!props.collapsed?'music-nav-collapser-colapsed':'music-nav-collapser'} >
            <ul className="nav-links-collapser">
               <li>
                  <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link wave active' : 'nav-link wave' )} 
                  to={'/'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={wave} alt="" className="nav-icon" />
                  </NavLink>
               </li>
               <li>
                  <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link fav active' : 'nav-link fav ' )}
                  to={'/featured'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={like} alt="" className="nav_icon" />
                  </NavLink>
               </li>
               <li> 
                  <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                  to={'/excluded'} 
                  style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                     <img src={warning} alt="" className="nav-icon" />
                  </NavLink>
               </li>
                  <li> 
                     <NavLink onClick={clearQuery} className ={({ isActive }) => (isActive ? 'nav-link remove active' : 'nav-link remove ' )}
                     to={'/subscriptions'} 
                     style={({ isActive }) => (isActive ? {color: '#FE1170'} : {color: '#787885'})}>
                        <img src={subsIcon} alt="" className="nav-icon" />
                     </NavLink>
                  </li>
            </ul>
         </nav>    
      </div>
   )
}

export default SidebarCollapser