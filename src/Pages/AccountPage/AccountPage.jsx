import BackButton from "../../Components/BackButton";
import AccountHead from "./AccountHead/AccountHead";
import userIcon from '../../Images/account-page/user-icon.svg';
import musicIcon from '../../Images/account-page/music-icon.svg';
import creditCard from '../../Images/account-page/credit-card-icon.svg';
import AccountUser from "./AccountUser/AccountUser";
import AccountMusician from "./AccountMusician/AccountMusician";
import { useEffect, useState } from "react";
import AccountPayment from "./AccountPayment/AccountPayment";
import { useCookies, withCookies } from 'react-cookie';
import {  api, axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';
import { jwtDecode } from 'jwt-decode';
import AccountNonMusician from "./AccountMusician/AccountNonMusician";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import blogIcon from '../../Images/account-page/blog.svg';
import clipsIcon from '../../Images/account-page/clips.svg';
import profileIcon from '../../Images/account-page/profile.svg';
import { useSelector } from "react-redux";
import './AccountPage.css';
import Songs from "./Songs/Songs";
import Clips from "./Clips/Clips";
import Blog from "./Blog/Blog";

export default function AccountPage () {
    const navigate = useNavigate();
    const [currPage, setCurrPage] = useState(0);
    const [userName, setUserName] = useState(undefined);
    const [about, setAbout] = useState(undefined);
    const [vkLink, setVkLink] = useState(undefined);
    const [yaMusicLink, setYaMusicLink] = useState(undefined);
    const [webSiteLink, setWebSiteLink] = useState(undefined);
    const [role, setRole] = useState(undefined);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
    const [authorId, setAuthorId] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [email, setEmail] = useState('');

    const resize = useSelector((state)=> state.resize.value)

    useEffect(() => {
        // попытка загрузки информации и перенаправление
        try {
            loadInfo();
        }
        catch (err) {
            navigate("/login");
        }
        
    }, []);

    async function loadInfo () {
        // загрузка информации: роль, информация о музыканте, имя пользователя
        setRole(cookies.role);
        const auth= jwtDecode(cookies.accessToken)?.authorId;
        if (auth) {
            await getMusicianInfo(auth);
        }
        await getUserInfo();
        setIsLoaded(true);
    }

    async function getUserInfo () {
        // получение имени пользователя
        await axiosAuthorized.get('/api/user')
        .then(response => {
            setUserName(response.data.userName);
            setEmail(response.data.email);
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const handleRefreshMusicianInfo = async (newInfo) => {
        // обновление информации о музыканте
        try {
            await axiosAuthorized.patch(api + `api/author/${authorId}`, {
                about: newInfo.about,
                vkLink: newInfo.vkLink,
                yaMusicLink: newInfo.yaMusicLink,
                webSiteLink: newInfo.webSiteLink
            })
            await getMusicianInfo(authorId);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async function getMusicianInfo (auth) {
        // получение информации о музыканте
        await axiosAuthorized.get(api + `api/author/${auth}`)
        .then(response => {
            // setUserName(response.data.name);
            setAbout(response.data.about);
            setVkLink(response.data.vkLink);
            setYaMusicLink(response.data.yaMusicLink);
            setWebSiteLink(response.data.webSiteLink);
            setAuthorId(auth);
        })
    }

    const changeUserName = async (name) => {
        // обновление имени пользователя
        try {
            await axiosAuthorized.patch('api/user', {
                userName: name
            })
            setUserName(name);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    const handleChangePage = (id) => {
        // смена страницы в лк
        setCurrPage(id);
    };

    if (isLoaded) {
        return (
            <div className="comment-page-wrapper">
                <div className="featured">
                    <BackButton/>
                    <AccountHead role={role} userName={userName} authorId={authorId}/>
                    <div className="account-page-menu">
                        <a onClick={() => handleChangePage(0)} 
                            className={currPage === 0 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                            {resize === 'standart' ? <img alt='icon' src={userIcon}/> : <></>}
                            Аккаунт
                        </a>
                        <a onClick={() => handleChangePage(role ==='author' ? 1 : 3)} 
                                    className={currPage === 1 || currPage === 3 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                    {resize === 'standart' ? <img alt='icon' src={profileIcon}/> : <></>}
                                    Профиль музыканта
                                </a>
                        {role === 'author' ? (
                            <>
                                <a onClick={() => handleChangePage(4)} 
                                    className={currPage === 4 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                    {resize === 'standart' ? <img alt='icon' src={musicIcon}/> : <></>}
                                    Треки
                                </a>
                                <a onClick={() => handleChangePage(5)} 
                                    className={currPage === 5 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                    {resize === 'standart' ? <img alt='icon' src={clipsIcon}/> : <></>}
                                    Клипы
                                </a>
                                <a onClick={() => handleChangePage(6)} 
                                    className={currPage === 6 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                    {resize === 'standart' ? <img alt='icon' src={blogIcon}/> : <></>}
                                    Блог
                                </a>
                                <a onClick={() => handleChangePage(2)} 
                                    className={currPage === 2 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                    {resize === 'standart' ? <img alt='icon' src={creditCard}/> : <></>}
                                    Оплата
                                </a>
                            </>
                            
                        ) : (<></>)}
                        
                    </div>

                    {currPage === 0 ? <AccountUser 
                        userName={userName}
                        changeUserName={changeUserName}
                        email={email}/> : <></>}
                    {currPage === 1 ? <AccountMusician 
                        authorId={authorId} 
                        about={about} 
                        vkLink={vkLink} 
                        webSiteLink={webSiteLink} 
                        yaMusicLink={yaMusicLink} 
                        artist={userName}
                        handleRefreshMusicianInfo={handleRefreshMusicianInfo}/> : <></>}
                    {currPage === 2 ? <AccountPayment/> : <></>}
                    {currPage === 3 ? <AccountNonMusician
                        userName={userName}/> : <></>}
                    {currPage === 4 ? <Songs/> : <></>}
                    {currPage === 5 ? <Clips/> : <></>}
                    {currPage === 6 ? <Blog/> : <></>}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="account-page-wrapper">
                <div className="account-page">
                    <BackButton/>
                    <Loader/>
                </div>
            </div> 
        )  
    }
}