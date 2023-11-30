import saveIcon from '../../../Images/account-page/save-icon.svg';
import editIcon from '../../../Images/account-page/edit-icon.svg';

export default function AccountUser () {
    return (
        <div className="account-page-user">
            <h2>Основная информация</h2>
            <div className="account-page-user-inputs">
                <span className='account-page-user-input'>
                    <p>Имя пользователя</p>
                    <input placeholder="Введите ваш никнейм или имя" className='account-page-link'></input>
                </span>
                <span className='account-page-user-input'>
                    <p>Почта</p>
                    <input placeholder="Введите вашу почту" className='account-page-link'></input>
                </span>
            </div>
            <div className="account-page-user-buttons">
                <button className='account-page-filled-button'>
                    <img src={saveIcon}/>
                    Сохранить
                </button>

                <button className='account-page-unfilled-button'>
                    <img src={editIcon}/>
                    Изменить пароль
                </button>
            </div>
        </div>
    )
}