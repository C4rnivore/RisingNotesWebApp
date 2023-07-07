import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../Registration/Registration.css'
import  '../Player/Player.css'
import  '../Sidebar/Sidebar.css'

import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import Sidebar from "../Sidebar/Sidebar";
import Player from "../Player/Player";

import {Routes,Route, Link} from 'react-router-dom';
import {Fragment} from "react";

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
        </Routes>
    </div>
  );
}

export default App;
