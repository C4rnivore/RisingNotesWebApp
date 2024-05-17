import defaultAvatar from '../../../Images/main-placeholder.png';
import statsIcon from '../../../Images/account-page/stats-icon.svg';
import subsIcon from '../../../Images/account-page/subs-icon.svg';
import creditIcon from '../../../Images/account-page/credit-card-red-icon.svg';
import bigEdit from '../../../Images/account-page/edit-big.svg';
import { useEffect, useRef, useState } from 'react';

import { useCookies, withCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { api, axiosAuthorized, axiosPictures, axiosUnauthorized } from '../../../Components/App/App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AccountHead (props) {
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const imgRef = useRef(null);
    const [subsCount, setSubsCount] = useState(0);
    const [auditionsCount, setAuditions] = useState(0);
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);


    useEffect(() => {
        // получение аватарки и количества прослушиваний музыканта, количество подписчиков
        axiosPictures.get(api + `api/user/${cookies.userId}/logo?width=400&height=400`)
        .then(setIsImageExist(true))
        .catch(err => {
            console.log(err);
            setIsImageExist(false)
        });
        
        if (props.role === 'author' && props.authorId !== undefined) {
            axiosUnauthorized.get(api + `api/subscription/${props.authorId}/count`)
            .then(response => {
                setSubsCount(response.data.count);
            });
            axiosAuthorized.get(`api/author/${props.authorId}/audition/count`)
            .then(response => {
                setAuditions(response.data.auditionCount);
            });
        }
    }, [props]);

    const handleFileInput = () => {
        fileRef.current.click();
    }

    const changeLogo = (event) => {
        // изменение аватарки
        event.preventDefault();
        const formData = new FormData();
        formData.append('File', event.target.files[0]);
        formData.append('type', 'image/jpeg');

        axiosAuthorized.patch(`api/user/logo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {
            window.location.reload();
        });
    }

    return (
        <div className="account-page-head">
            <button className="account-page-avatar-button" onClick={handleFileInput}>
                <div className='account-page-avatar-change'><img draggable='false' src={bigEdit}/></div>
                <img alt='avatar' ref={imgRef} src={isImageExist ? 
                api + `api/user/${cookies.userId}/logo?width=400&height=400` : defaultAvatar}/>
            </button>
            <span>
                <h1 className="account-page-username">{props.userName}</h1>
                <p className='account-page-user-status'>{props.role === 'author' ? 'Музыкант' : 'Слушатель'}</p>
                {props.role === 'author' ? (
                    <>
                        <p className='account-page-stats'><img src={statsIcon}/>Прослушиваний в месяц: {auditionsCount}</p>
                        <p className='account-page-stats'><img src={subsIcon}/>Подписчиков: {subsCount}</p>
                        <p className='account-page-stats'><img src={creditIcon}/>Месяц оплачен</p>
                    </>
                ) : <></>}
            </span>

            <input type='file' className='input-file' ref={fileRef} onChange={changeLogo}></input>
        </div>
    );
}