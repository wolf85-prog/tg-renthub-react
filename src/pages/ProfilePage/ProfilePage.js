import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from "../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";

import { useTelegram } from "../../hooks/useTelegram";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useUsersContext } from "../../contexts/UserContext";
import {useProjects} from "../../hooks/useProjects"
import './ProfilePage.css';


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Plus from "../../img/new/button_plus.png"
import BlackFon from "../../img/new/fon_grad.svg";
import DohodOpen from "../../img/new/dohodOpen.png";
import Star from "../../img/new/star.png";
import StarActive from "../../img/new/star_activ.svg";
import Edit from "../../img/new/edit.svg"
import Edit2 from "../../img/new/edit2.svg"
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import Workhub from "../../img/new/WorkHub.gif"
import QRCode from "../../img/new/QR_Code.svg"
import Close from "../../img/new/close.svg"
import ClosePress from "../../img/new/close_press.svg"
import Footer from "../../img/new/footer2.png"
import VK from "../../img/new/basil_vk-outline.svg"
import Phone from "../../img/new/ph_phone-call.svg"
import Web from "../../img/new/dashicons_admin-site-alt3.svg"
import Telegram from "../../img/new/telegram-computer.png"

import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";
import Loader2 from "../../components/UI/Loader_min/Loader_min"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import { getManagerApi } from '../../http/projectAPI';


const ProfilePage = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const projectsRef = useRef(null)

    const { projects, setProjects, specId, setSpecId, flag, summa, setSumma } = useUsersContext();
    const { workerhub, setWorkerhub, companyManager } = useUsersContext();
    //специалисты
    const [workerhublist, setWorkerhublist] = useState([]);

    const [managerId, setManagerId] = useState('')
    const [projects2, setProjects2] = useState('')

    const [status, setStatus] = useState([{title: "Новые"}, {title: "Старые"}, {title: "Все"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    //const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'
    const [sortProject, setSortProject] = useState([])

    const [showArroy, setShowArroy] = useState(true)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [headerName, setHeaderName] = useState('Мой профиль');
    //const [scrollTop, setScrollTop] = useState(0);
    const { height, width } = useWindowDimensions();
    const [isLoadingSum, setIsLoadingSum] = useState(true);

    const [showMoreInfo, setShowMoreInfo] = useState(false)
    const [showHistory, setShowHistory] = useState(false);
    const [showKompet, setShowKompet] = useState(false);
    const [showDohod, setShowDohod] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showAddSpec, setShowAddSpec] = useState(false)

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)

    //const {worker, setWorker, workers, setWorkers} = useUsersContext();
    const [showSpec, setShowSpec] = useState(false) 

    const API_URL = process.env.REACT_APP_API_URL

    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {

        const fetchData = async() => { 
            setIsProfileLoading(true)
            // const manager = await getManagerIdApi(user?.id)
            // console.log("manager profile: ", manager) 

            // setManagerId(manager?.id)

            setTimeout(()=> {      
                setIsProfileLoading(false)
            }, 2000)
        }

        fetchData()   
    }, []);

//---------------------------------------------------------------------
//1  загружаем проекты




//---------------------------------------------------------------------
    //отправка данных в telegram-бот

//---------------------------------------------------------------------
    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    const onClose = () => {
        tg.close()
    }

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    useEffect(() => {
        tg.MainButton.show();
    }, [])


    const clickWorkhub = () => {
        showFooter ? setShowFooter(false) : setShowFooter(true)
    }

    useEffect(() => {
        // if (workers.length > 0) {
        //     tg.onEvent('mainButtonClicked', onSendData)
        //     return () => {
        //         tg.offEvent('mainButtonClicked', onSendData)
        //     } 
        // } else {
            tg.onEvent('mainButtonClicked', clickWorkhub)
            return () => {
                tg.offEvent('mainButtonClicked', clickWorkhub)
            }
        //}
    }, [clickWorkhub])

    useEffect(() => {
        // if (workers.length > 0) {
        //     tg.MainButton.setParams({
        //         text: 'Сохранить',
        //         color: '#000000' //'#2e2e2e'
        //     })
        // } else {
            tg.MainButton.setParams({
                text: 'Renthub',
                color: '#26292c' //'#2e2e2e'
            })
        //}
        
    }, [])



//---------------------------------------------------------------------------------------
    
    const onAddProject = () => {
        navigate('/add-project')
    }

    const clickKompeten = () => {
        showKompet ? setShowKompet(false) : setShowKompet(true)
    }

    
    const clickDohod = () => {
        showDohod ? setShowDohod(false) : setShowDohod(true)
    }

    const clickPodel = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }

    const clickMoreInfo = () => {
        showMoreInfo ? setShowMoreInfo(false) : setShowMoreInfo(true)
    }


    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const showPopup = () => {   
        setModal(true)
        //setTimeout(()=> {
            openInNewTab('tel:+74995001411')
        //}, 2000)

        setTimeout(()=> {
            setModal(false)       
        }, 6000)
    }
//---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{overflowX: 'hidden'}}>

            <Header header={{title: `${headerName}`, icon: 'false', menu: `${Workhub}`}} setShowModal={setShowMoreInfo} showModal={showMoreInfo}/>

            {/* темный фон */}
            {/* <img src={BlackFon} alt='' className='fon-black' /> */}
            <div style={{height: '844px', background: 'linear-gradient(180deg, #343A41 0%, #222325 100%)'}} className='fon-black' />

            {isProfileLoading
            ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}><Loader/></div>
            :<>
            <div className="container">
                {/* ФИО */}
                <article className="card">
                    <div className="rectangle4">
                    </div>
                    <div className="circle">

                    </div>
                    <div>
                        <p className="profile_fio">{workerhub?.fio.split(' ')[0] + ' ' + workerhub?.fio.split(' ')[1]}</p>

                        <p className="profile_city">{workerhub?.city}</p>
                        <p className="profile_company">{companyManager ? companyManager : '-'}</p>
                        {/* <div className="card-specs bullet">
                            <ul>
                                <li className="bullet-title" style={{color: '#3392ff', fontWeight: 'bold'}}>Добавь свою специальность</li> 
                            </ul>   
                        </div>      */}
                    </div>
                    
                    <div className="star-block">
                        
                    </div>
                    <div className='block-id'> ID {workerhub?.chatId}</div>
                </article>

                <div style={{display: 'flex', marginTop: '40px', justifyContent: 'space-between'}}>
                <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', flex: '0 0 56%'}}>
                       
                       
                       
                        {/* Компания */}
                        <article className='block-kompetencii' style={{display: 'block'}}> 
                            <div className='rectangle5'></div>
                            <div className='kompetencii-title'>
                                <p className='text-kompetencii'>Компания</p>
                                <img className='vector-icon' src={Vector} alt=''/>
                            </div>
                        </article>

                        {/* open */}
                        {/* Доход */}
                       <article className='block-dohod' style={{display: 'block'}}> 
                            <div className='rectangle17'></div>
                            <div className='kompetencii-title' style={{top: '25px'}}><p>Сумма к выплате</p></div>
                            <p className='summa-dohod'>{2>1 ? '0.00' : <Loader2 />}</p>
                        </article>

                    </div> 

                    {/* Рассылка */}
                    <article className='block-merch'> 
                            <div className='rectangle5'></div>

                            <div className='rectangle-circle'>
                                {/* <div className='rectangle-circle-on'></div> */}
                            </div>

                            <p className='merch-title'>Рассылка</p>
                            <div className='perechislenie'>

                            </div>
                    </article>
                    
                </div>
                
            </div>

            <div  ref={projectsRef}>

                <div className="profile-project-list">   
                    <Header 
                        header={{title: `Мои проекты`, icon: 'true', menu: 'меню'}}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    
                </div> 
            </div>
            </>
            }

            <div className='footer-block' style={{display: showFooter ? 'block' : 'none'}}>
                <img onClick={onAddProject} src={Plus} alt='' width='100%' className='btn-friend' />
                <img src={Footer} alt='' width='100%' className='footer-image' />
                <div className='footer-rec'></div>
                
                <div className='footer-icons'>
                    <img onClick={()=>showPopup()} src={Phone} alt='' width='100%' className='icon-footer' />
                    <img onClick={()=>openInNewTab('https://vk.com/uley.team')} src={VK} alt='' width='100%' className='icon-footer' />  
                </div>
                <div className='footer-icons2'> 
                    <img onClick={() =>openInNewTab('https://t.me/uley_team')} src={Telegram} alt='' width='100%' className='icon-footer' /> 
                    <img onClick={()=>openInNewTab('https://uley.team/')} src={Web} alt='' width='100%' className='icon-footer' /> 
                </div>   
            </div>
            
        </div>
    );
};


export default ProfilePage;