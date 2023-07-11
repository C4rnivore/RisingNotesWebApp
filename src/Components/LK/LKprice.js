import React from 'react';

const LKprice = () => {
    return (
        <div className='LKprice'>
            <p className='bill1'> На счете: 500 руб.</p>
            <p className='bill2'>Месяц оплачен</p>
            <h1 className='LKprice-h1'> Стоимость услуг:</h1>
            <p className='bill3'><p>1.&nbsp;&nbsp;Ротация всей вашей музыки на</p><p>&nbsp;&nbsp;&nbsp;&nbsp;сервисе при условии, если трек</p><p>&nbsp;&nbsp;&nbsp;&nbsp;набирает меньше 250 прослушиваний/</p><p>&nbsp;&nbsp;&nbsp;&nbsp;месяц - бесплатно </p>
            <p>2.&nbsp;&nbsp;Ротация всей вашей музыки на</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;сервисе - 400 рублей/месяц </p>
            <p>3.&nbsp;&nbsp;При условии, если ваши общие</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;прослушивания достигли 50000/месяц,</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ваша музыка будет оставаться в</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ротации до конца оплаченного месяца,</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;затем оплатить ротацию</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;будет невозможно </p></p>
            <div className='pay'>
                <form action="#" className = 'pay-form' method  = 'post'>
                    <h1 className='pay-h1'>Оплата услуг для музыкантов</h1>
                    <h2 className='pay-h2num'>Номер карты</h2>
                    <input className='pay-input1' placeholder='От 16 до 19 цифр'/>
                    <h2 className='pay-h2srok'>Срок действия</h2>
                    <input className='pay-input2' placeholder='мм/гг'/>
                    <h2 className='pay-h2cvv'>CVV/CVC</h2>
                    <input className='pay-input3' placeholder='3 цифры'/>
                    <h2 className='pay-h2sum'>Сумма</h2>
                    <input className='pay-input1' placeholder='Введите сумму'/>
                    <button type = 'submit' className='pay-button'>Оплатить</button>   
                </form>
            </div>

        </div>
    );
};
    
export default LKprice;