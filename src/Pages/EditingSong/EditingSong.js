import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import InstallMusicFilterComponent from '../InstallMusicNewDesign/InstallMusicFilterComponent';
import { useState, useEffect } from 'react'
import InstallMusicText from '../InstallMusicNewDesign/InstallMusicText';
import Save from '../../Images/installmusicimages/save.svg';
import { BsCloudArrowUp } from "react-icons/bs";


function EditingSong(){

    return (
                <div className='account-page-wrapper'>
                    <div className='glav-installmusic'>
                        <BackButton/>
                        <div className='song-information-1'>
                            <img className='playlistskin' alt='song-install-skin' src={PlaylistInstallSkin}/>
                            <h1 className='newtrack-h1'>Новый трек</h1>
                            <div className='uploadtrack-div'>
                                <div className='uploadtrack-div-inf'>
                                    <p className='uploadtrack-p1'>Перетащите свой трек сюда</p>
                                    <p className='uploadtrack-p2'>.mp3 или .wav, макс.100мб</p>
                                </div>
                                <p className='or'>или</p>
                                <button className='upload-file-installmusic'><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={25}/> Выберите файл</button>
                            </div>
                        </div>
                        <div className='song-information-2'>
                            <div className='column1'>
                                <h2 className='column1-h2'>Название трека</h2>
                                <input className='inp-column1' placeholder={'Введите название...'}/>
                                <h2 className='column1-h2'>Соавторы</h2>
                                <InstallMusicFilterComponent list={[]}/>
                                <h2 className='column1-h2'>Настроение</h2>
                                <InstallMusicFilterComponent list={[]}/>
                            </div>
                            <div className='column2'>
                                <h2 className='column2-h2'>Жанры</h2>
                                <InstallMusicFilterComponent list={[]}/>
                                <h2 className='column2-h2'>Пол исполнителя</h2>
                                <select className="filters-select">
                                    <option value="no">-</option>
                                    <option value="female">Женский</option>
                                    <option value="male">Мужской</option>
                                </select>
                                <h2 className='column2-h2'>На что похоже</h2>
                                <InstallMusicFilterComponent list={[]}/>
                            </div>
                        </div>
                        <div className='song-information-3' >
                            <InstallMusicText/>
                            <div id="myDiv" className='div-text'>
                                <h2 className='column1-h2'>Язык трека</h2>
                                <InstallMusicFilterComponent list={[]}/>
                                <h2 className='column1-h2'>Текст</h2>
                                <input id='myinput' className='inp-column1' placeholder={'Введите текст...'}/>
                                <div className="text-checkbox">
                                    <input type="checkbox" className='checkbox-button'/>
                                    <label className='label-checkbox'>Ненормативная лексика</label>
                                </div>
                                <div className='button-and-text'>
                                    <button className='upload-track-installmusic'><BsCloudArrowUp className='uploadcloud' alt='uploadcloud' size={23}/>Опубликовать*</button>
                                    <button className='save-installmusic'><img className='savetrack' alt='savetrack' src={Save}/> Сохранить</button>
                                </div>
                                <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                            </div>
                        </div>
                    </div>
                </div>
        )
}

export default EditingSong;