import saveIcon from '../../../Images/account-page/save-icon.svg';
import editIcon from '../../../Images/account-page/edit-icon.svg';
import { useState } from 'react';
import CustomButton from '../../../Components/CustomButton/CustomButton';

export default function AccountUser (props) {
    const [userName, setUserName] = useState(props.userName);
    const [email, setEmail] = useState(props.email);

    async function handleSave() {
        try {
            await props.changeUserName(userName);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    return (
        <div className="account-page-user">
            <h2>Основная информация</h2>
            <div className="account-page-user-inputs">
                <span className='account-page-user-input'>
                    <p>Имя пользователя</p>
                    <input placeholder="Введите ваш никнейм или имя" className='account-page-link'
                    value={userName} onChange={e => setUserName(e.target.value)}></input>
                </span>
                <span className='account-page-user-input'>
                    <p>Почта</p>
                    <input placeholder="Введите вашу почту" className='account-page-link' value={email}></input>
                </span>
            </div>
            <div className="account-page-user-buttons">
                <CustomButton func={handleSave} icon={saveIcon} text={'Сохранить'} success={'Сохранено'}/>

                <button className='account-page-unfilled-button'>
                    <img src={editIcon}/>
                    Изменить пароль
                </button>
            </div>
        </div>
    )
}