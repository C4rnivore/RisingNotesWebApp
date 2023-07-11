import Sidebar from "../../Components/Sidebar/Sidebar";
import Song from "../../Components/Song";
import ProfileImage from '../../Images/pfpimg.png'
import {Link} from "react-router-dom";
import logo from '../../Images/login/logo.svg'
import BackButton from "../../Components/BackButton";

function ArtistPersonalPage() {
    return (
        <div className="artist-personal-page">
            <div className="app-content-wrapper">
                <BackButton/>
                <section className="about app-sec">
                    <div className="about-label">
                        <span className="artist-name">Francis Owens</span>
                        <button className="submit-editing-btn">Сохранить</button>
                    </div>
                    <div className="about-text-area">
                        <span className="artist-info-label">Информация о себе</span>
                        <textarea draggable={"false"} className="artist-input-field" placeholder="Введите информацию о себе"/>
                    </div>
                </section>
                <section className="stat app-sec">
                    <div className="info-area">
                        <span className="info-area-title span-title">Ссылки на соцсети</span>
                        <ul className="links">
                            <li className="link-field">
                                <span className="link-label">
                                    ВКонтакте
                                </span>
                                <input type="text" className="link-input" placeholder="Ссылка"/>
                            </li>
                            <li className="link-field">
                                <span className="link-label">
                                    Яндекс Музыка
                                </span>
                                <input type="text" className="link-input" placeholder="Ссылка"/>
                            </li>
                            <li className="link-field">
                                <span className="link-label">
                                    Сайт
                                </span>
                                <input type="text" className="link-input" placeholder="Ссылка"/>
                            </li>
                        </ul>
                        <div className="stat-area">
                            <span className="subs-label span-title">
                                Подписчики
                            </span>
                            <span className="subs-count stat-value">
                                200
                            </span>
                        </div>
                        <div className="stat-area">
                            <span className="subs-label span-title">
                                Прослушиваний за месяц
                            </span>
                            <span className="subs-count stat-value">
                                600
                            </span>
                        </div>
                    </div>
                    <img src={ProfileImage} alt="" className="pf-img"/>
                </section>
                <section className="songs app-sec">
                    <div className="songs-upper-panel">
                        <span className="songs-label span-title">
                            Все треки
                        </span>
                        <button className="add-btn">
                            <span className="inner-btn-text">
                                Добавить новую песню
                            </span>
                        </button>
                    </div>
                    <div className="songs-list">
                        <Song/>
                        <Song/>
                        <Song/>
                    </div>
                </section>
            </div>
            <Sidebar/>
        </div>
    );
}
export default ArtistPersonalPage;