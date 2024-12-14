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

    const [statusMoney, setStatusMoney] = useState("")
    const [stavka, setStavka] = useState()
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

    let statusMoney2 = 2

    const [chasiView, setChasiView] = useState(0);
    const [smenaView, setSmenaView] = useState(0);
    const [stavkaView, setStavkaView] = useState(0);
    const [pererabotkaView, setPererabotkaView] = useState(0);
    const [transportView, setTransportView] = useState(0);
    const [gsmView, setGsmView] = useState(0);
    const [taxiView, setTaxiView] = useState(0);
    const [comtag, setComtag] = useState([]);

    useEffect(()=> {
        

    }, [])

    

    return (
    <>

        {/* <div className='container'>
                <div className='proj-card'>
                    <div className='rectangle4'></div>

                        <div>
                                     <div className='project-text'>
                                         <p className="project_title" onClick={clickProject}>Здесь будут ваши проекты</p>    
                                     </div>
                                     <img className='vector' onClick={clickProject} src={showProject ? VectorUp : Vector}  alt=''/>  
                        </div>

                                 <div className='shkala-click' onClick={clickShkala} ></div>

                                 <RangeSlider min={0} max={10000} value={valueShkala} step={5} stavka={stavka} setStavka={setStavkaPlus} range={10000} distance={valueShkala} percentage={valueShkala/100}/>
                
                                
                                 <div className='card-footer' onClick={clickShowInfoProj}>
                                     <div><p className='project_money2'>0.00</p></div>
                                 </div>

                                 <div className='smeta' style={{display: showProject ? 'block' : 'none'}}>
                                     <div className='line3'></div>
                                     <div className='smeta-text'>
                                         <ul>
                                             <li className='item-list'><div>Специальность</div>-</li>
                                             <li className='item-list'><div>Вид работ</div>-</li>
                                             <li className='item-list'><div>Часы</div>0</li>
                                             <li className='item-list'><div>Ставка</div>0.00</li>
                                             <li className='item-list'><div>Смена</div>0.00</li>
                                             <li className='item-list'><div>Переработка</div>0.00</li>
                                             <li className='item-list'><div>Доп. расходы</div>0.00</li>
                                         </ul>
                                     </div>
                                     <div className='block-button'>
                                         <div className='button1' onClick={clickInfo}>Уточнить</div>
                                         <div className='button2' onClick={clickInfo}>Подтвердить</div>
                                     </div>
                                 </div> 
                             </div>
        </div> */}

        <div className='container'>           
            <div className='proj-card'>
                <div className='rectangle-projcard'></div>
                <div className='rectangle-projcard2'></div>
                <div className='rectangle-projcard3'></div>
                
                <div className='project-text'>
                    <p className="project_title">Назваине проекта</p>
                    <p className="project_subtitle"></p>
                </div>

                <img  className='vector' src={showProject ? VectorUp : Vector} alt=''/>   
                
                <div className='shkala-click' ></div>
            </div> 
        </div>

    </>
    );
};

export default ProjectItem;