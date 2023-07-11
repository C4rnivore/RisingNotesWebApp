import Sidebar from "../../Components/Sidebar/Sidebar";
import {Link} from "react-router-dom";
import logo from '../../Images/login/logo.svg'

function ArtistPersonalPage() {
    return (
        <div className="artist-personal-page">
            <div className="app-content-wrapper">
                <section className="about app-sec">
                    <div className="about-label">
                        <span className="artist-name">Francis Owens</span>
                        <button className="submit-editing-btn">Сохранить</button>
                    </div>
                    <div className="about-text-area">
                        <span className="artist-info-label">Информация о себе</span>
                        <textarea className="artist-input-field" placeholder="Введите информацию о себе"/>
                    </div>
                </section>
                <section className="stat app-sec">
                    Ссылки на соцсети
                    Вконтакте <input type="text"/>
                    Яндексмузыка <input type="text"/>
                    Сайт <input type="text"/>
                    <img src={logo} alt=""/>
                </section>
                <section className="songs app-sec"></section>
            </div>
            <Sidebar/>
        </div>
    );
}
export default ArtistPersonalPage;