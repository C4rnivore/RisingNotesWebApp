import "./ArtistInfo.css"
import subscribeIcon from '../../../../Images/artist-card/User_Add.svg'
import subsIcon from '../../../../Images/artist-card/Users.svg'
import linkIcon from '../../../../Images/artist-card/Link.svg'
import vkIcon from '../../../../Images/artist-card/Social Icons.svg'
import yandexIcon from '../../../../Images/artist-card/yandex.svg'

function ArtistInfo(props){
    
    const artistImage = props.artist.artistImage
    const artistName = props.artist.artistName
    const artistInfoText = props.artist.artistInfoText
    const subcribersCount = props.artist.subscribersCount
    const site = props.artist.socialLinks.site
    const vk = props.artist.socialLinks.vk
    const yandex = props.artist.socialLinks.yandex

    return(
        <div className="info-container">
            <img src={artistImage} alt="" className="artist-img" draggable='false'/>
            <div className="artist-info">
                <div className="row-top">
                    <span className="artist-name">{artistName}</span>
                    <button className="subscribe-btn">
                        <img src={subscribeIcon} alt="" draggable='false'/>
                        <span>Подписаться</span>
                    </button>
                </div>
                <div className="row-md">
                    <p className="artist-info-p">
                        {artistInfoText}
                    </p>
                </div>
                <div className="row-bottom">
                    <div className="left">
                        <img src={subsIcon} alt="" draggable='false'/>
                        <span>Подписчиков: {subcribersCount}</span>
                    </div>
                    <div className="right">
                        <div className="site">
                            <img src={linkIcon} alt="" draggable='false'/>
                            <a href={site} target="_blank">Сайт</a>
                        </div>
                        <div className="vk">
                            <img src={vkIcon} alt="" draggable='false'/>
                            <a href={vk} target="_blank">Вконтакте</a>
                        </div>
                        <div className="yandex">
                            <img src={yandexIcon} alt="" draggable='false'/>
                            <a href={yandex} target="_blank">Я.Музыка</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistInfo