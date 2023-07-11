import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Subscription from '../../Components/Subscription';

class AdminPanel extends React.Component {
    render() {
        return (
            <div className='color-page'>
                <Sidebar/>
                <div className='featured'>
                    <BackButton/>
                    <div className='search-element'>
                        <h2 className='sub-h2'>Результаты поиска</h2>
                        <form className="searchbar-form page-search" action="#" method="post">
                            <input className="search-input" type="text" placeholder="Поиск музыканта" />
                        </form>
                    </div>

                    <div className='subscriptions'>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>

                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPanel