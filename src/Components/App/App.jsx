import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../Registration/Registration.css';
import  '../Player/Player.css';
import  '../Sidebar/Sidebar.css';
import '../../Pages/Subsriptions/Subscriptions.css';
import '../../Pages/Commentaries/Commentaries.css';

import  '../../Pages/ArtistPersonalPage/ArtistPersonalPage.css';
import '../../Pages/ArtistCard/ArtistCard.css';
import '../../Pages/Featured/Featured.css';
import '../LK/LK.css';
import '../InstallMusic/InstallMusic.css';
import '../../Pages/AdminPanel/AdminPanel.css';
import '../../Components/PlaylistWindow/PlaylistWindow.css';
import '../Player/FilterComponent/FilterComponent.css'

import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";
import ArtistPersonalPage from "../../Pages/ArtistPersonalPage/ArtistPersonalPage";

import ArtistCard from '../../Pages/ArtistCard/ArtistCard';
import LK from "../LK/LK";
import LKlistener from "../LKlistener/LKlistener";
import InstallMusic from "../InstallMusic/InstallMusic";
import InstallMusicMusician from '../InstallMusicMusician/InstallMusicMusician';
import {Routes,Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import {Fragment} from "react";
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';
import Subscriptions from '../../Pages/Subsriptions/Subscriptions';
import Commentaries from '../../Pages/Commentaries/Commentaries';
import AdminPanel from '../../Pages/AdminPanel/AdminPanel';
import AdminMessages from '../../Pages/AdminMessages/AdminMessages';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Header/>}>
        <Route path={'/'} element={<Fragment>
            <Sidebar></Sidebar>
            <Player></Player>
        </Fragment>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/registration'} element={<Registration/>}/>
        <Route path={'/artist'} element={<ArtistCard/>}/>
        <Route path={'/featured'} element={<Featured/>}/>
        <Route path={'/excluded'} element={<Excluded/>}/>
        <Route path={'/account'} element={<LK/>}/>
        {/* <Route path={'/LKlistener'} element={<LKlistener/>}/> */}
        <Route path={'/upload'} element={<InstallMusic/>}/>
        <Route path={'/subscriptions'} element={<Subscriptions/>}/>
        <Route path={'/commentaries'} element={<Commentaries/>}/>
        <Route path={'/adminpanel'} element={<AdminPanel/>}/>
        <Route  path={'/artistpage'} element={<ArtistPersonalPage/>}/>
        <Route path={'/messages'} element={<AdminMessages/>}/>
    </Route>  
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
