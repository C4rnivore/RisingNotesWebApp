import logo from '../../Images/login/logo.svg'
import {Link} from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';

function Login() {
    return (
        <div className="login">
            <Sidebar/>
            <div className="login__content">
                <div className="login__content-logo">
                    <img className="login-logo" src={logo} alt="" draggable="false"/>
                    <span className="subtitle"> music everywhere.<br/>for everyone</span>
                </div>
                <div className="login__content-form">
                    <form action="#" className="login-auth-form" method="post">
                        <span className="login-auth-form__label">Вход</span>
                        <input type="email" placeholder="Почта" className="login-input email-input"/>
                        <input type="password" placeholder="Пароль" className="login-input password-input"/>
                        <button type="submit" className="loin-submit-button">Войти</button>
                        <span className="login-form-subtext">
                            Еще нет аккаунта? <Link to="/registration">Регистрация</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;