import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../Registration/Registration.css'
import Header from "../Header/Header";
import Login from "../Login/Login"
import Registration from "../Registration/Registration";
import {Routes,Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
        </Routes>
    </div>
  );
}

export default App;
