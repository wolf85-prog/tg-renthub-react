import React, {useState, useEffect, useRef} from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";
import Loader from "./../UI/Loader_min/Loader_min"
import Slider from '@mui/material/Slider';

import MyModal from "../../components/MyModal/MyModal";
import BackModal from "../../img/new/card.svg"

import { useUsersContext } from "../../contexts/UserContext";
//import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import btnChat from "../../img/new/btn_chat.svg"
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import Ukazatel from "../../img/new/ukazatel.png"
import Close from "../../img/new/close.svg"
import ClosePress from "../../img/new/close_press.svg"

import RangeSlider from '../UI/RangeSlider/RangeSlider';

const ProjectItem = (props) => {

    const {specId} = useUsersContext();

    const [stavka, setStavka] = useState(0)
    const [cashStavka, setCashStavka] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const [showProject, setShowProject] = useState(false);
    const [showModalEtap, setShowModalEtap] = useState(false);
    const [widthCard, setWidthCard] = useState(0);
    

    const [valueShkala, setValueShkala] = useState(0);

    const [formatted, setFormatted] = useState("")
    const [formattime, setFormattime] = useState("")
    const [fact, setFact] = useState()

    const [showInfo, setShowInfo] = useState(false)

    const [stavkaPlus, setStavkaPlus] = useState(0);

    const sliderRef = useRef(null)

    const [statusMoney, setStatusMoney] = useState('Фактически')

    const [chasiView, setChasiView] = useState(0);
    const [smenaView, setSmenaView] = useState(0);
    const [stavkaView, setStavkaView] = useState(0);
    const [pererabotkaView, setPererabotkaView] = useState(0);
    const [transportView, setTransportView] = useState(0);
    const [gsmView, setGsmView] = useState(0);
    const [taxiView, setTaxiView] = useState(0);
    const [comtag, setComtag] = useState([]);

    useEffect(()=> {
    
        //1
        if (statusMoney === 1) {
            setStatusMoney('Предварительно')

            setValueShkala(1650) //1
        } 
        //2
        else if(statusMoney === 'Фактически') {
            //setStatusMoney('Фактически')

            setValueShkala(3800) 
        } 
        //4
        else if(statusMoney === 4) {
            setStatusMoney('На оплате')
            setValueShkala(8400)
        }
        //5
        else if(statusMoney === 5) {
            setStatusMoney('Оплачено')
            setValueShkala(10000)
        }
        
        //3
        // if (finalSmeta === 'Подтверждена') {
        //     setStatusMoney('Подтверждено')

        //     setValueShkala(5900)
        // }
    }, [])

    const clickProject = () => {
        showProject ? setShowProject(false) : setShowProject(true)
    }

    const clickShkala = () => {
        showModalEtap ? setShowModalEtap(false) : setShowModalEtap(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }

    //сумма денег для показа при движении фейдера
    useEffect(()=> {
        setStavkaPlus(stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0)
        //console.log("stavka: ", stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0, props.post.title)
    }, [stavka])

    return (
    <>

        <div className='container'>           
            <div className='proj-card'>
                <div className='rectangle-projcard'></div>
                <div className='rectangle-projcard2'></div>
                <div className='rectangle-projcard3'></div>
                
                <div className='project-text'>
                    <p className="project_title" onClick={clickProject}>{props.post.name}</p>
                    <p className="project_subtitle"></p>
                </div>

                <img className='vector' onClick={clickProject} src={showProject ? VectorUp : Vector} alt=''/>   
                
                <div className='shkala-click' onClick={clickShkala}></div>

                <RangeSlider min={0} max={10000} value={valueShkala} step={5} stavka={stavka} setStavka={setStavkaPlus} range={10000} distance={valueShkala} percentage={valueShkala/100}/>
                
                <div className='card-footer'>
                    {/* деньги */}
                    <p className='project_money'>{!isLoading ? <Loader /> : (stavkaPlus ? parseInt(stavkaPlus).toLocaleString()+".00" : parseInt(stavka).toLocaleString()+".00")}</p>
                    {/* <p className='project_money'>{isLoading ? <Loader /> : (parseInt(stavkaPlus ? stavkaPlus.replace(/\s/g, "").split('.')[0] : stavka.replace(/\s/g, "").split('.')[0]).toLocaleString()+".00")}</p> */}
                    {/* кнопка Чат */}
                    {props.post.tgURL_chat && <div onClick={goToChat} className='chat-button'>Чат</div>}
                </div>

                

                <div className='smeta' style={{display: showProject ? 'block' : 'none'}}>
                    <div className='line3'></div>
                    <div className='smeta-text'>
                        <ul>
                            <li className='item-list'><div>Специальность</div>-</li>
                            <li className='item-list'><div>Вид работ</div>-</li>
                            <li className='item-list'><div>Часы</div>{chasiView ? chasiView : "0"}</li>
                            {/* <li className='item-list'><div>Ставка</div>{isNaN(stavkaView) || stavkaView === null ? "0.00" : parseInt(stavkaView).toLocaleString()+".00"}</li> */}
                            <li className='item-list'><div>Ставка</div>{stavkaView ? (parseInt(stavkaView).toLocaleString()+ '.00') : '0.00'}</li>
                            <li className='item-list'><div>Смена</div>{smenaView ? (parseInt(smenaView).toLocaleString()+ '.00') : '0.00'}</li>
                            <li className='item-list'><div>Переработка</div>{pererabotkaView ? (parseInt(pererabotkaView).toLocaleString()+ '.00') : '0.00'}</li>
                            <li className='item-list'><div>Доп. расходы</div>{parseInt((transportView ? transportView : 0) + (gsmView ? gsmView : 0) + (taxiView ? (comtag.find(item => item.name === 'Такси [корпоративное]') ? 0 : taxiView) : 0)).toLocaleString() + '.00'}</li>
                        </ul>
                    </div>
                    <div className='block-button'>
                        <div className='button1' onClick={clickInfo}>Уточнить</div>
                        <div className='button2' onClick={clickInfo}>Подтвердить</div>
                    </div>
                </div> 
            </div> 
        </div>

        <MyModal visible={showModalEtap} setVisible={setShowModalEtap}>
            <div className='modal-card'>
                <div className='rectangle-modal'></div>
                <div className='rectangle-modal2'></div>
                <div className='rectangle-modal3'></div>

                {/* <img src={Question} alt='' style={{position: 'absolute', top: '20px', left: '20px'}}/> */}
                <div className='block-close' onClick={()=>setShowModalEtap(false)}>
                   <img src={Close} alt=''/> 
                </div>

                <p style={{position: 'absolute', width: '100%', top: '45px'}}>
                    Этапы передвижения ваших средств
                </p>

                <div className='block-text'>
                    <ul className='text-modal-list'>
                        <li>01. Предварительно</li>
                        <li>02. Фактически</li>
                        <li>03. Подтверждено</li>
                        <li>04. В процессе [на оплате]</li>
                        <li>05. Оплачено</li>
                    </ul>
                </div>
            </div>
            {/* <img src={BackModal} alt=''/> */}
        </MyModal>

        <MyModal visible={showInfo} setVisible={setShowInfo}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    {/* <p className='vagno'>Важно</p> */}
                    <p className='text-vagno'>Функция находится в разработке</p>
                    <div className='button-ok' onClick={()=>setShowInfo(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
        </MyModal>
    </>
    );
};

export default ProjectItem;