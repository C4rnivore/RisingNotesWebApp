import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import Header from "../Header/Header";
import Login from "../Login/Login"
import {Routes,Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route  path={'/'} element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
