import React, {useEffect, useState, useMemo} from "react";
import { useProjects } from "../../hooks/useProjects"
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import MyButton from "../../components/UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import './Error.css';
import MyModal from "../../components/MyModal/MyModal";

import { getManagerIdApi, getProjectsCashApi } from '../../http/projectAPI';

import iconDown from '../../img/arrow_down.png'
import elka from '../../img/klipartz.com.png'


function Error() {
    const {tg, user, onClose} = useTelegram();
    const { userApp, projects, setProjects } = useUsersContext();
    const navigate = useNavigate();
    const [managerId, setManagerId] = useState("");
	const [projects2, setProjects2] = useState([]);
	const [status, setStatus] = useState([]);
    const [showModal, setShowModal] = useState(true)

	const arr_status = [] 

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query);
          
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arrayPost = []

//---------------------------------------------------------------------------------------

	// при первой загрузке приложения выполнится код ниже
    // useEffect(() => {
    //     setIsPostsLoading(true)
    // }, []);

    // useEffect(() => {
    //     if (projects.length > 0) {
    //         setProjects2(projects)
    //         setIsPostsLoading(false) 
    //     }

    //     setTimeout(()=> {
    //         setIsPostsLoading(false) 
    //     }, 2000)
        
    // }, [projects]);
 

//----------start--------------------------------------------------------------------------

    useEffect(()=>{
        tg.setHeaderColor('#121212') // установка цвета хедера
        tg.setBackgroundColor('#121212') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])


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


    //кнопка Создать проект
    // useEffect(() => {
    //     tg.MainButton.show();
    //     tg.MainButton.enable();
    // }, [])



    return (
        <div className="App">

            {/* <Header header={{title: 'Мои проекты', icon: 'false'}}/> */}


            {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', zIndex: 10, position: 'relative'}}>
                <div>
                    <h2><b>Дорогие коллеги!</b></h2>
                    <h2>Ведутся </h2>
                    <h2>технические работы!</h2>
                    <h2>Напишите ваш вопрос в чат</h2>
                </div>
                
            </div>  */}

            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='info-card' style={{height: '220px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Внимание</p>

                    <p className='text-vagno3'>Ведутся технические работы!</p>
                    <p className='text-vagno3' style={{top: '110px'}}>Задайте ваш вопрос менеджеру через чат</p>
                
                    <div className='button-ok'>
                        <div className='rec-button' onClick={onClose}>Чат</div>        
                    </div>
                </div>
            </MyModal>

        </div>
    );
}

export default Error;
