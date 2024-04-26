import './ErrorMessage.css';
import errorImg from '../../Images/error.svg';

export default function ErrorMessage({text, visibility=false}) {
    return(<div className={visibility ? `error-message` : `error-message error-hidden`}>
        <span>
            <img src={errorImg} alt='error'/>
            <p>Произошла ошибка</p>
        </span>
        <p>{text}</p>
    </div>);
}