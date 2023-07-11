import React from 'react';
import Dima from '../../Images/Dima.svg'
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';

const LKCard = () => {
    return (
        <div className='LKCard'>
            <img className='Dima' src={Dima} alt="photo"/>
            <div className='input-div'>
                <input className='LKCard-input1' placeholder='ФИО'/>
                <input className='LKCard-input1' placeholder='Почта'/>
            </div>
            <button className='save-button'>
                Сохранить
            </button>
            <button className='change-button'>
                Изменить пароль
            </button>
            <button className='change-button'>
                Выйти
            </button>
            <div class="palochka"></div>

            <Link to='/artistpage'>
                <button className='transition-button'>
                        Перейти в кабинет музыканта
                </button>
            </Link>
            
            <div class="palochka2"></div>
        </div>
    );
};
    
export default LKCard;