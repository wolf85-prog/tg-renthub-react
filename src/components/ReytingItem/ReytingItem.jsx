import React, {useState, useEffect, useRef} from 'react';
import './ReytingItem.module.css';
import cl from './ReytingItem.module.css';
import {useNavigate} from "react-router-dom";
import Loader from "../UI/Loader_min/Loader_min"
import Slider from '@mui/material/Slider';

import MyModal from "../MyModal/MyModal";
import BackModal from "../../img/new/card.svg"
import Star from "./../../img/star.png";
import StarActive from "./../../img/star_activ.svg";

import { useUsersContext } from "../../contexts/UserContext";
//import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import btnChat from "../../img/new/btn_chat.svg"
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import Ukazatel from "../../img/new/ukazatel.png"
import Close from "../../img/new/close.svg"
import ClosePress from "../../img/new/close_press.svg"
import AvatarDefault from "./../../img/blank-avatar.png";


const ReytingItem = (props) => {
    const navigate = useNavigate();
    const {specId, projectDate, setProjectDate, setIsLoading} = useUsersContext();

    const [stavka, setStavka] = useState(0)
    const [cashStavka, setCashStavka] = useState({})

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


    const [chasiView, setChasiView] = useState(0);
    const [smenaView, setSmenaView] = useState(0);
    const [stavkaView, setStavkaView] = useState(0);
    const [pererabotkaView, setPererabotkaView] = useState(0);
    const [transportView, setTransportView] = useState(0);
    const [gsmView, setGsmView] = useState(0);
    const [taxiView, setTaxiView] = useState(0);
    const [comtag, setComtag] = useState([]);
    const [reyting, setReyting] = useState(0)
    const [workerId, setWorkerId] = useState(0)

    const [starActive1, setStarActive1] = useState(false)
    const [starActive2, setStarActive2] = useState(false)
    const [starActive3, setStarActive3] = useState(false)
    const [starActive4, setStarActive4] = useState(false)
    const [starActive5, setStarActive5] = useState(false)


    const clickProject = (id, spec) => {
        console.log("id: ", id, spec, props.project, props.projectCrmId, props.post.date)
        setProjectDate(props.post.date)
        navigate(`/edit-reyting/proj/${props.project}/${id}/spec/${spec.replace('/', '|')}`)
        // navigate('/edit-reyting', {
        //     state: {
        //       id: id,
        //       spec: spec
        //     }
        //   });
    }

    //отправка данных в telegram-бот
    const onSendData = (rey) => {
        const data = {
            projectname: props.project,
            projectdata: props.post.date,
            workerId: props.post.id,
            reyting: rey,
        }

        console.log("data: ", data)

        setIsLoading(true)

        try {
            fetch('https://proj.uley.team:8002/reytingsonly', {
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


    //сумма денег для показа при движении фейдера
    useEffect(()=> {
        setStavkaPlus(stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0)
        //console.log("stavka: ", stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0, props.post.title)
    }, [stavka])

    const pressStar = (star) => {
        if (star === 1) {
           setStarActive1(true) 
           setStarActive2(false) 
           setStarActive3(false) 
           setStarActive4(false) 
           setStarActive5(false) 

           setReyting(1)

           onSendData(1)
        } 
        else if (star === 2) {
           setStarActive2(true) 
           setStarActive1(true) 
           setStarActive3(false) 
           setStarActive4(false) 
           setStarActive5(false) 
           setReyting(2)
           onSendData(2)
        } 
        else if (star === 3) {
           setStarActive3(true) 
           setStarActive1(true) 
           setStarActive2(true) 
           setStarActive4(false) 
           setStarActive5(false) 
           setReyting(3)
           onSendData(3)
        } 
        else if (star === 4) {
           setStarActive4(true) 
           setStarActive1(true) 
           setStarActive2(true) 
           setStarActive3(true) 
           setStarActive5(false) 
           setReyting(4)
           onSendData(4)
        } 
        else if (star === 5) {
           setStarActive5(true) 
           setStarActive1(true) 
           setStarActive2(true) 
           setStarActive3(true) 
           setStarActive4(true) 
           setReyting(5)
           onSendData(5)
        }

    }

    return (
    <>

        <div className='grid-item' style={{zIndex: 10}}>           
            <div className='reyting-card'>
                {/* <svg className="rounded me-2" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                    <rect width="100%" height="100%" fill="#007aff" rx="40"></rect> 
                </svg> */}
                <img onClick={()=>clickProject(props.post.id, props.post.spec)} className="rounded me-2" width="150" height="150" src={props.post.profile ? props.post.profile : AvatarDefault} alt='' style={{borderRadius: '20px', objectFit: 'cover'}}/>
                
                <div className='reyting-text'>
                    <p className="reyting_title" onClick={()=>clickProject(props.post.id, props.post.spec)}>{props.post.name.replace(/\[.+\]/,'')}</p>
                    <p className="reyting_subtitle">{props.post.spec}</p>
                    <div className="reyting-block" style={{cursor: 'pointer', marginBottom: '8px'}}>
                        <img className='star-icon' onClick={()=>pressStar(1)} src={starActive1 ? StarActive : Star} alt='' /> 
                        <img className='star-icon' onClick={()=>pressStar(2)} src={starActive2 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>pressStar(3)} src={starActive3 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>pressStar(4)} src={starActive4 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>pressStar(5)} src={starActive5 ? StarActive : Star} alt='' />
                    </div>         
                </div> 

                
            </div> 
        </div>

    </>
    );
};

export default ReytingItem;