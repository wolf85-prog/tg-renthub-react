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
import './Posts.css';

import { getManagerIdApi, getProjectsCashApi } from './../../http/projectAPI';

import iconDown from '../../img/arrow_down.png'

function Posts() {
    const {tg, user, onClose} = useTelegram();
    const { userApp, projects, setProjects } = useUsersContext();
    const navigate = useNavigate();
    const [managerId, setManagerId] = useState("");
	const [projects2, setProjects2] = useState([]);
	const [status, setStatus] = useState([]);

	const arr_status = [] 

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query);
          
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arrayPost = []

//---------------------------------------------------------------------------------------

	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(true)
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            setProjects2(projects)
            setIsPostsLoading(false) 
        }

        setTimeout(()=> {
            setIsPostsLoading(false) 
        }, 2000)
        
    }, [projects]);
 

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
    useEffect(() => {
        tg.MainButton.show();
    }, [])

    const onAddProject = () => {
        navigate('/add-project')
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onAddProject)
        return () => {
            tg.offEvent('mainButtonClicked', onAddProject)
        }
    }, [onAddProject])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Новая заявка',
            color: '#000' //'#2e2e2e'
        })
    }, [])



    return (
        <div className="App">

            <Header header={{title: 'Мои проекты', icon: 'false'}}/>

            {/* <p className="status_el">статус</p>  */}

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
                arr_status={status}
            />

            {isPostsLoading ? 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
               <Loader/>
            </div>  
            : <ProjectList posts={sortedAndSearchedPosts} title=""/>
            }

            {/* стрелка */}
            <div className='down-icon'><img src={iconDown} className='down-image' alt='' style={{width: '80px', display: "block"}} /></div>

        </div>
    );
}

export default Posts;
