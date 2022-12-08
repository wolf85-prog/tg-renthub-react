import React, {useEffect, useState} from "react";
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
    const API_URL_PROJECTS = API_URL + 'projects';
    const API_URL_BLOCKS = API_URL + 'blocks/';
    const API_URL_DATABASE = API_URL + 'database/';

    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([]);

    const [managerId, setManagerId] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(posts2, managerId, filter.sort, filter.query);
    const arrayPost = []     
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    //1
    const getManagerId = () => {
        const url = API_URL_MANAGER + user?.id;
        fetch(url)
            .then(response => {          
                return response.json()
            })
            .then(data => {
                //console.log("Manager ID: ", JSON.stringify(data));
                setManagerId(data);
            })
    }

    //2
    const getProjectData = () => {
        fetch(API_URL_PROJECTS)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data);
                console.log(data)
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
                    geo: post.geo,
                    teh: post.teh,
                    status_id: post.status_id,
                    manager: post.manager,
                    workers: worklist
                }
                arrayPost.push(newPost2)
                console.log('Result worklist')
            }) 
            
    }
    

    useEffect(() => {
        setIsPostsLoading(true);

        getManagerId();  

        if (managerId) {
            getProjectData();
        }                     
    },[])

    useEffect(() => {
        posts.map((post) => 
            getBlocksData(post)
        ); 

        setTimeout(async ()=> {
            setPosts2(arrayPost);
            //console.log('posts2', arrayPost);
            setIsPostsLoading(false);
        }, 23000)  
    },[posts]);          //posts

    return (
        <div className="App">

            <Header header={{title: 'Проекты', icon: 'true'}}/>

            <p className="status_el">cтатус</p> 

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
            />


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
