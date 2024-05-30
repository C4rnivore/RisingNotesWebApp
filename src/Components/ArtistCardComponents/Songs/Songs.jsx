import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, axiosUnauthorized } from "../../App/App";
import Song from "../../Song/Song";
import '../TopTracks/TopTracks.css';

function Songs({artist}) {
    const params = useParams();
    const [songs, setSongs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        axiosUnauthorized.get(api + `api/author/${params.id}/song/list`)
            .then(response => {
                setSongs(response.data.songInfoList);
            })
            .catch(err => {
                throw err;
            })
        setIsLoaded(true);
    }, [params]);

    if (isLoaded)
    return (
        <div className="top-tracks-container">
            <div className="tracks">
                {songs.map(el => (
                    <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={artist.artistName} genres={el.genreList}/>
                ))}
            </div>
        </div>
    )
}

export default Songs;