import React, {useMemo, useState, useEffect} from 'react';
import './ProjectList.css';
import ProjectItem from "../ProjectItem/ProjectItem";
import Vector from "../../img/new/vector.svg"
import VectorUp from "../../img/new/vector_up.svg"
import RangeSlider from '../UI/RangeSlider/RangeSlider';
import MyModal from "../../components/MyModal/MyModal";

import Close from "../../img/new/close.svg"

const ProjectList = ({posts, title, remove}) => {
    
    const [statusMoney, setStatusMoney] = useState('Фактически')
    const [showInfoChat, setShowInfoChat] = useState(false)
    const [showInfoProj, setShowInfoProj] = useState(false)
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    const [showProject, setShowProject] = useState(false);
    const [showModalEtap, setShowModalEtap] = useState(false);
    const [valueShkala, setValueShkala] = useState(0);
    const [stavka, setStavka] = useState()
    const [stavkaPlus, setStavkaPlus] = useState(0);
    const [showInfo, setShowInfo] = useState(false)

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

    const clickShowInfoChat = () => {
        setShowInfoChat(true)
    }

    const clickShowInfoProj = () => {
        setShowInfoProj(true)
    }

    const clickProject = () => {
        showProject ? setShowProject(false) : setShowProject(true)
    }

    const clickShkala = () => {
        showModalEtap ? setShowModalEtap(false) : setShowModalEtap(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }
    
    if (!posts.length) {
        return (
            // <h2 style={{textAlign: 'center', paddingTop: '80px', paddingBottom: '80px'}}>
            //     Проекты не найдены
            // </h2>
            <>
            <div className='container'>
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
        )
    } else {
        console.log("Кол-во проектов: ", posts.length)
    }

    return (
        <div className="list-item">
            <h1>
                {title}
            </h1>
                     
                     
            {posts.map((post, index) =>
                <ProjectItem number={index + 1} post={post} key={post.id}/>      
            )}
            
        </div>
    );
};

export default ProjectList;