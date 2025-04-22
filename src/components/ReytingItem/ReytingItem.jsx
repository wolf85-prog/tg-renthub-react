import React, {useState, useEffect, useRef} from 'react';
import './ReytingItem.css';
import {useNavigate} from "react-router-dom";
import Loader from "../UI/Loader_min/Loader_min"
import Slider from '@mui/material/Slider';

import MyModal from "../MyModal/MyModal";
import BackModal from "../../img/new/card.svg"

import { useUsersContext } from "../../contexts/UserContext";
//import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import btnChat from "../../img/new/btn_chat.svg"
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import Ukazatel from "../../img/new/ukazatel.png"
import Close from "../../img/new/close.svg"
import ClosePress from "../../img/new/close_press.svg"


const ReytingItem = (props) => {

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

        <div className='grid-item' style={{zIndex: 10}}>           
            <div className='proj-card'>
                <svg className="rounded me-2" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                    <rect width="100%" height="100%" fill="#007aff" rx="40"></rect> 
                </svg>
                
                <div className='project-text'>
                    <p className="project_title" onClick={clickProject}>{props.post.name}</p>
                    <p className="project_subtitle"></p>
                </div>  
            </div> 
        </div>

    </>
    );
};

export default ReytingItem;