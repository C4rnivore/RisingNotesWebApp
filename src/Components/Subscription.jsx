import { Link } from 'react-router-dom';
import defaultAvatar from '../Images/main-placeholder.png';
import { useEffect, useState } from 'react';
import { api, axiosPictures, axiosUnauthorized } from './App/App';

function Subscription (props) {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [isImageExist, setIsImageExist] = useState(false);

    useEffect(() => {
        axiosUnauthorized.get(api + `api/author/${props.authorId}`)
        .then(response => {
            setName(response.data.name);
            setUserId(response.data.userId);

            axiosPictures.get(api + `api/user/${response.data.userId}/logo?width=400&height=400`)
            .then(setIsImageExist(true))
            .catch(err => {
                console.log(err);
                setIsImageExist(false)
            });
        })
        .catch(err =>{console.log(err)});
    }, []);

    return (
        <Link to={`/artist/${props.authorId}`} className='playlist'>
            <img className='playlistskin' alt='cover' src={isImageExist ? api + `api/user/${userId}/logo?width=400&height=400` : defaultAvatar}/>
            <p className='labelplaylist'>{name}</p>
        </Link>
    )
}

export default Subscription

