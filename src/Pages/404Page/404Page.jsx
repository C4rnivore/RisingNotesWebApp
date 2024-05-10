import React from 'react';
import ErrorImage from '../../Images/404Image.png';
import { Link } from 'react-router-dom';

import ErrorPageVector from '../../Images/Vector 5 404Page.png';
import { GoArrowUpRight } from "react-icons/go";

import './404Page.css';

class ErrorPage extends React.Component {
    render() {
        return (
            <div className='error1-page'>
                <div className='error2-page'>
                    <div>
                        <img className='error-image' alt='404' src={ErrorImage}/>
                    </div>
                    <div className='div-notfound-text'>
                        <text className='notfound-text'>Страница не найдена</text>
                    </div>
                    <Link to='/'>
                        <div className='button-menu-errorpage'>
                            <button className='backbutton-404'>
                                <GoArrowUpRight className='arrow-icon-upright'/> 
                                На главную
                            </button>
                        </div>
                    </Link>
                    <img className='error-Vector' alt='vector' src={ErrorPageVector}/>
                </div>
            </div>
        )
    }
}

export default ErrorPage;