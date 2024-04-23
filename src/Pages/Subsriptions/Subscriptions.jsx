import React, { useEffect } from 'react';
import BackButton from '../../Components/BackButton';
import Subscription from '../../Components/Subscription';
import { useContext } from 'react';
import { SubscriptionsContext } from '../../Components/App/App';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import './Subscriptions.css';

function Subscriptions () {
    const navigate = useNavigate();
    const {subscriptions, setSubscriptions} = useContext(SubscriptionsContext);
    const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'authorId', 'role', 'userId']);

    useEffect(() => {
        if (!cookies.role) {
            navigate("/login");
        }
    }, []);

    return (
        <div className='comment-page-wrapper'>
            <div className='featured'>
                <BackButton/>
                <div className='search-element'>
                    <h2 className='sub-h2'>Мои подписки</h2>
                </div>
                <div className='subscriptions'>
                    {subscriptions.map(el => (
                        <Subscription key={el} authorId={el}/>
                    ))}
                    {subscriptions.length === 0 ? <p style={{color: '#FE1170'}}>Список пуст</p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Subscriptions