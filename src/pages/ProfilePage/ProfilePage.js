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

import Friend from "../../img/new/button_plus.png"
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

import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";
import Loader2 from "../../components/UI/Loader_min/Loader_min"
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";


const ProfilePage = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();
    const { hash } = useLocation();

    const projectsRef = useRef(null)

    const { projects, setProjects, specId, setSpecId, flag, summa, setSumma } = useUsersContext();
    const { workerhub, setWorkerhub } = useUsersContext();
    //специалисты
    const [workerhublist, setWorkerhublist] = useState([]);

    const [workerId, setWorkerId] = useState('')
    const [projects2, setProjects2] = useState('')

    const [status, setStatus] = useState([{title: "Новые"}, {title: "Старые"}, {title: "Все"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, workerId); //specId '1408579113'
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


    // useEffect(() => {
    //     if (workers.length > 0) {
    //         tg.MainButton.setParams({
    //             text: 'Сохранить',
    //             color: '#000000' //'#2e2e2e'
    //         })
    //     } else {
    //         tg.MainButton.setParams({
    //             text: 'Workhub',
    //             color: '#26292c' //'#2e2e2e'
    //         })
    //     }
        
    // }, [workers])


    // useEffect(() => {
    //     if (workers.length > 0) {
    //         tg.onEvent('mainButtonClicked', onSendData)
    //         return () => {
    //             tg.offEvent('mainButtonClicked', onSendData)
    //         } 
    //     } else {
    //         tg.onEvent('mainButtonClicked', clickWorkhub)
    //         return () => {
    //             tg.offEvent('mainButtonClicked', clickWorkhub)
    //         }
    //     }
    // }, [workers, clickWorkhub, onSendData])


    //---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{overflowX: 'hidden'}}>

            <Header header={{title: `${headerName}`, icon: 'false', menu: `${Workhub}`}} setShowModal={setShowMoreInfo} showModal={showMoreInfo}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />

            {isProfileLoading
            ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}><Loader/></div>
            :<>
            <div className="container">
                {/* ФИО */}
                <article className="card">
                    <div className="rectangle"><div className="rectangle2"><div className="rectangle3"></div></div>
                    </div>
                    <div>
                        <p className="profile_fio">{workerhub?.fio}</p>
                        <div className="card-specs bullet">
                            <ul onClick={()=>setShowProfileInfo(true)}>
                                {workerhublist.length > 0 ? workerhublist.map((worker, index) => index < 8 
                                  ?  <li key={index} className="bullet-title">{worker.spec}  {index === workerhublist.length-1 && <img src={Edit} onClick={clickAddSpec} alt='' style={{marginLeft: '20px', width: '12px'}}/> }</li>
                                  : '')
                                : <><li className="bullet-title" style={{color: '#3392ff', fontWeight: 'bold'}}>Добавь свою специальность</li><li> <img src={Edit2} onClick={clickAddSpec} alt='' style={{marginLeft: '90px', width: '25px'}}/> </li></> }
                            </ul>   
                        </div>     
                    </div>
                    
                    <div className="star-block">
                        <img className='star-icon' src={StarActive} alt='' /> 
                        <img className='star-icon' src={StarActive} alt='' />
                        <img className='star-icon' src={StarActive} alt='' />
                        <img className='star-icon' src={StarActive} alt='' />
                        <img className='star-icon' src={Star} alt='' />
                    </div>
                    <div className='block-id' onClick={clickCopyID}> ID {user?.id}</div>
                </article>

                <div style={{display: 'flex', marginTop: '15px', justifyContent: 'space-between'}}>
                    {/* Мерч */}
                    <article className='block-merch' onClick={clickInfo}> 
                            <div className='rectangle-merch'></div>
                            <div className='rectangle-merch2'></div>
                            <div className='rectangle-merch3'></div> 

                            <div className='rectangle-circle'>
                                <div className={workerhub?.merch && JSON.parse(workerhub?.merch).length > 0 ? 'rectangle-circle-on' : 'rectangle-circle-off'}></div>
                            </div>

                            <p className='merch-title'>Мерч</p>
                            <div className='perechislenie'>
                                {workerhub?.merch && JSON.parse(workerhub?.merch).map((item, index)=> 
                                        <p key={index} className="">{item.name}</p>
                                )}
                            </div>
                    </article>

                    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', flex: '0 0 56%'}}>
                        {/* Компетенции */}
                        <article className='block-kompetencii' style={{display: !showKompet ? 'block' : 'none'}}> 
                            <div className='rectangle-kompeten'></div>
                            <div className='rectangle-kompeten2'></div>
                            <div className='rectangle-kompeten3'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii'>Компетенции</p>
                                <img className='vector-icon' src={Vector} alt=''/>
                            </div>
                        </article>

                        {/* open */}
                        <article className='block-kompetencii-open' style={{display: showKompet ? 'block' : 'none'}}> 
                            <div className='rectangle-kompeten'></div>
                            <div className='rectangle-kompeten2'></div>
                            <div className='rectangle-kompeten3'></div>
                            <div className='kompetencii-title' onClick={clickKompeten}>
                                <p className='text-kompetencii' >Компетенции</p>
                                <img className='vector-icon' src={VectorUp} alt=''/>
                            </div>
                            <div className='kompet-list' onClick={()=>setShowKompInfo(true)}>
                                <ul>
                                    {workerhub?.skill && JSON.parse(workerhub?.skill).map((worker, index) => index < 6
                                    ?   <li className="bullet-title">{worker.name} </li>
                                    : '' )}
                                </ul>  
                            </div>
                        </article>


                        {/* Доход */}
                        <article className='block-dohod' onClick={clickDohod} style={{display: showDohod || showKompet ? 'none' : 'block'}}> 
                            <div className='rectangle-dohod'></div>
                            <div className='rectangle-dohod2'></div>
                            <div className='rectangle-dohod3'></div>
                            <div className='kompetencii-title'><p>Доход</p><img className='vector-icon' src={Vector} alt=''/></div>
                            <p className='summa-dohod'>{isLoadingSum ? <Loader2 /> : (isNaN(summa) ? "0" : parseInt(summa).toLocaleString())+".00"}</p>
                        </article>
                    </div> 
                </div>

                

                {/* Доход */}
                <img src={DohodOpen} alt='' onClick={clickDohod} className='dohod-open' style={{display: showDohod ? 'block' : 'none'}}/>
                
                
                <article className='block-dohod-open' onClick={clickDohod} style={{display: showDohod ? 'block' : 'none'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><p>Доход</p><img className='vector-icon2' src={Vector} alt=''/></div> 
                    <p className='summa-dohod2'>{isLoadingSum ? <Loader2 /> : (isNaN(summa) ? "0" : parseInt(summa).toLocaleString())+".00"}</p>
                </article>

                <article className='block-dohod2' style={{display: showDohod ? 'block' : 'none'}} onClick={()=>setShowDohodInfo(true)}> 
                    <p className='history-title'>История</p>
                    <div className='dates-history'><p>01.2024</p><p>0.00</p></div>
                    <div className='dates-history2'><p>02.2024</p><p>0.00</p></div>
                    <div className='dates-history2'><p>03.2024</p><p>0.00</p></div>
                </article> 
                
            </div>

            <div  ref={projectsRef}>

                <div className="profile-project-list">   
                    <Header 
                        header={{title: `Мои проекты`, icon: 'true', menu: 'меню'}}
                        filter={filter}
                        setFilter={setFilter}
                    />

                    {isPostsLoading
                        ? <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}><Loader/></div>
                        : <ProjectList posts={sortProject} title="" width={width} />
                    }
                </div> 
            </div>
            </>
            }

            {/* <div className='footer-block' style={{display: showFooter ? 'block' : 'none'}}>
                <img onClick={clickPodel} src={Friend} alt='' width='100%' className='btn-friend' />
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
            </div> */}
            
        </div>
    );
};


export default ProfilePage;