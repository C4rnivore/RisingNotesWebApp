
import editIcon from '../../Images/account-page/edit-icon.svg';
import './UserCard.css';
import defaultImg from '../../Images/main-placeholder.png';

export default function UserCard({info}) {
    return(<div className="admin-user-card">
        <img alt='image' src={defaultImg}/>
        <span className="admin-user-card-text">
            <p>{info.name}</p>
            <p>{info.email}</p>
            <p className='song-genre'>{info.role}</p>
        </span>
        <a href={'/'}><img alt='edit' src={editIcon} /></a>
    </div>)
}