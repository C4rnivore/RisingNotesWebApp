import React from 'react';
import LKCard from '../LK/LKCard';
import LKprice from '../LK/LKprice';
import back from '../../Images/back.svg'

function LK() {
    return (
        <div className='LKglav'>
            <button className='back'>
            <img className='back-ph' src={back} alt="back-button"/>Назад 
            </button>
                <LKCard/>
                <LKprice/>
        </div>
    );
}
export default LK;