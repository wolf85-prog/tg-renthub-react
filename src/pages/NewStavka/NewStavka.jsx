import React, { useState, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header2/Header2";
import './NewStavka.css';
import CurrencyInput from './../../components/CurrencyInput'

import BlackFon from "./../../img/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const NewStavka = () => {
    const { id } = useParams();
    const {tg, queryId, user, onClose} = useTelegram();

    const [summaStavki, setSummaStavki] = useState()

    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------


    const changeSummaStavki = (e) => {
        console.log(e.target.value)

        setSummaStavki(e.target.value)
    }

    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        const data = {
            summaStavki,
            id,
            queryId,
            userId: user?.id,
        }

        tg.MainButton.hide();

        fetch(API_URL + 'web-stavka', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
              
    }, [summaStavki, id])


    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить предложение',
            color: '#000000' //'#2e2e2e'
        })
    }, [])

    useEffect(() => {
        if (summaStavki) {
           tg.MainButton.show(); 
        } else {
            tg.MainButton.hide();  
        }
        
    }, [summaStavki])


    //показать кнопку Назад
    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    //---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{width: '100%'}}>
            {/* <Header header={{title: 'Моё предложение', icon: 'false'}}/> */}

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />

            <div style={{color: '#f5f3f3', fontFamily: 'Monserrat', fontSize: '18px', zIndex: '10', position: 'absolute', padding: '35px 20px'}}>
                <p>Внимание!</p>
                <p>Ставки в предварительной смете</p>
                <p>носят рекомендательный характер. </p>
                <p>Вы может предложить</p> 
                <p>свою цену </p>
                <p>за 10 часов работы</p> 
                <p>на конкретном проекте.</p>
            </div>

            <div style={{height: '100vh', marginTop: '60%'}}>
                <div className='form-edit-stavka'>
                    
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                        <CurrencyInput
                            className='input-style3'
                            placeholder='Впиши сюда сумму'
                            type="text"
                            value={summaStavki}
                            onChange={changeSummaStavki} 
                        /> 
    
                </div>
            </div>

            <div style={{color: '#f5f3f3', fontFamily: 'Monserrat', fontSize: '18px', zIndex: '10', position: 'absolute', top:"300px", padding: '35px 20px', textAlign: 'left'}}>
                <p>Ваше предложение может повлиять</p>
                <p>на конверсию и оперативный поиск </p>
                <p>специалистов. Процесс может занять</p>
                <p>больше времени, а компетенции, или качество</p>
                <p>специалистов могут оказаться</p> 
                <p>низкими если:</p>
                <p style={{paddingLeft: '10px'}}>• Ставка ниже рыночной;</p>
                <p style={{paddingLeft: '10px'}}>• Повышенный спрос на даты проекта;</p>
                <p style={{paddingLeft: '10px'}}>• Тех. задание ориентировано на другой коэффициент;</p>
            </div>

        </div>
    );
};


export default NewStavka;