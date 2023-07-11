import React from 'react';
import LKcard2 from '../LKlistener/LKcard2';
import back from '../../Images/back.svg'

function LKlistener() {
    return (
        <div className='LKglav'>
            <button className='back'>
            <img className='back-ph' src={back} alt="back-button"/>Назад 
            </button>
                <LKcard2/>
        </div>
    );
}
export default LKlistener;