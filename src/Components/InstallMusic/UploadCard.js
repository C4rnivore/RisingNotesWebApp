import React from 'react';
import DA from '../../Images/DA.svg'
import play from '../../Images/Play.svg'
import plus from '../../Images/plus.svg'
import x from '../../Images/x.svg'

const DownloadCard = () => {
    function switchState() {

    }
    return (
        <div className='Dwnd'>
                <div className='Album'>
                    <img className='DA' src={DA} alt="обложка"/>
                    <button className='dwnd-button'>
                        Загрузить трек
                    </button>
                    <img className='play2' src={play} alt="проигрыватель"/>
                </div>
                <div className='Characteristics'>
                    <input className='input1' placeholder='Название песни'/>
                    <div className="input2-div">
                        <form action="#" method="post">
                            <input type="text"  className="input2" placeholder="Жанры"/>
                            <button className="add-button2" type="submit"><img className='plus' src={plus} alt="добавить"/></button>
                        </form>
                    </div>
                    <div className="tags">
                        <div className="tag1">
                            <span className="tag-t">
                                Placeholder
                            </span>
                            <span className="tag-cl"><img className='x' src={x} alt="удалить"/></span>
                        </div>
                    </div>
                    <div className="input3-div">
                        <form action="#" method="post">
                            <input type="text"  className="input2" placeholder="На что похоже"/>
                            <button className="add-button2" type="submit"><img className='plus' src={plus} alt="добавить"/></button>
                        </form>
                    </div>
                    <textarea className = 'authors-input' placeholder='Соавторы'/>
                    <div className="input5-div">
                        <form action="#" method="post">
                            <input type="text"  className="input2" placeholder="Настроение"/>
                            <button className="add-button2" type="submit"><img className='plus' src={plus} alt="добавить"/></button>
                        </form>
                    </div>
                    <select className='select1'>
                        <option value="" disabled selected>Пол исполнителя</option>
                        <option className='select1-option'>Мужской</option>
                        <option className='select1-option'>Женский</option>   
                    </select>
                    <p><p className='p1'>Есть текст? -</p><p className='p2'>Есть</p></p>
                    <label className="switch1">
                            <input type="checkbox"/>
                            <span className="slider round" onClick={switchState}></span>
                    </label>
                    <div className="input6-div">
                        <form action="#" method="post">
                            <input type="text"  className="input2" placeholder="Язык песни"/>
                            <button className="add-button2" type="submit"><img className='plus' src={plus} alt="добавить"/></button>
                        </form>
                    </div>
                    <p className='p3'>Ненормативная</p><p className='p4'>лексика? -</p><p className='p5'>Есть</p>
                    <label className="switch2">
                            <input type="checkbox"/>
                            <span className="slider round" onClick={switchState}></span>
                    </label>
                </div>
                <div className='Text'>
                    <h1 className='h1-text'>Текст&nbsp;песни</h1>
                    <textarea className = 'text-input' placeholder='Введите текст песни'/>
                </div>
        </div>
    );
};
    
export default DownloadCard;