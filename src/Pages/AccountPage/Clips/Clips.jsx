import { Link } from "react-router-dom";
import Clip from "../../../Components/Clip/Clip";
import plus from '../../../Images/account-page/plus-icon.svg';

export default function Clips() {
    return (
        <div className="account-page-user">
            <h2>Все клипы</h2>
            <Link to={'/uploadvideo'} className='account-page-add-song'><img alt='icon' src={plus}/>Новое видео</Link>

            <div className="artist-clips">
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
                <Clip authorName={'Francis Owens'} name={'Deconstructive Achievements'} isArtist={true} status={0} views={1000}/>
            </div>
        </div>
    )
}