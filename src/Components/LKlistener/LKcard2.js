import React from 'react';
import back from '../../Images/back.svg'
import Dima from '../../Images/Dima.svg'

const LKCard2 = () => {
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
            <div class="palochka"></div>
            <button className='transition-button'>
                    Перейти в кабинет музыканта
            </button>
            <div class="palochka2"></div>
        </div>
    );
};
    
export default LKCard2;