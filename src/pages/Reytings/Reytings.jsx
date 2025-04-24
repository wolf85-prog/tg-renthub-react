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
    const [project, setProject] = useState()
    const [projects2, setProjects2] = useState([
        {
            avatar: '',
            name: 'Иван',
            reyting: 0,
            spec: 'Звукорежиссер',
        },
        {
            avatar: '',
            name: 'Сергей',
            reyting: 0,
            spec: 'Системный инженер',
        },
        {
            avatar: '',
            name: 'Михаил',
            reyting: 0,
            spec: 'RF-Менеджер',
        },
        {
            avatar: '',
            name: 'Владимир',
            reyting: 0,
            spec: 'Backline',
        },
        {
            avatar: '',
            name: 'Алексей',
            reyting: 0,
            spec: 'Roadie',
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
            {/* <Header header={{title: 'Специалисты', icon: 'false'}}/> */}

            <div className='project-header'>
                <p><span style={{color: '#7f7f7f'}}>01.01.2025 00:00</span> <span style={{position: 'absolute', right: '25px'}}>Название проекта</span></p>
            </div>

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