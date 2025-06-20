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
    const [reyting, setReyting] = useState(0)
    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------
    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(true)

        function getUnique(arr, index) {

            const unique = arr
                .map(e => e[index])

                // store the keys of the unique objects
                .map((e, i, final) => final.indexOf(e) === i && i)
            
                // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);      

            return unique;
        }


        const fetch = async()=> {
            const recProj = await getProjectCrmId(id)
            console.log("recProj: ", recProj)
            setProjectName(recProj?.name)
            setProjectId(recProj?.id)

            const resSpec = await getMainSpecId(recProj?.id)
            //console.log("resSpec: ", resSpec)


            const newResSpec = getUnique(resSpec,'specId')
            console.log("newResSpec: ", getUnique(resSpec,'specId'))

            let arrSpec = []
            newResSpec.map(async(item)=> {
                const spec = await getSpecId(item.specId)
                //console.log("spec", spec)
                if (spec) {
                    const obj = {
                        id: spec?.id,
                        name: spec?.fio.replace(/\[.+\]/,'').replace(/\s+/g, ' ').split(' ')[1],
                        profile: spec?.profile,
                        date: item.date,
                        spec: item.specialization,
                    }
                    //console.log("spec", spec?.fio.replace(/\[.+\]/,'').replace(/\s+/g, ' '))

                    arrSpec.push(obj)
                }          
            })

            setTimeout(()=> {
                console.log("arrSpec: ", arrSpec)
                setMainSpec(arrSpec)
                setIsPostsLoading(false)
            }, 2000)
              
        }
        fetch()
    }, []);

    //отправка данных в telegram-бот
    const onSendData = () => {
        const data = {
            projectname: projId,
            workerId: id,
            reyting,
            comteg: '',
            comment: '',
        }

        console.log("data: ", data)

        setIsLoading(true)

        try {
            fetch('https://proj.uley.team:8002/reytings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }) 
        } catch (error) {
            console.log(error.message)
        }

        
        setIsLoading(false)
              
    }


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

    // useEffect(() => {
    //         tg.MainButton.show();
                
    //         2 > 0
    //         ? tg.MainButton.setParams({
    //             text: 'Отправить',
    //             color: '#000' //'#2e2e2e'
    //         })
    //         :  tg.MainButton.setParams({
    //             text: 'Отправить',
    //             color: '#fff' //'#2e2e2e'
    //         })
    // }, [])



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

    const saveProfile = () => {
        onSendData()
    }


    //---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{width: '100%'}}>
            {/* <Header header={{title: 'Специалисты', icon: 'false'}}/> */}

            <div className='project-header'>
                <p>
                    <span style={{color: '#7f7f7f'}}>{mainSpec[0]?.date?.split('.')[0]}.{mainSpec[0]?.date?.split('.')[1]} | {mainSpec[0]?.date?.split('T')[1]}</span> 
                    <span style={{position: 'absolute', right: '25px', color: '#7f7f7f'}}>{projectName}</span>
                </p>
            </div>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />


            {isPostsLoading ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
               <Loader/>
            </div>  
            : 
            <>
                <ReytingList posts={mainSpec} projectname={projectName} projectId={projectId} projectCrmId={id} />
                {/* <div onClick={saveProfile} style={{zIndex: '100', position: 'relative', margin: '35px', padding: '7px', height: '40px', border: '1px solid green', borderRadius: '10px'}}>
                    <span style={{fontSize: '16px', color: 'green'}}>
                        Сохранить
                    </span>
                </div>  */}
            </>
            }

        </div>
    );
};


export default Reytings;