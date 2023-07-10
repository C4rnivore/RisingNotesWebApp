import React from 'react';
import back from '../../Images/back.svg'
import Dima from '../../Images/Dima.svg'

const LKCard2 = () => {
    return (
        <div className='LKCard'>
            <button className='back'>
                <img className='back-ph' src={back} alt="back-button"/> &nbsp;Назад 
            </button>
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
                    Стать музыкантом!
            </button>
        </div>
    );
};
    
export default LKCard2;