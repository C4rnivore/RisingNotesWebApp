import React, { useContext } from 'react';
import Chevron from '../Images/controller/chevron-left.svg';
import { useNavigate } from 'react-router-dom';
import { ResizeContext } from './App/App';
import { useSelector
    
 } from 'react-redux';
function BackButton(params) {
    const navigate = useNavigate();
    // const {resize, setResize} = useContext(ResizeContext);
    const resize = useSelector((state)=> state.resize.value)

    if (resize === 'standart')
    return (
        <button className='back-button' onClick={() => navigate(-1)}>
            <img className='back-chervon' alt='back' src={Chevron}/>Назад
        </button>
    )
}

export default BackButton