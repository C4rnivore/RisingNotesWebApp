import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Playlist from '../../Components/Playlist';
import Song from '../../Components/Song/Song';
import newPlaylist from '../../Images/featured/newplaylist.png';
import menu from '../../Images/controller/menu.svg'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { ExcludedContext, axiosUnauthorized } from '../../Components/App/App';
import { useCookies } from 'react-cookie';

function Excluded () {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);

    const {excluded, setExcluded} = useContext(ExcludedContext);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (!cookies.role) {
            navigate("/login");
        }
        getSongs();
    }, []);

    async function getSongs() {
        let array = [];
        for (var id of excluded) {
            await axiosUnauthorized.get(`api/song/${id}`)
            .then(response => {
                array.push(response.data);
            });
        }
        setSongs(array);
    }

    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <h2 className='sub-h2'>Исключенные треки</h2>
                <div className='tracks'>
                    {songs.map(el => (
                        <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={el.authorName} genres={el.genreList}/>
                    ))}
                    {songs.length === 0 ? <p style={{color: '#FE1170'}}>Список пуст</p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Excluded