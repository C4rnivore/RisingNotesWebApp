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
import { api, axiosAuthorized, axiosUnauthorized } from '../../Components/App/App';
import { jwtDecode } from 'jwt-decode';
import AccountNonMusician from "./AccountMusician/AccountNonMusician";

export default function AccountPage () {
    const [currPage, setCurrPage] = useState(0);
    const [userName, setUserName] = useState(undefined);
    const [about, setAbout] = useState(undefined);
    const [vkLink, setVkLink] = useState(undefined);
    const [yaMusicLink, setYaMusicLink] = useState(undefined);
    const [webSiteLink, setWebSiteLink] = useState(undefined);
    const [role, setRole] = useState(undefined);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);
    const [authorId, setAuthorId] = useState(undefined);

    useEffect(() => {
        try {
            setRole(cookies.role);
            const auth= jwtDecode(cookies.accessToken)?.authorId;
            if (auth) {
                getMusicianInfo(auth);
            }
        }
        catch (err) {
            window.location.replace('/login')
        }
        
    }, []);

    const handleRefreshMusicianInfo = (newInfo) => {
        axiosAuthorized.patch(api + `api/author/${authorId}`, {
            about: newInfo.about,
            vkLink: newInfo.vkLink,
            yaMusicLink: newInfo.yaMusicLink,
            webSiteLink: newInfo.webSiteLink
        })
        .then(getMusicianInfo(authorId));
    }

    const getMusicianInfo = (auth) => {
        axiosAuthorized.get(api + `api/author/${auth}`)
        .then(response => {
            setUserName(response.data.name);
            setAbout(response.data.about);
            setVkLink(response.data.vkLink);
            setYaMusicLink(response.data.yaMusicLink);
            setWebSiteLink(response.data.webSiteLink);
            setAuthorId(auth);
        })
    }

    const handleChangePage = (id) => {
        setCurrPage(id);
    };

    return (
        <div className="account-page-wrapper">
            <div className="account-page">
                <BackButton/>
                <AccountHead role={role} userName={userName} authorId={authorId}/>
                <div className="account-page-menu">
                    <a onClick={() => handleChangePage(0)} 
                        className={currPage === 0 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                            <img alt='icon' src={userIcon}/>Аккаунт
                    </a>
                    <a onClick={() => handleChangePage(role ==='author' ? 1 : 3)} 
                        className={currPage === 1 || currPage === 3 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                            <img alt='icon' src={musicIcon}/>Профиль музыканта
                    </a>
                    {role === 'author' ? (
                        <a onClick={() => handleChangePage(2)} 
                            className={currPage === 2 ? 'account-page-menu-item account-page-active' : 'account-page-menu-item'}>
                                <img alt='icon' src={creditCard}/>Оплата
                        </a>
                    ) : (<></>)}
                    
                </div>

                {currPage === 0 ? <AccountUser userName={userName}/> : <></>}
                {currPage === 1 ? <AccountMusician 
                    authorId={authorId} 
                    about={about} 
                    vkLink={vkLink} 
                    webSiteLink={webSiteLink} 
                    yaMusicLink={yaMusicLink} 
                    artist={userName}
                    handleRefreshMusicianInfo={handleRefreshMusicianInfo}/> : <></>}
                {currPage === 2 ? <AccountPayment/> : <></>}
                {currPage === 3 ? <AccountNonMusician/> : <></>}
            </div>
        </div>
    );
}