import React from 'react';
import play from '../../Images/play.svg'
import Sidebar from '../Sidebar/Sidebar';
import BackButton from '../BackButton';
import DownloadCard from './DownloadCard';


function InstallMusic() {
    return (
        <div className='DownloadMusic'>
            <Sidebar/>
            <div className='backbutton'>
                    <BackButton/>
            </div>
            <div className='AdminDwndMusic'>
                <div className='Author'>
                        <p><p className='author-name'>Francis Owens</p><p className='tire'>-</p><p className='song-name'>Deconstructive Achievements</p></p>
                        <img className='play' src={play} alt="проигрыватель"/>
                        <button className='author-button'>
                            Подробнее об авторе
                        </button>
                </div> 
                <div className='publish-div'>
                        <button className='publish-button'>
                            Опубликовать
                        </button>
                        <button className='delete-button'>
                            Удалить
                        </button>
                        <button className='reject-button'>
                            Отклонить
                        </button>
                        <h1 className='publish-h1'>Причина отклонения</h1>
                        <textarea className = 'reject-input' placeholder='Начните писать...'/>
                </div>
                <div class="palka"></div>
            </div>
            <DownloadCard/>
        </div>
    );
}
export default InstallMusic;