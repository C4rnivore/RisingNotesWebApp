import SongCover from '../Images/image-placeholder/song-cover-default.png';
import React from 'react';
import { Link } from 'react-router-dom';
import heart from '../Images/controller/heart.svg';
import message from '../Images/controller/message-circle.svg';
import dislike from '../Images/controller/thumbs-down.svg';
import list from '../Images/list.svg'


class Song extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            modalIsHidden: true
        }

        this.changeModalState = this.changeModalState.bind(this)
    }

    changeModalState() {
        this.setState({modalIsHidden: !this.state.modalIsHidden})
    }

    render() {
        return (
            <>
                <div className='track'>
                    <img alt='cover' src={SongCover}/>
                    <p className='song-title'>Deconstructive Achievements</p>
                    <p className='song-genre'>Джаз</p>
                    <p className='song-duration'>3:00</p>
                    
                    <a><img alt='list' src={list} onClick={() => this.changeModalState()}/></a>
                    <a><img alt='dislike' src={dislike}/></a>
                    <a><img alt='like' src={heart}/></a>
                    <a href='/commentaries'><img alt='comment' src={message}/></a>

                </div>
                {!this.state.modalIsHidden ? (
                        <div className="list-modal-container">
                        <div className="list-modal-window">
                            <div className="list-modal-content">
                                <span className="add-to-playlist">
                                    Добавить в плейлист
                                </span>
                                <div className="buttons-container">
                                        <button className="modal-button">Лучшие треки в моей жизни</button>
                                        <button className="modal-button">Подборка trash metal</button>
                                        <button className="modal-button">100 треков для вечеринки</button>
                                        <button className="modal-button">Для поездок за город</button>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                    ) : (<></>)}
            </>
        )
    }
}

export default Song