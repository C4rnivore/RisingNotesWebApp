import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../LK/LK.css';
import '../InstallMusic/InstallMusic.css'
import Header from "../Header/Header";
import Login from "../Login/Login"
import LK from "../LK/LK"
import LKlistener from "../LKlistener/LKlistener"
import InstallMusic from "../InstallMusic/InstallMusic"
import {Routes,Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route  path={'/'} element={<Login/>}/>
            <Route  path={'/LK'} element={<LK/>}/>
            <Route  path={'/LKlistener'} element={<LKlistener/>}/>
            <Route  path={'/InstallMusic'} element={<InstallMusic/>}/>
        </Routes>  
    </div>
  );
}

export default App;
