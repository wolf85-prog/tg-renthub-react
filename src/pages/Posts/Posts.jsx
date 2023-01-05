import React, {useEffect, useState, useMemo} from "react";
import {useProjects} from "../../hooks/useProjects"
import {useTelegram} from "../../hooks/useTelegram";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import MyButton from "../../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import './Posts.css';

function Posts() {
    const {user} = useTelegram();

    const API_URL = 'https://proj.uley.team:8000/'
    const API_URL_MANAGER = API_URL + 'managers/';
    const API_URL_PROJECTS = API_URL + 'projects/';
    const API_URL_BLOCKS = API_URL + 'blocks/';
    const API_URL_DATABASE = API_URL + 'database/';

    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([]);
    const [status, setStatus] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(posts2, filter.sort, filter.query);
          
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arr_status = [] 
    const arrayPost = []

    //1
    const getManagerId = () => {
        const url = API_URL_MANAGER + user?.id; //'1408579113'; //'805436270'; //user?.id;
        fetch(url)
            .then(response => { 
                return response.json()               
            })
            .then(data => {
                console.log('------ ManagerId: ', data)
                getProjectData(data);               
            })
    }

    //2
    const getProjectData = (id) => {
        console.log('Get URL: '+ API_URL_PROJECTS + id)
        fetch(API_URL_PROJECTS + id)
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
        fetch(API_URL_BLOCKS + post.id)
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
        fetch(API_URL_DATABASE + id)
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
    
    //start
    useEffect(() => {
        setIsPostsLoading(true);
        getManagerId();                    
    },[])

    useEffect(() => {
        const countItems = {}; // здесь будет храниться промежуточный результат
        for (const item of posts) {
            // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
            if (item.status_id.name != 'Test' && item.status_id.name != 'OnHold') {
                countItems[item.status_id.name] = countItems[item.status_id.name] ? countItems[item.status_id.name] + 1 : 1;
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

        //console.log('arr status: ', arr_status);
        setStatus(arr_status);

        posts.map((post) => {
            getBlocksData(post)
        }); 

        setTimeout(async ()=> {
            setPosts2(arrayPost);
            setIsPostsLoading(false);
        }, 4000)  
    },[posts]);         //posts


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
