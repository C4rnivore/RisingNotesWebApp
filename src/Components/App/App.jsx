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
import '../Player/FilterComponent/FilterComponent.css';
import '../MusicPlayer/MusicPlayer.css';

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
import React, {Fragment} from "react";
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';
import Subscriptions from '../../Pages/Subsriptions/Subscriptions';
import Commentaries from '../../Pages/Commentaries/Commentaries';
import AdminPanel from '../../Pages/AdminPanel/AdminPanel';
import AdminMessages from '../../Pages/AdminMessages/AdminMessages';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

import {useState, useEffect} from 'react';
import axios from 'axios';


export const api = 'https://2100237-gs89005.twc1.net/';
export const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkUxOUU2RTBEQjA1ODY4NDg0NjYwOUREOTVBRTc2RTQwIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTk2MDQ0ODksImV4cCI6MTY5OTYwODA4OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDk1IiwiYXVkIjoiQXBpIiwiY2xpZW50X2lkIjoiQXBpIiwic3ViIjoiOTBmN2QyNWUtNWYwOC00Y2Y1LWFjY2MtNmEyMjU4ZjU5NmYzIiwiYXV0aF90aW1lIjoxNjk5NjA0NDg5LCJpZHAiOiJsb2NhbCIsInJvbGUiOiJhdXRob3IiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNDM0NzYwNmItM2QzMi00YTg1LTgyNDQtZWRjM2UzMWI0OTdiIiwianRpIjoiMzQzOUM2MDA3MDdGMDg1MTI4QUNCRTdEQzVFRTVFMzMiLCJpYXQiOjE2OTk2MDQ0ODksInNjb3BlIjpbIkFwaSJdLCJhbXIiOlsicHdkIl19.uCNmNv9rCvp9QlA1--KbtdGq5u3_g08UP2GapfpV8BxeMLPp09-MTMJBVd3FCWHlqT3Tnm1YnXSk9tIlgsw7AiQYT90rGu1DMfmT4IBQxN-8N2sQtky_sLDBD38uVfa2huoFMr4W2M7YSQSNZPaV2RjpkqG624jevyq6xVnnypX24GeihQixlKtVZAw2PY6GHnD5Vh2BCQquFlV4szFSX5QzmAW_MaEIPKsFe9yhfrf32C0OIzcZEDLLQNkU0RWu4uo9Ultajx3TVDlHVK5LqxXUzLQlwWCO-dJuYmSiJERKeF9wiTDad1Iyx8bapL0V85dTZpOeRfv6QoLY940lbQ';


function App() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      axios.get(api + `api/song/list/${'4347606b-3d32-4a85-8244-edc3e31b497b'}`)
          .then(response => {
              setIsLoaded(true);
              setSongs(response.data.songInfoList);
              console.log(response.data.songInfoList);
          })
          .catch(error => {
              console.error(error);
              throw error;
          });
  }, [])
  
  if (isLoaded)
    return (
      <div className="App">
          <Header/>
          <MusicPlayer songsInfo={songs}/>
          <Routes>
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
              <Route path={'/commentaries/:id'} element={<Commentaries/>}/>
              <Route path={'/adminpanel'} element={<AdminPanel/>}/>
              <Route  path={'/artistpage'} element={<ArtistPersonalPage/>}/>
              <Route path={'/messages'} element={<AdminMessages/>}/>
          </Routes>  
      </div>
    );
}

export default App;
