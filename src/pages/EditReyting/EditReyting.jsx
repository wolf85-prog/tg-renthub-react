import React, { useState, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header2/Header2";
import './EditReyting.css';

import BlackFon from "./../../img/fon_grad.svg";
import AvatarDefault from "./../../img/blank-avatar.png";
import Star from "./../../img/star.png";
import StarActive from "./../../img/star_activ.svg";

const API_URL = process.env.REACT_APP_API_URL

const EditReyting = () => {
    const { id } = useParams();
    const {tg, queryId, user, onClose} = useTelegram();

    const [starActive1, setStarActive1] = useState(false)
    const [starActive2, setStarActive2] = useState(false)
    const [starActive3, setStarActive3] = useState(false)
    const [starActive4, setStarActive4] = useState(false)
    const [starActive5, setStarActive5] = useState(false)

    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------



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

    const handleClick = () => navigate('/list-reyting');

    //показать кнопку Назад
    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

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


            <div style={{zIndex: '10', position: 'relative'}}>
                <img className="rounded me-2" width="100%" height="100%" src={AvatarDefault} alt='' style={{borderRadius: '20px'}}/>

                <div className='reyting-text'>
                    <p className="reyting_title">Имя</p>
                    <p className="reyting_subtitle">Специальность</p>
                    <div className="reyting-block" style={{cursor: 'pointer', marginBottom: '8px'}}>
                        <img className='star-icon' onClick={()=>setStarActive1(!starActive1)} src={starActive1 ? StarActive : Star} alt='' /> 
                        <img className='star-icon' onClick={()=>setStarActive2(!starActive2)} src={starActive2 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive3(!starActive3)} src={starActive3 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive4(!starActive4)} src={starActive4 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive5(!starActive5)} src={starActive5 ? StarActive : Star} alt='' />
                    </div> 
                </div> 
            </div>
            
                
        </div>
    );
};


export default EditReyting;