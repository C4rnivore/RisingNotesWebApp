import React, { useRef } from 'react';
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';
import { axiosAuthorized } from '../../Components/App/App';


function InputSongs({ setSong }){
    const [songs, setSongs] = useState([]);
    const [choosen, setChoosenSong] = useState([]);
    const [cookies, setCookies] = useCookies(['authorId']);

    function handleChangeSong(id) {
        setChoosenSong(id);
        setSong(id, songs.filter(e => e.id === id)[0].name); 
        console.log(id)
    }

    // Функция для выполнения запроса к API
    const fetchSongs = async () => {
        await axiosAuthorized.get(`api/author/${cookies.authorId}/song/list`)
        .then(response => {
            setSongs(response.data.songInfoList);
        })
        .catch(err =>{
            console.log(err)
        })
    };
  
    // Вызов функции при монтировании компонента
    useEffect(() => {
      fetchSongs();
    }, []);

    return (
        <div>
                <select className='choose-track-for-video' onChange={event => handleChangeSong(event.target.value)}>
                    {songs.map(song => (
                        <option key={song.id} value={song.id}>{song.name}</option>
                    ))}
                </select>  
        </div>
    )
}

export default InputSongs;