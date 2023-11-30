import { api, axiosAuthorized } from '../../../Components/App/App';
import musicIcon from '../../../Images/account-page/music-icon.svg';

export default function AccountNonMusician() {
    const handleMakeArtist = () => {
        axiosAuthorized.post(api + 'api/author')
        // .then(window.location.reload());
    };

    return (
        <div className='account-non-musician'>
            <p>Чтобы получить доступ к профилю музыканта, необходимо получить статус аккаунта <b>Музыкант</b></p>
            <button className="account-page-filled-button" onClick={handleMakeArtist}>
                <img alt='icon' src={musicIcon}/>
                Стать музыкантом!
            </button>
        </div>
    );
}