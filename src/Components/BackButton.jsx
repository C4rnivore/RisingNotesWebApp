import React from 'react';
import Chevron from '../Images/controller/chevron-left.svg';
import { useNavigate } from 'react-router-dom';

function BackButton(params) {
    const navigate = useNavigate();

    return (
        <button className='back-button' onClick={() => navigate(-1)}>
            <img className='back-chervon' alt='back' src={Chevron}/>Назад
        </button>
    )
}

export default BackButton