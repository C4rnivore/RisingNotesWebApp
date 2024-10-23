import "./ArtistInfo.css"
import subscribeIcon from '../../../Images/artist-card/User_Add.svg'
import subsIcon from '../../../Images/artist-card/Users.svg'
import linkIcon from '../../../Images/artist-card/Link.svg'
import vkIcon from '../../../Images/artist-card/Social Icons.svg'
import yandexIcon from '../../../Images/artist-card/yandex.svg'
import defaultAvatar from '../../../Images/main-placeholder.png'
import { useEffect, useState } from "react"
import { api, axiosPictures } from "../../App/App"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

function ArtistInfo(props) {
    const artistImage = props.artist.artistImage
    const artistName = props.artist.artistName
    const artistInfoText = props.artist.artistInfoText
    const resize = useSelector((state)=> state.resize.value)
    const subscriptions = useSelector((state)=> state.subscriptions.value)
    const [subcribersCount, setSubscribersCount] = useState(props.artist.subscribersCount);
    const site = props.artist.socialLinks.site
    const vk = props.artist.socialLinks.vk
    const yandex = props.artist.socialLinks.yandex;
    const userId = props.artist.userId;

    const params = useParams();
    const [isSubscribed, setIsSubscribed] = useState(subscriptions.includes(params.id));
    const [isImageExist, setIsImageExist] = useState(false);

    useEffect(() => {
        // проверка наличия картинки и подписки
        axiosPictures.get(api + `api/user/${userId}/logo?width=400&height=400`)
        .then(setIsImageExist(true))
        .catch(err => {
            setIsImageExist(false)
        });

        setIsSubscribed(subscriptions.includes(params.id));
        setSubscribersCount(props.artist.subscribersCount);
    }, [subscriptions, props.artist]);

    return(
        <div className="info-container">
            <img src={isImageExist ? api + `api/user/${userId}/logo?width=400&height=400` : defaultAvatar} alt="" className="artist-img" draggable='false'/>
            <div className="artist-info">
                <div className="row-top">
                    <span className="artist-name">{artistName}</span>
                    {isSubscribed ? (
                        <button className={"subscribe-btn"} onClick={props.handleUnsubscribe}>
                            <img src={subscribeIcon} alt="" draggable='false'/>
                            <span>Отписаться</span>
                        </button>
                    ) : (
                        <button className={"subscribe-btn-red"} onClick={props.handleSubscribe}>
                            <img src={subscribeIcon} alt="" draggable='false'/>
                            <span>Подписаться</span>
                        </button>
                    )}
                    
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
                        {site.length > 0 ? 
                            <a className="site" href={site} target="_blank">
                                <img src={linkIcon} alt="" draggable='false'/>
                                <p>{resize === 'standart' ? 'Сайт' : ''}</p>
                            </a> : 
                        <></>}
                        {vk.length > 0 ? 
                            <a className="vk" href={vk} target="_blank">
                                <img src={vkIcon} alt="" draggable='false'/>
                                <p>{resize === 'standart' ? 'Вконтакте' : ''}</p>
                            </a> : 
                        <></>}
                        {yandex.length > 0 ? 
                            <a className="yandex" href={yandex} target="_blank">
                                <img src={yandexIcon} alt="" draggable='false'/>
                                <p>{resize === 'standart' ? 'Я.Музыка' : ''}</p>
                            </a>: 
                        <></>}
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistInfo