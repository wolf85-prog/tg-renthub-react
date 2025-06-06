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


    const [chasiView, setChasiView] = useState(0);
    const [smenaView, setSmenaView] = useState(0);
    const [stavkaView, setStavkaView] = useState(0);
    const [pererabotkaView, setPererabotkaView] = useState(0);
    const [transportView, setTransportView] = useState(0);
    const [gsmView, setGsmView] = useState(0);
    const [taxiView, setTaxiView] = useState(0);
    const [comtag, setComtag] = useState([]);

    const [starActive1, setStarActive1] = useState(false)
    const [starActive2, setStarActive2] = useState(false)
    const [starActive3, setStarActive3] = useState(false)
    const [starActive4, setStarActive4] = useState(false)
    const [starActive5, setStarActive5] = useState(false)


    const clickProject = (id, spec) => {
        console.log("id: ", id, spec, props.project, props.projectCrmId)
        navigate(`/edit-reyting/proj/${props.projectCrmId}/${id}/spec/${spec.replace('/', '|')}`)
        // navigate('/edit-reyting', {
        //     state: {
        //       id: id,
        //       spec: spec
        //     }
        //   });
    }


    //сумма денег для показа при движении фейдера
    useEffect(()=> {
        setStavkaPlus(stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0)
        //console.log("stavka: ", stavka ? stavka.replace(/\s/g, "").split('.')[0] : 0, props.post.title)
    }, [stavka])

    return (
    <>

        <div className='grid-item' style={{zIndex: 10}}>           
            <div className='reyting-card'>
                {/* <svg className="rounded me-2" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                    <rect width="100%" height="100%" fill="#007aff" rx="40"></rect> 
                </svg> */}
                <img onClick={()=>clickProject(props.post.id, props.post.spec)} className="rounded me-2" width="150" height="150" src={props.post.profile ? props.post.profile : AvatarDefault} alt='' style={{borderRadius: '20px', objectFit: 'cover'}}/>
                
                <div className='reyting-text'>
                    <p className="reyting_title" onClick={()=>clickProject(props.post.id, props.post.spec)}>{props.post.name}</p>
                    <p className="reyting_subtitle">{props.post.spec}</p>
                    <div className="reyting-block" style={{cursor: 'pointer', marginBottom: '8px'}}>
                        <img className='star-icon' onClick={()=>setStarActive1(!starActive1)} src={starActive1 ? StarActive : Star} alt='' /> 
                        <img className='star-icon' onClick={()=>setStarActive2(!starActive2)} src={starActive2 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive3(!starActive3)} src={starActive3 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive4(!starActive4)} src={starActive4 ? StarActive : Star} alt='' />
                        <img className='star-icon' onClick={()=>setStarActive5(!starActive5)} src={starActive5 ? StarActive : Star} alt='' />
                    </div> 

                        {/* <div className={cl.fullStars2}>
                            <div className={cl.ratingGroup}>
                                <input name="fst" value="0" type="radio" disabled checked />
                                 
                                <label for="fst-1">
                                    <svg width="201" height="190" viewBox="0 0 201 190" fill="#4F5358" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                        <defs>
                                        <filter id="filter0_iiii_359_354" x="0.775391" y="0" width="208.885" height="199.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="effect1_innerShadow_359_354" result="effect2_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect2_innerShadow_359_354" result="effect3_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect3_innerShadow_359_354" result="effect4_innerShadow_359_354"/>
                                        </filter>
                                        </defs>
                                    </svg>

  
                                </label>
                                <input name="fst" id="fst-1" value="1" type="radio" />
                                
                                <label for="fst-2">
                                <svg width="201" height="190" viewBox="0 0 201 190" fill="#4F5358" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                        <defs>
                                        <filter id="filter0_iiii_359_354" x="0.775391" y="0" width="208.885" height="199.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="effect1_innerShadow_359_354" result="effect2_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect2_innerShadow_359_354" result="effect3_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect3_innerShadow_359_354" result="effect4_innerShadow_359_354"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-2" value="2" type="radio" />
                                  
                                <label for="fst-3">
                                <svg width="201" height="190" viewBox="0 0 201 190" fill="#4F5358" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                        <defs>
                                        <filter id="filter0_iiii_359_354" x="0.775391" y="0" width="208.885" height="199.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="effect1_innerShadow_359_354" result="effect2_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect2_innerShadow_359_354" result="effect3_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect3_innerShadow_359_354" result="effect4_innerShadow_359_354"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-3" value="3" type="radio" />
                                      
                                <label for="fst-4">
                                <svg width="201" height="190" viewBox="0 0 201 190" fill="#4F5358" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                        <defs>
                                        <filter id="filter0_iiii_359_354" x="0.775391" y="0" width="208.885" height="199.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="effect1_innerShadow_359_354" result="effect2_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect2_innerShadow_359_354" result="effect3_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect3_innerShadow_359_354" result="effect4_innerShadow_359_354"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-4" value="4" type="radio" />
                                  
                                <label for="fst-5">
                                <svg width="201" height="190" viewBox="0 0 201 190" fill="#4F5358" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                        <defs>
                                        <filter id="filter0_iiii_359_354" x="0.775391" y="0" width="208.885" height="199.11" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                                        <feBlend mode="normal" in2="effect1_innerShadow_359_354" result="effect2_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect2_innerShadow_359_354" result="effect3_innerShadow_359_354"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dx="11.4545" dy="9.16364"/>
                                        <feGaussianBlur stdDeviation="4.58182"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                        <feBlend mode="normal" in2="effect3_innerShadow_359_354" result="effect4_innerShadow_359_354"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-5" value="5" type="radio" />
                            </div>
                        </div> */}
                </div> 

                
            </div> 
        </div>

    </>
    );
};

export default ReytingItem;