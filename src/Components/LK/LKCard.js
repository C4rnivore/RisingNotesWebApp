import React from 'react';
import Dima from '../../Images/Dima.svg'

const LKCard = () => {
    return (
        <div className='LKCard'>
            <img className='Dima' src={Dima} alt="zaglushka"/>
            <input className='LKCard-input' placeholder='ФИО'/>
            <input className='LKCard-input' placeholder='Почта'/>
            <button className='save'>
                Сохранить
            </button>
            <button className='change'>
                Изменить пароль
            </button>
            <button className='transition-button'>
                    Перейти в кабинет музыканта
            </button>
        </div>
    );
};
    
export default LKCard;