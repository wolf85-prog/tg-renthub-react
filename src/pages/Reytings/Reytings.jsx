import React, { useState, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header2/Header2";
import Loader from "../../components/UI/Loader/Loader";
import ReytingList from "../../components/ReytingList/ReytingList";
import './Reytings.css';

import BlackFon from "./../../img/fon_grad.svg";

import { getProjectCrmId, getMainSpecId, getSpecId } from '../../http/projectAPI';

const API_URL = process.env.REACT_APP_API_URL

const Reytings = () => {
    const { id } = useParams();
    const {tg, queryId, user, onClose} = useTelegram();
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [projectName, setProjectName] = useState('')
    const [projectId, setProjectId] = useState('')
    const [mainSpec, setMainSpec] = useState([])

    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------
    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(false)

        const fetch = async()=> {
            const recProj = await getProjectCrmId(id)
            console.log("recProj: ", recProj)
            setProjectName(recProj?.name)
            setProjectId(recProj?.id)

            const resSpec = await getMainSpecId(recProj?.id)
            console.log("resSpec: ", resSpec)

            let arrSpec = []
            resSpec.map(async(item)=> {
                const spec = await getSpecId(item.specId)
                console.log("spec", spec)
                if (spec) {
                    const obj = {
                        name: spec?.fio?.split(' ')[1],
                        profile: spec?.profile,
                        date: item.date,
                        spec: item.specialization,
                    }
                    arrSpec.push(obj)
                }          
            })

            setTimeout(()=> {
                console.log("arrSpec: ", arrSpec)
                setMainSpec(arrSpec)
            }, 2000)
              
        }
        fetch()
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
                <p><span style={{color: '#7f7f7f'}}>{mainSpec[0]?.date?.split('T')[0]} {mainSpec[0]?.date?.split('T')[1]}</span> <span style={{position: 'absolute', right: '25px'}}>{projectName}</span></p>
            </div>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />


            {isPostsLoading ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
               <Loader/>
            </div>  
            : <ReytingList posts={mainSpec}/>
            }

        </div>
    );
};


export default Reytings;