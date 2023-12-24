import saveIcon from '../../../Images/account-page/save-icon.svg';
import linkIcon from '../../../Images/account-page/link-icon.svg';
import vkIcon from '../../../Images/account-page/vk-icon.svg';
import yandexIcon from '../../../Images/account-page/yandex-icon.svg';
import plus from '../../../Images/account-page/plus-icon.svg';
import React, { useContext, useEffect, useState } from 'react';
import Song from './Song';
import { api, axiosAuthorized, axiosUnauthorized } from '../../../Components/App/App';
import { Link } from 'react-router-dom';

export default function AccountMusician (props) {
    const [uploads, setUploads] = useState([]);
    const [about, setAbout] = useState(props.about);
    const [vkLink, setVkLink] = useState(props.vkLink);
    const [yaMusicLink, setYaMusicLink] = useState(props.yaMusicLink);
    const [webSiteLink, setWebSiteLink] = useState(props.webSiteLink);

    useEffect(() => {
        // axiosUnauthorized.get(api + `api/author/${props.authorId}/song/list`)
        // .then(response => {
        //     setSongs(response.data.songInfoList);
        // })
        axiosAuthorized.get(`api/song/upload-request/list`)
        .then(response => {
            setUploads(response.data.publishRequestShortInfoList);
        })
    }, []);

    const handleSave = (event) => {
        event.preventDefault();
        let newInfo = {
            about: about,
            vkLink: vkLink,
            yaMusicLink: yaMusicLink,
            webSiteLink: webSiteLink,
        }

        props.handleRefreshMusicianInfo(newInfo);
    }

    return (
        <div className="account-page-user">
            <h2>Информация о музыканте</h2>
            <p>Описание</p>
            <textarea placeholder='Введите информация о вас или вашей группе... ' 
                className='account-page-textarea' onChange={e => setAbout(e.target.value)}>
                {about}
            </textarea>
            <p>Ссылки</p>
            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={linkIcon}/>Сайт</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' 
                    value={webSiteLink} onChange={e => setWebSiteLink(e.target.value)}></input>
            </div>

            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={vkIcon}/>Вконтакте</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' 
                    value={vkLink} onChange={e => setVkLink(e.target.value)}></input>
            </div>

            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={yandexIcon}/>Я.Музыка</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' 
                    value={yaMusicLink} onChange={e => setYaMusicLink(e.target.value)}></input>
            </div>

            <button className='account-page-filled-button' onClick={handleSave}>
                <img alt='icon' src={saveIcon}/>
                Сохранить
            </button>

            <h2>Все треки</h2>
            <Link to={'/installmusic'} className='account-page-add-song'><img alt='icon' src={plus}/>Добавить трек</Link>

            <div className="tracks">
                {uploads.map(el => <Song key={el.id} id={el.id} artist={props.artist} status={el.status}/>)}
            </div>
            {uploads.length == 0 ? <p>Вы еще не загрузили ни одного трека</p> : <></>}
            
        </div>
    )
}