import React from 'react';
import BackButton from '../../Components/BackButton';
import PlaylistInstallSkin from '../../Images/installmusicimages/Group 67.png';
import Cloud from '../../Images/installmusicimages/cloud.svg';
import InstallMusicFilterComponent from './InstallMusicFilterComponent';
import { useState, useEffect } from 'react'
import InstallMusicText from './InstallMisicText';
import Save from '../../Images/installmusicimages/save.svg';


function InstallMusicNewDesign(){
    // let filtersInitial = {
    //     genre : [],
    //     genreOrAnd: 'and',

    //     language : [],
    //     languageOrAnd: 'and',

    //     similar : [],
    //     similarOrAnd: 'and',

    //     mood : [],
    //     moodOrAnd: 'and',
        
    //     duration : 'any',
        
    //     extra: {
    //             explicit : "Disabled",
    //             removed : "Disabled"}
    // }
    // const [filters,setFilters] = useState(filtersInitial)

    // const filtersUpdateFunction = (filterId, filterValue, filterOrAnd = null) => {
    //     let temp = filters
    //     switch(filterId){
    //         case "genre":
    //             temp.genre = filterValue
    //             temp.genreOrAnd = filterOrAnd
    //             break
    //         case "language":
    //             temp.language = filterValue
    //             temp.languageOrAnd = filterOrAnd
    //             break
    //         case "similar":
    //             temp.similar = filterValue
    //             temp.similarOrAnd = filterOrAnd
    //             break
    //         case "mood":
    //             temp.mood = filterValue
    //             temp.moodOrAnd = filterOrAnd
    //             break
    //         case "duration":
    //             temp.duration = filterValue
    //             break
    //         case "extra":
    //             temp.extra = filterValue
    //             break
    //     }
    //     setFilters(temp)
    //     console.log(filters);
    // }

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
                                <button className='upload-file-installmusic'><img className='uploadcloud' alt='uploadcloud' src={Cloud}/> Выберите файл</button>
                            </div>
                        </div>
                        <div className='song-information-2'>
                            <div className='column1'>
                                <h2 className='column1-h2'>Название трека</h2>
                                <input className='inp-column1' placeholder={'Введите название'}/>
                                <h2 className='column1-h2'>Соавторы</h2>
                                <InstallMusicFilterComponent/>
                                <h2 className='column1-h2'>Настроение</h2>
                                <InstallMusicFilterComponent/>
                            </div>
                            <div className='column2'>
                                <h2 className='column2-h2'>Жанры</h2>
                                <InstallMusicFilterComponent/>
                                <h2 className='column2-h2'>Пол исполнителя</h2>
                                <select className="filters-select">
                                    <option value="no">-</option>
                                    <option value="female">Женский</option>
                                    <option value="male">Мужской</option>
                                </select>
                                <h2 className='column2-h2'>На что похоже</h2>
                                <InstallMusicFilterComponent/>
                            </div>
                        </div>
                        <div className='song-information-3' >
                            <InstallMusicText/>
                            <button className='upload-track-installmusic'><img className='uploadcloud' alt='uploadcloud' src={Cloud}/> Опубликовать*</button>
                            <button className='save-installmusic'><img className='savetrack' alt='savetrack' src={Save}/> Сохранить</button>
                            <text className='warning-upload'>*перед публикацией трек будет отправлен на модерацию</text>
                        </div>
                    </div>
                </div>
        )
}

export default InstallMusicNewDesign;