import React from 'react';

const LKprice = () => {
    return (
        <div className='LKprice'>
            <p className='bill'> На счете: 500 руб.</p>
            <p className='bill'>Месяц оплачен</p>
            <h1 className='LKprice-h1'> Стоимость услуг:</h1>
            <p className='bill'><p>1. Ротация всей вашей музыки на сервисе при условии, если трек набирает меньше 250 прослушиваний/месяц - бесплатно </p>
            <p>2. Ротация всей вашей музыки на сервисе - 400 рублей/месяц </p>
            <p>3. При условии, если ваши общие прослушивания достигли 50000/месяц, ваша музыка будет оставаться в ротации до конца оплаченного месяца, затем оплатить ротацию будет невозможно </p></p>
            <div className='pay'>
                <h1 className='pay-h1'>Оплата услуг для музыкантов</h1>
                <h2 className='pay-h2'>Номер карты</h2>
                <input className='pay-input1' placeholder='Номер карты'/>
                <h2 className='pay-h2'>Срок действия</h2>
                <input className='pay-input2' placeholder='Срок действия'/>
                <h2 className='pay-h2'>CVV/CVC</h2>
                <input className='pay-input2' placeholder='CVV/CVC'/>
                <h2 className='pay-h2'>Сумма</h2>
                <input className='pay-input1' placeholder='Сумма'/>
                <button className='pay'>Оплатить</button>
            </div>

        </div>
    );
};
    
export default LKprice;