import songPlaceholder from '../../Images/image-placeholder/song-cover-placeholder.png'
import alert from '../../Images/controller/alert-octagon.svg'
import heart from '../../Images/controller/heart.svg'
import message from '../../Images/controller/message-circle.svg'
import play from '../../Images/controller/play-circle.svg'
import rewind_forward from '../../Images/controller/rewind.svg'
import rewind_backward from '../../Images/controller/rewind-1.svg'
import dislike from '../../Images/controller/thumbs-down.svg';
import plus from '../../Images/plus.svg';

import {Link} from "react-router-dom";
import TagItem from '../TagItem'
import Slider from '../Slider'

function Player() {
    return (
        <div className="player">
            <div className="player__content-wrapper">
                <div className="p-col text-area" >
                    <div id="lyrics" className="text-container">
                        <span className="song-lyrics">Текст песни</span>
                        <p>
                            <span>
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                                Cum dolores ea, expedita labore
                                laudantium optio vero! Ad aliquam,
                                aliquid eum, facere libero nobis
                                omnis perferendis placeat quas tempora
                                vel voluptatibus.
                            </span>
                            <span>
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                                Cum dolores ea, expedita labore
                                laudantium optio vero! Ad aliquam,
                                aliquid eum, facere libero nobis
                                omnis perferendis placeat quas tempora
                                vel voluptatibus.
                            </span>
                            <span>
                                Dolores eius exercitationem illo
                                nesciunt quisquam, tenetur voluptate.
                                At deserunt et illum, minus nisi nostrum
                                porro qui quo reprehenderit! Consectetur
                                exercitationem nam non odit quam saepe
                                veritatis voluptas voluptatibus. Error.
                            </span>
                            <span>
                                Deserunt fuga ipsa iusto,
                                laboriosam libero omnis quidem tenetur!
                                Deleniti facilis id laboriosam nemo nisi,
                                placeat voluptatem! Adipisci, alias asperiores
                                eius magnam nam nesciunt numquam officiis omnis
                                quas repellat soluta?
                            </span>
                            <span>
                                Adipisci,
                                atque beatae commodi debitis enim est
                                et explicabo illo illum, impedit laudantium
                                maiores minus molestiae neque nihil nobis
                                nulla numquam quas repellendus rerum sint
                                sit temporibus totam ut vel.
                            </span>
                            <span>
                                Aperiam, eveniet, minus? Accusantium
                                aliquid commodi consequuntur id laboriosam
                                minima sapiente sed sequi! Animi aperiam
                                asperiores at, aut, autem cumque est ex id,
                                nostrum nulla possimus quia repellendus sint
                                voluptatibus.
                            </span></p>
                    </div>
                </div>
                <div className="p-col main-player">
                    <div className="main-player__cover">
                        <span className="cur-playing">Сейчас играет...</span>
                        <img src={songPlaceholder} alt="" className="song-cover"/>
                        <div className="player-song-title">
                            <p>Francis Owens</p>
                            <p> Deconstructive Achievements</p>
                        </div>
                        <button className="author-more-btn"><Link to="/artist"> Подробнее об авторе</Link></button>
                    </div>
                    <div className="main-player__controller">
                        <div className="song-progress-bar">
                            <input type="range" className="song-range-controller"/>
                        </div>
                        <div className="song-control-panel">
                            <button className="song-control-button warning-button">
                                <img src={alert} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button dislike-button">
                                <img src={dislike} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button rewind-backward-button">
                                <img src={rewind_backward} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button play-button">
                                <img src={play} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button rewind-forward-button">
                                <img src={rewind_forward} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button like-button">
                                <img src={heart} alt="" className="cntrl-btn-img"/>
                            </button>
                            <button className="song-control-button comment-button">
                                <Link to="/commentaries">
                                    <img src={message} alt="comment" className="cntrl-btn-img"/>
                                </Link>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="p-col filters">
                    <div className="filters__panel">
                        <p className="filters__panel-label">Фильтры</p>
                        <div className="filters__switches">
                            <div className="switch-field">
                                <div className="genre-switch-panel switch-panel">
                                    <div className="switch-upper-filed">
                                        <div className="cb">
                                            <label htmlFor="genre-cb" className="cb-label">&#9679; Жанр</label>
                                        </div>
                                        <Slider/>
                                    </div>
                                    <div className="switch-middle-field">
                                        <form action="#" method="post">
                                            <input type="text"  className="switch-input" placeholder="Начните вводить жанр..."/>
                                            <button className="add-button2" type="submit"><img className='plus2' src={plus} alt="добавить"/></button>
                                        </form>
                                    </div>
                                    <div className="switch-bottom-field">
                                        <TagItem/>
                                    </div>
                                </div>
                                <div className="language-switch-panel switch-panel">
                                    <div className="switch-upper-filed">
                                        <div className="cb">
                                            <label htmlFor="genre-cb" className="cb-label">&#9679; Язык</label>
                                        </div>
                                        <Slider/>
                                    </div>
                                    <div className="switch-middle-field">
                                        <form action="#" method="post">
                                            <input type="text"  className="switch-input" placeholder="Начните вводить язык..."/>
                                            <button className="add-button2" type="submit"><img className='plus2' src={plus} alt="добавить"/></button>
                                        </form>
                                    </div>
                                    <div className="switch-bottom-field">
                                        <TagItem/>
                                        <TagItem/>
                                        <TagItem/>
                                    </div>
                                </div>
                                <div className="same-switch-panel switch-panel">
                                    <div className="switch-upper-filed">
                                        <div className="cb">
                                            <label htmlFor="genre-cb" className="cb-label">&#9679; На что похоже?</label>
                                        </div>
                                        <Slider/>
                                    </div>
                                    <div className="switch-middle-field">
                                        <form action="#" method="post">
                                            <input type="text"  className="switch-input" placeholder="Напишите исполнителей..."/>
                                            <button className="add-button2" type="submit"><img className='plus2' src={plus} alt="добавить"/></button>
                                        </form>
                                    </div>
                                    <div className="switch-bottom-field">
                                        <TagItem/>
                                    </div>
                                </div>
                                <div className="mood-switch-panel switch-panel">
                                    <div className="switch-upper-filed">
                                        <div className="cb">
                                            <label htmlFor="genre-cb" className="cb-label">&#9679;  Настроение</label>
                                        </div>
                                        <Slider/>
                                    </div>
                                    <div className="switch-middle-field">
                                        <form action="#" method="post">
                                            <input type="text"  className="switch-input" placeholder="Начните вводить..."/>
                                            <button className="add-button2" type="submit"><img className='plus2' src={plus} alt="добавить"/></button>
                                        </form>
                                    </div>
                                    <div className="switch-bottom-field">
                                        <TagItem/>
                                        <TagItem/>
                                        <TagItem/>
                                        <TagItem/>
                                        <TagItem/>
                                    </div>
                                </div>
                                <div className="switch-panel gender">
                                    <label className="dropdown-label" htmlFor="gender-switch">&#9679; Пол исполнителя</label>
                                    <select name="gender-switch" className="gender-switch dropdown" >
                                        <option value="none">Не имеет значения</option>
                                        <option value="male">Мужской</option>
                                        <option value="female">Женский</option>
                                    </select>
                                </div>
                                <div className="switch-panel duration">
                                    <span></span>
                                    <label className="dropdown-label" htmlFor="duration-switch">&#9679; Длительность трека</label>
                                    <select name="duration-switch" className="gender-switch dropdown" >
                                        <option value="none">Не имеет значения</option>
                                        <option value="short">Короткая (до 1 минуты)</option>
                                        <option value="medium">Стандартная (1 - 3 минуты)</option>
                                        <option value="long">Длинная (Больше 3 минут)</option>
                                    </select>
                                </div>
                                <div className="extra-params-panel">
                                    <label htmlFor="extra-params" className="extra-label">&#9679; Дополнительно</label>
                                    <form action="#" method="post" name="extra-params" className="extra-params-form">
                                        <div className="checkbox-field" >
                                            <input className="checkbox-extra" type="checkbox"/>
                                            <span className="checkbox-placeholder">Инструментальная музыка</span>
                                        </div>
                                        <div className="checkbox-field">
                                            <input className="checkbox-extra" type="checkbox"/>
                                            <span className="checkbox-placeholder">Ненормативаня лексика</span>
                                        </div>
                                        <div className="checkbox-field">
                                            <input className="checkbox-extra" type="checkbox"/>
                                            <span className="checkbox-placeholder">Добавить исключенные</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Player;