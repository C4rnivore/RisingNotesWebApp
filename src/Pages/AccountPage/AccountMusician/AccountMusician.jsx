import saveIcon from '../../../Images/account-page/save-icon.svg';
import linkIcon from '../../../Images/account-page/link-icon.svg';
import vkIcon from '../../../Images/account-page/vk-icon.svg';
import yandexIcon from '../../../Images/account-page/yandex-icon.svg';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CustomButton from '../../../Components/CustomButton/CustomButton';

export default function AccountMusician (props) {
    const [about, setAbout] = useState(props.about);
    const [vkLink, setVkLink] = useState(props.vkLink);
    const [yaMusicLink, setYaMusicLink] = useState(props.yaMusicLink);
    const [webSiteLink, setWebSiteLink] = useState(props.webSiteLink);

    const handleSave = async (event) => {
        // вызов обновления информации о музыканте
        try {
            let newInfo = {
                about: about,
                vkLink: vkLink,
                yaMusicLink: yaMusicLink,
                webSiteLink: webSiteLink,
            }
            await props.handleRefreshMusicianInfo(newInfo);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    return (
        <div className="account-page-user">
            <h2>Информация о музыканте</h2>
            <p>Описание</p>
            <textarea placeholder='Введите информацию о вас или вашей группе... ' 
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

            <CustomButton func={handleSave} icon={saveIcon} text={'Сохранить'} success={'Сохранено'}/>            
        </div>
    )
}