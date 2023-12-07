import saveIcon from '../../../Images/account-page/save-icon.svg';
import linkIcon from '../../../Images/account-page/link-icon.svg';
import vkIcon from '../../../Images/account-page/vk-icon.svg';
import yandexIcon from '../../../Images/account-page/yandex-icon.svg';
import plus from '../../../Images/account-page/plus-icon.svg';
import React, { useContext, useEffect, useState } from 'react';
import Song from './Song';
import { api, axiosUnauthorized } from '../../../Components/App/App';

export default function AccountMusician (props) {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        axiosUnauthorized.get(api + `api/author/${props.authorId}/song/list`)
        .then(response => {
            setSongs(response.data.songInfoList);
        })
    }, []);

    return (
        <div className="account-page-user">
            <h2>Информация о музыканте</h2>
            <p>Описание</p>
            <textarea placeholder='Введите информация о вас или вашей группе... ' className='account-page-textarea'>
                {props.about}
            </textarea>
            <p>Ссылки</p>
            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={linkIcon}/>Сайт</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' value={props.webSiteLink}></input>
            </div>

            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={vkIcon}/>Вконтакте</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' value={props.vkLink}></input>
            </div>

            <div className='account-page-link-wrapper'>
                <span><img alt='icon' src={yandexIcon}/>Я.Музыка</span>
                <input className='account-page-link' placeholder='Введите ссылку... ' value={props.yaMusicLink}></input>
            </div>

            <button className='account-page-filled-button'>
                <img alt='icon' src={saveIcon}/>
                Сохранить
            </button>

            <h2>Все треки</h2>
            <a className='account-page-add-song'><img alt='icon' src={plus}/>Добавить трек</a>

            <div className="tracks">
                {songs.map(el => <Song key={el.id} id={el.id} name={el.name} duration={el.durationMs} artist={props.artist}/>)}
            </div>
            {songs.length == 0 ? <p>Вы еще не загрузили ни одного трека</p> : <></>}
            
        </div>
    )
}