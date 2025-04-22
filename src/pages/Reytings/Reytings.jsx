import React, { useState, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header2/Header2";
import Loader from "../../components/UI/Loader/Loader";
import ReytingList from "../../components/ReytingList/ReytingList";
import './Reytings.css';

import BlackFon from "./../../img/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const Reytings = () => {
    const { id } = useParams();
    const {tg, queryId, user, onClose} = useTelegram();
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [projects2, setProjects2] = useState([
        {
            avatar: '',
            name: 'ФИО',
            reyting: 0,
            spec: '',
        },
        {
            avatar: '',
            name: 'ФИО2',
            reyting: 0,
            spec: '',
        },
        {
            avatar: '',
            name: 'ФИО3',
            reyting: 0,
            spec: '',
        },
        {
            avatar: '',
            name: 'ФИО4',
            reyting: 0,
            spec: '',
        },
        {
            avatar: '',
            name: 'ФИО5',
            reyting: 0,
            spec: '',
        },
    ]);

    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------
    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(false)
    }, []);


    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])



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


            {isPostsLoading ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
               <Loader/>
            </div>  
            : <ReytingList posts={projects2}/>
            }

        </div>
    );
};


export default Reytings;