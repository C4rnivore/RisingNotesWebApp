import './ChosenUser.css';
import logo from '../../Images/account-page/user-icon.svg';
import defaultImg from '../../Images/main-placeholder.png';
import CustomButton from '../CustomButton/CustomButton';

export default function ChosenUser({info}) {
    if (info === undefined)
    return(<div className='chosen-user'>
        <img alt='logo' src={logo}/>
        <p>Выберите пользователя</p>
    </div>)
    return (<div className='chosen-user'>
        <div className='user-settings'>
            <img src={defaultImg} alt='image'/>
            <p>Имя пользователя</p>
            <input className="input-installmusic" placeholder={''}/>
            <p>Почта</p>
            <input className="input-installmusic" placeholder={''}/>
            <p>Роль</p>
            <select className="filters-select">
                <option value={0}>Слушатель</option>
                <option value={1}>Музыкант</option>
                <option value={2}>Администратор</option>
            </select>
            
        </div>
        <div className='chosen-user-buttons'>
            <CustomButton text={'Сохранить'}/>
        </div>
    </div>)
}