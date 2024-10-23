import { useNavigate, useParams } from "react-router-dom"
import ArtistImage from '../../Images/main-placeholder.png';
import TrackTemplate from '../../Images/main-placeholder.png';

import ArtistInfo from "../../Components/ArtistCardComponents/ArtistInfo/ArtistInfo.jsx"
import { useEffect, useState } from "react"
import { api, axiosAuthorized, axiosUnauthorized } from "../../Components/App/App.jsx"
import BackButton from "../../Components/BackButton.jsx";
import Songs from "../../Components/ArtistCardComponents/Songs/Songs.jsx"
import Blog from "../../Components/Blog/Blog.jsx"
import Clips from "../../Components/ArtistCardComponents/Clips/Clips.jsx";
import arrowRight from '../../Images/artist-card/Chevron_Right.svg'

import { useDispatch, useSelector } from "react-redux";
import { updateSubscriptionsValue } from "../../Redux/slices/subscriptionsSlice.js";

import './ArtistCard.css';

function ArtistCard(){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const subscriptions = useSelector((state)=>state.subscriptions.value)
    const params = useParams();
    const [artist, setArtist] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(subscriptions.includes(params.id));
    const [currPage, setCurrPage] = useState(0);

    const handleSubscribe = async () => {
        // подписка
        await axiosAuthorized.post(api + `api/subscription/${params.id}`)
        .then( r => {
            dispatch(updateSubscriptionsValue([...subscriptions, params.id]))
            setIsSubscribed(subscriptions.includes(params.id));
            setIsLoaded(false);
        })
        .catch(err => {console.log(err)});
    }

    const handleUnsubscribe = async () => {
        // отписка
        await axiosAuthorized.delete(api + `api/subscription/${params.id}`)
        .then( r => {
            dispatch(updateSubscriptionsValue(subscriptions.filter(el => el != params.id)))
            setIsSubscribed(subscriptions.includes(params.id));
            setIsLoaded(false);
        })
        .catch(err => {console.log(err)});
    }

    useEffect(() => {
        // обновление информации об авторе
        axiosUnauthorized.get(api + `api/subscription/${params.id}/count`)
        .then(resp => {
            axiosUnauthorized.get(api + `api/author/${params.id}`)
            .then(response => {
                setArtist({
                    userId: response.data.userId,
                    artistName: response.data.name,
                    artistImage: ArtistImage,
                    artistInfoText: response.data.about,
                    subscribersCount: resp.data.count,
                    socialLinks:{
                        site: response.data.webSiteLink,
                        vk: response.data.vkLink,
                        yandex:response.data.yaMusicLink
                    }
                });
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
                navigate(-1);
            })
        })
        .catch(err => {
            console.log(err);
            navigate(-1);
        })

    }, [isLoaded, params])   

    const handleChangePage = (id) => {
        // смена страницы в лк
        setCurrPage(id);
    };

    if (isLoaded || artist?.userId)
        return(
            <section className="comment-page-wrapper">
                <div className="featured">
                    <BackButton/>
                    <ArtistInfo artist={artist} 
                        handleSubscribe={handleSubscribe} 
                        handleUnsubscribe={handleUnsubscribe}/>

                    <div className="artist-card-menu">
                        <a onClick={() => handleChangePage(0)} 
                            className={currPage === 0 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                            Главная
                        </a>
                        <a onClick={() => handleChangePage(1)} 
                            className={currPage === 1 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                            Треки
                        </a>
                        <a onClick={() => handleChangePage(2)} 
                            className={currPage === 2 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                            Клипы
                        </a>
                        <a onClick={() => handleChangePage(3)} 
                            className={currPage === 3 ? 'artist-card-menu-item account-page-active' : 'artist-card-menu-item'}>
                            Блог
                        </a>
                    </div>

                    {currPage === 0 ? 
                    <>
                        <p className='top-tracks-title'>Треки
                        <button className='search-show-more' onClick={() => handleChangePage(1)}>
                            <span>Смотреть все</span>
                            <img src={arrowRight} alt="" />
                        </button>
                        </p>
                        <Songs artist={artist}/> 
                        <p className='top-tracks-title'>Клипы
                        <button className='search-show-more' onClick={() => handleChangePage(2)}>
                            <span>Смотреть все</span>
                            <img src={arrowRight} alt="" />
                        </button>
                        </p>
                        <Clips artistId={params.id}/> 
                        <p className='top-tracks-title'>Блог
                        <button className='search-show-more' onClick={() => handleChangePage(3)}>
                            <span>Смотреть все</span>
                            <img src={arrowRight} alt="" />
                        </button>
                        </p>
                        <Blog artistId={params.id}/>
                    </>: <></>}
                    {currPage === 1 ? <Songs artist={artist}/> : <></>}
                    {currPage === 2 ? <Clips artistId={params.id}/> : <></>}
                    {currPage === 3 ? <Blog artistId={params.id}/> : <></>}
                    
                </div>
                <img className="artist-bg-image" src={api + `api/user/${artist.userId}/logo?width=400&height=400`}/>
            </section>
        )
}

export default ArtistCard