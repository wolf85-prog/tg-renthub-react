import React, {useEffect, useState, useMemo} from "react";
import { useProjects } from "../../hooks/useProjects"
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import MyButton from "../../components/UI/MyButton/MyButton";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import './Posts.css';

import { getManagerIdApi, getProjectsCashApi } from './../../http/projectAPI';

function Posts() {
    const {tg, user, onClose} = useTelegram();
    const { userApp } = useUsersContext();

    const [managerId, setManagerId] = useState("");
	const [projects, setProjects] = useState([]);
	const [status, setStatus] = useState([]);

	const arr_status = [] 

    // const API_URL = process.env.REACT_APP_API_URL
    // const API_URL_MANAGER = API_URL + 'managers/chat/';
    // const API_URL_PROJECTS = API_URL + 'projects/';
    // const API_URL_BLOCKS = API_URL + 'blocks/';
    // const API_URL_DATABASE = API_URL + 'database/';

    // const [posts, setPosts] = useState([])
    // const [posts2, setPosts2] = useState([]);
    //const [status, setStatus] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query);
          
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arrayPost = []

//---------------------------------------------------------------------------------------

    function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }


	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(true);
        const fetchData = async() => {
            const managerId = await getManagerIdApi(userApp) //user?.id '805436270' '1408579113'
            setManagerId(managerId)

			if (!managerId) {
				console.log('Данные о менеджере отсутствуют БД!')
			} else {
				console.log('ManagerId Context: ', managerId) 
				
				//const projects = await getProjectsApi(managerId)
				const res = await getProjectsCashApi()
				const projectsManager = res.filter((item) => item.manager === managerId)
				console.log("------ post: ", projectsManager)
				
				setProjects(projectsManager)
			}
        }


        fetchData()

    }, []);

	useEffect(() => {
        const countItems = {}; // здесь будет храниться промежуточный результат
        for (const item of projects) {
            const status = JSON.parse(item.status)
            // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
            //ВЫВОДИТЬ КНОПКИ БЕЗ ненужных кнопок фильтра
            if (status && status.name != 'Test' && status.name != 'OnHold' && status.name != 'Deleted') {
                countItems[status.name] = countItems[status.name] ? countItems[status.name] + 1 : 1;
            }
        }
        //console.log('countItemsStatus: ', countItems);

        const obj = {
            title: 'All',
            color: "gray",
            count: '',
        }
        arr_status.push(obj) 
        
        const objectArray = Object.entries(countItems);
        objectArray.forEach(([key, value]) => {
            const obj = {
                title: key,
                color: "",
                count: value,
            }
            arr_status.push(obj) 
        });

        console.log('arr status: ', arr_status);
        setStatus(arr_status);
        setIsPostsLoading(false);
    },[projects]);  

//----------start--------------------------------------------------------------------------
    // useEffect(() => {
    //     //setIsPostsLoading(true);
    //    //setTimeout(()=> {
    //         //console.log("projects: ", sortedAndSearchedPosts)
    //    // }, 3000)
        

    //     const fetchData = async() => {
    //         const managerId = await getManagerId(user?.id) //user?.id '805436270'
    //         //console.log("manager context: ", managerId)
    //         setManagerId(managerId)

    //         getProjectData(managerId)
    //     }

    //     //fetchData()
    // },[])

    //1
    // const getManagerId = () => {
    //     const url = API_URL_MANAGER + user?.id  //'1408579113'; //'805436270'; //user?.id;
    //     //console.log(url)
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(url, { headers })
    //         .then(response => { 
    //             return response.json()               
    //         })
    //         .then(data => {

    //             if (isEmptyObject(data)) {
    //                 //console.log('Данные о менеджере (' + user?.first_name + ') отсутствуют БД!')
    //                 setIsPostsLoading(false);
    //             } else {
    //                 //console.log('ManagerId: ', data) 
    //                 getProjectData(data); 
    //             }
    //         })
    // }

    //2
    // const getProjectData = (id) => {
    //     //console.log('Get URL: '+ API_URL_PROJECTS + id)
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(API_URL_PROJECTS + id, { headers })
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             //console.log("------ post: ", data)
    //             setPosts(data);
    //         })
    // }

    //3
    // const getBlocksData = (post) => {
    //     console.log('Start getBlockData')
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(API_URL_BLOCKS + post.id, { headers })
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(maincast_id => {
    //             //console.log('Полученный id блоков: ' + JSON.stringify(maincast_id))
    //             getWorkData(maincast_id, post);
    //         })
    // }

    //4
    // const getWorkData = (id, post) => { 
    //     const headers = { 'Content-Type': 'application/json' }
    //     fetch(API_URL_DATABASE + id, { headers })
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(worklist => {
    //             const newPost2 = {
    //                 id: post.id,
    //                 title: post.title,
    //                 time: post.time,
    //                 time_start: (post.time_start),//.split('T')[0],
    //                 time_created: (post.time_created),//.split('T')[0],
    //                 geo: post.geo,
    //                 teh: post.teh,
    //                 status_id: post.status_id,
    //                 manager: post.manager,
    //                 workers: worklist
    //             }
    //             arrayPost.push(newPost2)           
    //         }) 
            
    // }
    

    // useEffect(() => {
    //     posts.map((post) => {
    //         getBlocksData(post)
    //     }); 

    //     setTimeout(async ()=> {
    //         setPosts2(arrayPost);
    //         //setIsPostsLoading(false);
    //     }, 4000)  
        
    //     setTimeout(async ()=> {
    //         setIsPostsLoading(false);
    //     }, 8000) 

    // },[posts]);           //posts


    useEffect(()=>{
        tg.setHeaderColor('#000') // установка цвета хедера
        tg.setBackgroundColor('#000') // установка цвета бэкграунда
        
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


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Новая заявка',
            color: '#000' //'#2e2e2e'
        })
    }, [])


    const clickWorkhub = () => {
        showFooter ? setShowFooter(false) : setShowFooter(true)
    }

    useEffect(() => {
        tg.onEvent('mainButtonClicked', clickWorkhub)
        return () => {
            tg.offEvent('mainButtonClicked', clickWorkhub)
        }
    }, [clickWorkhub])


    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            <p className="status_el">статус</p> 

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
                arr_status={status}
            />


            {/* <div style={{marginBottom: '30px'}}>
                <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>
            </div> */}

            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <ProjectList posts={sortedAndSearchedPosts} title=""/>
            }
            
            
            {/* <div className="footer">
                <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>
            </div>             */}

        </div>
    );
}

export default Posts;
