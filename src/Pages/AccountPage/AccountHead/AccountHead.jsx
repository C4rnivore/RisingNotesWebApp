import defaultAvatar from '../../../Images/account-page/image-placeholder.png';
import statsIcon from '../../../Images/account-page/stats-icon.svg';
import subsIcon from '../../../Images/account-page/subs-icon.svg';
import creditIcon from '../../../Images/account-page/credit-card-red-icon.svg';
import { useEffect, useRef, useState } from 'react';

import { useCookies, withCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { api, axiosAuthorized, axiosUnauthorized } from '../../../Components/App/App';

export default function AccountHead (props) {
    const fileRef = useRef(null);
    const imgRef = useRef(null);
    const [subsCount, setSubsCount] = useState(0);
    const [isImageExist, setIsImageExist] = useState(false);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'subscriptions', 'userId']);


    useEffect(() => {
        axiosUnauthorized.get(api + `api/user/${cookies.userId}/logo?width=400&height=400`)
        .then(setIsImageExist(true))
        .catch(err => {
            console.log(err);
            setIsImageExist(false)
        });
        
        if (props.role === 'author' && props.authorId !== undefined) {
            axiosUnauthorized.get(api + `api/subscription/${props.authorId}/count`)
            .then(response => {
                setSubsCount(response.data.count);
            })
        }
    }, [isImageExist, props]);

    const handleFileInput = () => {
        fileRef.current.click();
    }

    const changeLogo = (event) => {
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
            setIsImageExist(!isImageExist);
            imgRef.current.src= api + `api/user/${cookies.userId}/logo?width=400&height=400`;
        });
    }

    return (
        <div className="account-page-head">
            <button className="account-page-avatar-button" onClick={handleFileInput}>
                <img alt='avatar' ref={imgRef} src={isImageExist ? 
                api + `api/user/${cookies.userId}/logo?width=400&height=400` : defaultAvatar}/>
            </button>
            <span>
                <h1 className="account-page-username">{props.userName}</h1>
                <p className='account-page-user-status'>{props.role === 'author' ? 'Музыкант' : 'Слушатель'}</p>
                {props.role === 'author' ? (
                    <>
                        <p className='account-page-stats'><img src={statsIcon}/>1456 прослушиваний в месяц</p>
                        <p className='account-page-stats'><img src={subsIcon}/>Подписчиков: {subsCount}</p>
                        <p className='account-page-stats'><img src={creditIcon}/>Месяц оплачен</p>
                    </>
                ) : <></>}
            </span>

            <input type='file' className='input-file' ref={fileRef} onChange={changeLogo}></input>
        </div>
    );
}