import React, { useState, useEffect, useCallback } from 'react';
import {useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate, useLocation} from "react-router-dom";
import Header from "../../components/Header2/Header2";
import DropdownClient from '../../components/DropdownClient/DropdownClient';
import './EditReyting.css';

import comtegs from './../../data/comtegs';

import BlackFon from "./../../img/fon_grad.svg";
import AvatarDefault from "./../../img/blank-avatar.png";
import Star from "./../../img/star.png";
import StarActive from "./../../img/star_activ.svg";

import { getSpecId } from '../../http/projectAPI';

const API_URL = process.env.REACT_APP_API_URL

const EditReyting = () => {
    const { id, spec } = useParams();
    //const { spec } = useParams();
    const location = useLocation();

    const navigate = useNavigate();
    const {tg, queryId, user, onClose} = useTelegram();

    const [starActive1, setStarActive1] = useState(false)
    const [starActive2, setStarActive2] = useState(false)
    const [starActive3, setStarActive3] = useState(false)
    const [starActive4, setStarActive4] = useState(false)
    const [starActive5, setStarActive5] = useState(false)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [projectCount, setProjectCount] = useState(0)
    const [comment, setComment] = useState('')
    const [comteg, setComteg] = useState([]);
    const [profile, setProfile] = useState('')

    const [widthD, setWidthD] = useState(0)


//----------------------------------------------------------------------------------
    useEffect(()=> {
        const fetch = async() => {
            const resSpec = await getSpecId(id)
            console.log("resSpec: ", resSpec, )
            setName(resSpec?.fio.split(' ')[1])
            setAge(parseInt(new Date().getFullYear())-parseInt(resSpec?.age.split('-')[0]))
            setProjectCount(resSpec?.projectAll ? resSpec?.projectAll : 0)
            setProfile(resSpec?.profile)
        }

        fetch()
    }, [])


    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    //отправка данных в telegram-бот
    const onSendData = () => {
        const data = {
            reyting,
            comteg,
            comment,
        }

        setIsLoading(true)

        fetch('https://uley.company:5000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }) 
        setIsLoading(false)
              
    }

    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])

    const handleClick = () => navigate(-1);

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


    const saveProfile = () => {
        onSendData()
        navigate(-1);
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App" style={{width: '100%'}}>
            {/* <Header header={{title: 'Моё предложение', icon: 'false'}}/> */}

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />


            <div style={{zIndex: '10', position: 'relative', padding: '15px', textAlign: '-webkit-center'}}>
                <img className="rounded me-2" width="100%" height="100%" src={profile ? profile : AvatarDefault} alt='' style={{borderRadius: '20px'}}/>

                <div className='reyting-text'>
                    <p className="reyting_title">{name}</p>
                </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <p>Возраст</p>
                            <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                style={{
                                    backgroundColor: 'transparent', 
                                    color: '#fff',
                                    border: '1px solid #4f4f55'
                                }}>{age}
                            </div>
                        </div>
                        
                        {/* <div className="reyting-block" style={{cursor: 'pointer', marginBottom: '8px', marginTop: '25px'}}>
                            <img className='star-icon_profile' onClick={()=>setStarActive1(!starActive1)} src={starActive1 ? StarActive : Star} alt='' /> 
                            <img className='star-icon_profile' onClick={()=>setStarActive2(!starActive2)} src={starActive2 ? StarActive : Star} alt='' />
                            <img className='star-icon_profile' onClick={()=>setStarActive3(!starActive3)} src={starActive3 ? StarActive : Star} alt='' />
                            <img className='star-icon_profile' onClick={()=>setStarActive3(!starActive3)} src={starActive3 ? StarActive : Star} alt='' />
                            <img className='star-icon_profile' onClick={()=>setStarActive5(!starActive5)} src={starActive5 ? StarActive : Star} alt='' />
                        </div>  */}
                        <div class="full-stars">
                            <div class="rating-group">
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
                                    <svg width="201" height="190" viewBox="0 0 201 190" fill="#337AB7" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-2" value="2" type="radio" />
                                  
                                <label for="fst-3">
                                    <svg width="201" height="190" viewBox="0 0 201 190" fill="#337AB7" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                    </svg> 
                                </label>
                                <input name="fst" id="fst-3" value="3" type="radio" />
                                      
                                <label for="fst-4">
                                    <svg width="201" height="190" viewBox="0 0 201 190" fill="#337AB7" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-4" value="4" type="radio" />
                                  
                                <label for="fst-5">
                                    <svg width="201" height="190" viewBox="0 0 201 190" fill="#337AB7" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8" filter="url(#filter0_iiii_359_354)">
                                        <path d="M100.636 0L124.21 72.5532H200.497L138.78 117.394L162.354 189.947L100.636 145.106L38.9188 189.947L62.4927 117.394L0.775299 72.5532H77.0623L100.636 0Z" />
                                        </g>
                                    </svg>
                                </label>
                                <input name="fst" id="fst-5" value="5" type="radio" />
                            </div>
                        </div>

                        <div>
                            <p>Проекты</p>
                            <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                style={{
                                    backgroundColor: 'transparent', 
                                    color: '#fff',
                                    border: '1px solid #4f4f55'
                                }}>{projectCount}
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '47%'}}>
                            <p>Старт</p>
                            <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                style={{
                                    backgroundColor: 'transparent', 
                                    color: '#fff',
                                    border: '1px solid #4f4f55'
                                }}>...
                            </div>
                        </div>
                        <div style={{width: '47%'}}>
                            <p>Стоп</p>
                            <div className="text-field">
                                <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                    style={{
                                        backgroundColor: 'transparent', 
                                        color: '#fff',
                                        border: '1px solid #4f4f55'
                                    }}>...
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <p className="reyting_subtitle">Специальность</p>
                    <div className="text-field">
                        <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                            style={{
                                backgroundColor: 'transparent', 
                                color: '#fff',
                                border: '1px solid #4f4f55'
                            }}>{spec}
                        </div>
                    </div>


                    <p className="reyting_subtitle">Комтег</p>
                    <div className="text-field"> 
                        <DropdownClient
                            style={{backgroundColor: '#282b2e', left: '186px'}}
                            options={comtegs}
                            tags={comteg}
                            setTags={setComteg}
                        />
                    </div>


                    <p className="reyting_subtitle">Комментарий</p>
                    <div className="text-field" style={{marginBottom: '0px'}}>
                        <textarea 
                            type="text" 
                            name="comment" 
                            id="comment"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                            style={{
                                resize: 'none', 
                                width: '100%', 
                                height: '100px', 
                                whiteSpace: 'pre-line', 
                                borderRadius: '6px', 
                                textAlign: 'left', 
                                marginBottom: '20px',
                                backgroundColor: 'transparent',
                                border: '1px solid #4f4f55',
                                color: '#fff',
                                padding: '10px',
                                fontSize: '16px',
                            }}
                        />
                    </div> 
                    

                    <div onClick={saveProfile} style={{width: '100%', padding: '7px', height: '40px', border: '1px solid green', borderRadius: '10px'}}>
                        <span style={{fontSize: '16px', color: 'green'}}>
                            Сохранить
                        </span>
                    </div> 
                {/* </div>  */}
            </div>
            
                
        </div>
    );
};


export default EditReyting;