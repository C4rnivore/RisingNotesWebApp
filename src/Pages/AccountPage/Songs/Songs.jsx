import { useEffect, useState } from "react";
import { axiosAuthorized } from "../../../Components/App/App";
import { Link } from "react-router-dom";
import Song from "./Song";
import plus from '../../../Images/account-page/plus-icon.svg';
import Loader from "../../../Components/Loader/Loader";

export default function Songs(props) {
    const [uploads, setUploads] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // получение списка заявок
        axiosAuthorized.get(`api/song/upload-request/list`)
        .then(response => {
            setUploads(response?.data.publishRequestShortInfoList);
            setIsLoaded(true);
        });

    }, []);

    if (isLoaded)
    return (
        <div className="account-page-user">
            <h2>Все треки</h2>
            <Link to={'/uploadmusic'} className='account-page-add-song'><img alt='icon' src={plus}/>Добавить трек</Link>

            <div className="tracks">
                {uploads?.map(el => 
                    <Song 
                        key={el.id} 
                        id={el.id} 
                        artist={props.artist} 
                        status={el.status} />
                )}
            </div>
            {uploads?.length == 0 ? <p>Вы еще не загрузили ни одного трека</p> : <></>}
        </div>
    )
    else {
        return(
            <div className="account-page-user">
            <h2>Все треки</h2>
            <Loader/>
        </div>
        )
    }
}