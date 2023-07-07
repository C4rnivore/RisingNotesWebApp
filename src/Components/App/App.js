import './App.css';
import '../Header/Header.css';
import '../Login/Login.css';
import '../../Pages/ArtistCard/ArtistCard.css';
import '../../Pages/Featured/Featured.css';
import Header from "../Header/Header";
import Login from "../Login/Login"
import ArtistCard from '../../Pages/ArtistCard/ArtistCard';
import {Routes,Route, Link} from 'react-router-dom';
import Featured from '../../Pages/Featured/Featured';
import Excluded from '../../Pages/Excluded/Excluded';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route  path={'/'} element={<Login/>}/>
            <Route  path={'/artist'} element={<ArtistCard/>}/>
            <Route  path={'/featured'} element={<Featured/>}/>
            <Route  path={'/excluded'} element={<Excluded/>}/>
        </Routes>
    </div>
  );
}

export default App;
