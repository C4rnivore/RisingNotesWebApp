import { useNavigate, useParams } from "react-router-dom"
import backIcon from '../../Images/artist-card/Chevron_Left.svg'
import ArtistImage from '../../Images/artist-card/artist-template.png'
import TrackTemplate from '../../Images/artist-card/Rectangle 161.png'

import ArtistInfo from "./ArtistCardComponents/ArtistInfo/ArtistInfo.jsx"
import TopTracks from "./ArtistCardComponents/TopTracks/TopTracks.jsx"
import { useEffect, useState } from "react"
import { api, axiosUnauthorized } from "../App/App.jsx"

function ArtistCard(props){
    const navigate = useNavigate();
    const params = useParams();
    const [artist, setArtist] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axiosUnauthorized.get(api + `api/author/${params.id}`)
            .then(response => {
                setArtist({
                    artistName: response.data.name,
                    artistImage: ArtistImage,
                    artistInfoText: response.data.about,
                    subscribersCount:228,
                    socialLinks:{
                        site: response.data.webSiteLink,
                        vk: response.data.vkLink,
                        yandex:response.data.yaMusicLink
                    },
                    topTracks:[{
                        trackName:'Deconstructive Achievements',
                        trackCover: TrackTemplate
                    },{
                        trackName:'Infinite Rove',
                        trackCover: TrackTemplate
                    },{
                        trackName:'Noir Clouds',
                        trackCover: TrackTemplate
                    },{
                        trackName:'Meanwhile',
                        trackCover: TrackTemplate
                    }]
                });

                axiosUnauthorized.get(api + `api/author/${params.id}/song/list`)
                    .then(response => {
                        setSongs(response.data.songInfoList);
                    })
                    .catch(err => {
                        throw err;
                    })
                setIsLoaded(true);
            })
            .catch(err => {
                throw err;
            })
    }, [])

    const handleBackBtnClick = () =>{
        navigate(-1)
    };

    if (isLoaded)
        return(
            <section className="artist-card-container">
                <div className="content-container">
                    <div className="back-btn" onClick={handleBackBtnClick}>
                        <img src={backIcon} alt="" />
                        <span>Назад</span>
                    </div>
                    <ArtistInfo artist={artist}/>
                    <TopTracks artist={artist}/>
                </div>
                <img className="artist-bg-image" src={artist.artistImage}/>
            </section>
        )
}

export default ArtistCard