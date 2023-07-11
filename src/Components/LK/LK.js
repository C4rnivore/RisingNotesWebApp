import React from 'react';
import LKCard from '../LK/LKCard';
import LKprice from '../LK/LKprice';
import back from '../../Images/back.svg'
import BackButton from '../BackButton';

function LK() {
    return (
        <div className='LKglav'>
            <div className='LK-wrapper'>
                <BackButton/>
                <LKCard/>
                <LKprice/>
            </div>
        </div>
    );
}
export default LK;