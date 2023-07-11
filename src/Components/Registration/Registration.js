import logo from '../../Images/login/logo.svg'
import {Link} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';

function Registration() {
    return (
        <div className="registration">
            <Sidebar/>
            <div className="registration__content">
                <div className="registration__content-logo">
                    <img className="registration-logo" src={logo} alt="" draggable="false"/>
                    <span className="subtitle"> music everywhere.<br/>for everyone</span>
                </div>
                <div className="registration__content-form">
                    <form action="#" className="registration-auth-form" method="post">
                        <span className="registration-auth-form__label">Регистрация</span>
                        <input type="text" placeholder="ФИО" className="registration-input email-input"/>
                        <input type="email" placeholder="Почта" className="registration-input email-input"/>
                        <input type="password" placeholder="Пароль" className="registration-input password-input"/>
                        <button className="registration-submit-button">Войти</button>
                        <span className="registration-form-subtext">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Registration;