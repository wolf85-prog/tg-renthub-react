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

function Posts() {
    const {tg, user, onClose} = useTelegram();
    const { managerId, status, projects } = useUsersContext();

    const [setManagerId] = useState("");

    const API_URL = process.env.REACT_APP_API_URL
    const API_URL_MANAGER = API_URL + 'managers/chat/';
    const API_URL_PROJECTS = API_URL + 'projects/';
    const API_URL_BLOCKS = API_URL + 'blocks/';
    const API_URL_DATABASE = API_URL + 'database/';

    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([]);
    //const [status, setStatus] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query);
          
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arr_status = [] 
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

//----------start--------------------------------------------------------------------------
    useEffect(() => {
        //setIsPostsLoading(true);
        console.log("projects: ", projects)

        const fetchData = async() => {
            const managerId = await getManagerId(user?.id) //user?.id '805436270'
            //console.log("manager context: ", managerId)
            setManagerId(managerId)

            getProjectData(managerId)
        }

        //fetchData()
    },[])

    //1
    const getManagerId = () => {
        const url = API_URL_MANAGER + user?.id  //'1408579113'; //'805436270'; //user?.id;
        //console.log(url)
        const headers = { 'Content-Type': 'application/json' }
        fetch(url, { headers })
            .then(response => { 
                return response.json()               
            })
            .then(data => {

                if (isEmptyObject(data)) {
                    //console.log('Данные о менеджере (' + user?.first_name + ') отсутствуют БД!')
                    setIsPostsLoading(false);
                } else {
                    //console.log('ManagerId: ', data) 
                    getProjectData(data); 
                }
            })
    }

    //2
    const getProjectData = (id) => {
        //console.log('Get URL: '+ API_URL_PROJECTS + id)
        const headers = { 'Content-Type': 'application/json' }
        fetch(API_URL_PROJECTS + id, { headers })
            .then(response => {
                return response.json()
            })
            .then(data => {
                //console.log("------ post: ", data)
                setPosts(data);
            })
    }

    //3
    const getBlocksData = (post) => {
        console.log('Start getBlockData')
        const headers = { 'Content-Type': 'application/json' }
        fetch(API_URL_BLOCKS + post.id, { headers })
            .then(response => {
                return response.json()
            })
            .then(maincast_id => {
                //console.log('Полученный id блоков: ' + JSON.stringify(maincast_id))
                getWorkData(maincast_id, post);
            })
    }

    //4
    const getWorkData = (id, post) => { 
        const headers = { 'Content-Type': 'application/json' }
        fetch(API_URL_DATABASE + id, { headers })
            .then(response => {
                return response.json()
            })
            .then(worklist => {
                const newPost2 = {
                    id: post.id,
                    title: post.title,
                    time: post.time,
                    time_start: (post.time_start),//.split('T')[0],
                    time_created: (post.time_created),//.split('T')[0],
                    geo: post.geo,
                    teh: post.teh,
                    status_id: post.status_id,
                    manager: post.manager,
                    workers: worklist
                }
                arrayPost.push(newPost2)
                //console.log('Result worklist: ', worklist)    
                //console.log('Result arrayPost: ', arrayPost)              
            }) 
            
    }
    
    

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

    //раскрыть приложение на всю высоту 
    useEffect(()=>{       
        if (!tg.isExpanded) {
           tg.expand() 
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


    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            <p className="status_el">статус</p> 

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
                arr_status={status}
            />


            <div style={{marginBottom: '30px'}}>
                <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>
            </div>

            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <ProjectList posts={sortedAndSearchedPosts} title=""/>
            }
            
            
            <div className="footer">
                <Link to={'/add-project'}><MyButton>Новый проект</MyButton></Link>
            </div>            

        </div>
    );
}

export default Posts;
