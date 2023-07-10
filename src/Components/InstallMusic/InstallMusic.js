import React from 'react';
import back from '../../Images/back.svg'
import DA from '../../Images/DA.svg'
import play from '../../Images/play.svg'

function InstallMusic() {
    return (
        <div className='LKglav'>
            <button className='back'>
                <img className='back-ph' src={back} alt="back-button"/> &nbsp;Назад 
            </button>
            <img className='DA' src={DA} alt="zaglushka"/>
            <input className='InstallMusic-input' placeholder='Название песни'/>
            <button className='save2'>
                Сохранить
            </button>
            <button className='installsong'>
                Загрузить трек
            </button>
            <img className='play' src={play} alt="проигрыватель"/>
            <input className='InstallMusic-input' placeholder='Жанры'/>
            <input className='InstallMusic-input' placeholder='На что похоже'/>
            <input className='InstallMusic-input' placeholder='Соавторы'/>
            <input className='InstallMusic-input' placeholder='Настроение'/>
            <select className='select1'>
                    <option className='select1-option'>Мужской</option>
                    <option className='select1-option'>Женский</option>   
            </select>
            <p className='textsong'>Текст песни</p>
            <input className='InstallMusic-input2' placeholder='Текст песни'/>
        </div>
    );
}
export default InstallMusic;