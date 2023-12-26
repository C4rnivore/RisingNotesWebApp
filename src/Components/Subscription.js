import { Link } from 'react-router-dom';
import defaultAvatar from '../Images/account-page/image-placeholder.png';
import { useEffect, useState } from 'react';
import { api, axiosUnauthorized } from './App/App';

function Subscription (props) {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [isImageExist, setIsImageExist] = useState(false);

    useEffect(() => {
        axiosUnauthorized.get(api + `api/author/${props.authorId}`)
        .then(response => {
            console.log(response)
            setName(response.data.name);
            setUserId(response.data.userId);

            axiosUnauthorized.get(api + `api/user/${response.data.userId}/logo?width=400&height=400`)
            .then(setIsImageExist(true))
            .catch(err => {
                console.log(err);
                setIsImageExist(false)
            });
        })
    }, []);

    return (
        <Link to={`/artist/${props.authorId}`}>
            <div className='subscription'>
                <img alt='cover' src={isImageExist ? api + `api/user/${userId}/logo?width=400&height=400` : defaultAvatar}/>
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default Subscription

