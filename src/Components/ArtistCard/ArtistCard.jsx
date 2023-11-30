import { useNavigate, useParams } from "react-router-dom"
import backIcon from '../../Images/artist-card/Chevron_Left.svg'
import ArtistImage from '../../Images/artist-card/artist-template.png'
import TrackTemplate from '../../Images/artist-card/Rectangle 161.png'

import ArtistInfo from "./ArtistCardComponents/ArtistInfo/ArtistInfo.jsx"
import TopTracks from "./ArtistCardComponents/TopTracks/TopTracks.jsx"
import { useContext, useEffect, useState } from "react"
import { SubscriptionsContext, api, axiosAuthorized, axiosUnauthorized } from "../App/App.jsx"
import Song from "../Song.js"

function ArtistCard(props){
    const navigate = useNavigate();
    const params = useParams();
    const [artist, setArtist] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [songs, setSongs] = useState([]);
    const {subscriptions, setSubscriptions} = useContext(SubscriptionsContext);
    const [isSubscribed, setIsSubscribed] = useState(subscriptions.includes(params.id));

    useEffect(() => {
        axiosUnauthorized.get(api + `api/subscription/${params.id}/count`)
        .then(resp => {
            axiosUnauthorized.get(api + `api/author/${params.id}`)
            .then(response => {
                setArtist({
                    artistName: response.data.name,
                    artistImage: ArtistImage,
                    artistInfoText: response.data.about,
                    subscribersCount: resp.data.count,
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
        })
        .catch(err => {
            throw err;
        })

    }, [])

    const handleBackBtnClick = () =>{
        navigate(-1)
    };

    const handleSubscribe = () => {
        axiosAuthorized.post(api + `api/subscription/${params.id}`)
        .then( r => {
            setSubscriptions(e => e = [...e, params.id])
            setIsSubscribed(subscriptions.includes(params.id));
        });
    }

    const handleUnsubscribe = () => {
        axiosAuthorized.delete(api + `api/subscription/${params.id}`)
        .then( r => {
            setSubscriptions(e => e = e.filter(el => el != params.id))
            setIsSubscribed(subscriptions.includes(params.id));
        });
    }

    if (isLoaded)
        return(
            <section className="artist-card-container">
                <div className="content-container">
                    <div className="back-btn" onClick={handleBackBtnClick}>
                        <img src={backIcon} alt="" />
                        <span>Назад</span>
                    </div>
                    <ArtistInfo artist={artist} 
                        handleSubscribe={handleSubscribe} 
                        handleUnsubscribe={handleUnsubscribe}/>
                    <TopTracks artist={artist}/>
                    <div className="top-tracks-container">
                        <span className='top-tracks-title'>Все треки</span>
                        <div className="tracks">
                            {songs.map(el => (
                                <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={artist.artistName}/>
                            ))}
                            
                        </div>
                    </div>
                    
                </div>
                <img className="artist-bg-image" src={artist.artistImage}/>
            </section>
        )
}

export default ArtistCard