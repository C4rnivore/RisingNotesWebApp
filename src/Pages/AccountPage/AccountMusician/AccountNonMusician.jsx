import { useCookies } from 'react-cookie';
import { api, axiosAuthorized, axiosRefresh } from '../../../Components/App/App';
import musicIcon from '../../../Images/account-page/music-icon.svg';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export default function AccountNonMusician(props) {
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);

    async function handleMakeArtist() {
        await axiosAuthorized.post('api/author', {
            userId: cookies.userId,
            name: props.userName,
            about: "",
            vkLink: "",
            webSiteLink: "",
            yaMusicLink: ""
        })
        .catch(err => {throw err});

        await axiosRefresh.post('connect/token', {
            client_id: 'Api',
            client_secret: 'megaclientsecret',
            grant_type: 'refresh_token',
            refresh_token: cookies.refreshToken
        })
        .then(response => {
            setCookies('accessToken', response.data.access_token, { path: '/' });
            setCookies('refreshToken', response.data.refresh_token, { path: '/' });

            let decoded = jwtDecode(response.data.access_token);
            setCookies('authorId', decoded?.authorId, { path: '/' });

            const userId = jwtDecode(response.data.access_token)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            setCookies('userId', userId, { path: '/' });
            setCookies('role', decoded.role, { path: '/' });
        })
        .catch(err => {
            document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'authorId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            window.location.replace('login');
        })

        window.location.reload()
    };

    

    return (
        <div className='account-non-musician'>
            <p>Чтобы получить доступ к профилю музыканта, необходимо получить статус аккаунта <b>Музыкант</b></p>
            <button className="account-page-filled-button" onClick={handleMakeArtist}>
                <img alt='icon' src={musicIcon}/>
                Стать музыкантом!
            </button>
        </div>
    );
}