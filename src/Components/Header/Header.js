import alert from '../../Images/controller/alert-octagon.svg'
import heart from '../../Images/controller/heart.svg'
import message from '../../Images/controller/message-circle.svg'
import play from '../../Images/controller/play-circle.svg'
import rewind_forwrad from '../../Images/controller/rewind.svg'
import rewind_backward from '../../Images/controller/rewind-1.svg'
import dislike from '../../Images/controller/thumbs-down.svg'
import volume from '../../Images/controller/volume-2.svg'
import track_placeholder from '../../Images/image-placeholder/song-placeholder.png'
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header-left-container">
                <div className="header__track">
                    <img className="header__track-image" src={track_placeholder} alt=""/>
                    <div className="header__track-options">
                        <span className="header-text header__track-name">Francis Owens - Deconstructive Ac...</span>
                        <div className="track-range">
                            <input type="range" id="time" name="volume"
                                   min="0" max="100"/>
                            <span className="header-text header__track-duration">2:03</span>
                        </div>

                    </div>
                    <div className="header__track-controller">
                        <img className="track-controller__btn warning-btn" src={alert}></img>
                        <img className="track-controller__btn dislike-btn" src={dislike}></img>
                        <img className="track-controller__btn to-start-btn" src={rewind_backward}></img>
                        <img className="track-controller__btn play-btn" src={play}></img>
                        <img className="track-controller__btn to-end-btn" src={rewind_forwrad}></img>
                        <img className="track-controller__btn like-btn" src={heart}></img>
                        <img className="track-controller__btn lyrics-btn" src={message}></img>
                    </div>
                </div>
            </div>
            <div className="header-right-container">
                <img className="header-volume-btn" src={volume}></img>
                <div className="entrance-holder">
                    <span className="header-text entrance-btn entrance-signup-btn"><Link className="header-link" to='/registration'>Зарегистрироваться</Link></span>
                    <span className="header-text entrance-btn entrance-login-btn"><Link className="header-link" to='/login'>Войти</Link></span>
                </div>
            </div>
        </header>
    );
}

export default Header;