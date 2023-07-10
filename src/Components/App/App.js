import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../Registration/Registration.css'
import  '../Player/Player.css'
import  '../Sidebar/Sidebar.css'

import '../../Pages/ArtistCard/ArtistCard.css';
import '../../Pages/Featured/Featured.css';
import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";

import ArtistCard from '../../Pages/ArtistCard/ArtistCard';
import {Routes,Route, Link} from 'react-router-dom';
import {Fragment} from "react";
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path={'/'} element={<Fragment>
                <Sidebar></Sidebar>
                <Player></Player>
            </Fragment>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route  path={'/artist'} element={<ArtistCard/>}/>
            <Route  path={'/featured'} element={<Featured/>}/>
            <Route  path={'/excluded'} element={<Excluded/>}/>
        </Routes>
    </div>
  );
}

export default App;
