import { useNavigate } from "react-router-dom"
import backIcon from '../../Images/artist-card/Chevron_Left.svg'
import ArtistImage from '../../Images/artist-card/artist-template.png'
import TrackTemplate from '../../Images/artist-card/Rectangle 161.png'

import ArtistInfo from "./ArtistCardComponents/ArtistInfo/ArtistInfo.jsx"
import TopTracks from "./ArtistCardComponents/TopTracks/TopTracks.jsx"

function ArtistCard(props){
    const navigate = useNavigate()
    const artist = {
        artistName: 'Francis Owens',
        artistImage: ArtistImage,
        artistInfoText:'Здесь будет описание исполнителя. Дебютный альбом от молодой группы Francis Owens - это смесь интересных гармоний, гитарных соло, высокого женского вокала, фанкового баса и множества экспериментов. Альбом писался на протяжении 4 лет и собрал в себе 10 треков о поисках себя, дружбе, смысле жизни, свободе и прочих экзистенциальных вопросах.',
        subscribersCount:228,
        socialLinks:{
            site:'#',
            vk:'#',
            yandex:'#'
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
    }
    const handleBackBtnClick = () =>{
        navigate(-1)
    }

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