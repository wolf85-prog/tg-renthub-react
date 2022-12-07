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
    const [array3, setArray3] = useState([]);

    const [managerId, setManagerId] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(posts, managerId, filter.sort, filter.query);
    const arrayPost = []   
    const arrayId = []   
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    //1
    const getManagerId = () => {
        const url = API_URL_MANAGER + user?.id;
        fetch(url)
            .then(response => {          
                return response.text()
            })
            .then(data => {
                console.log("Result 1 getManagerId(): ", JSON.stringify(data));
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
                console.log('Result 2 getProjectData')
                console.log(data)
                setPosts(data);
            })
    }

    //3
    const getBlocksData = (post) => {
        console.log('Start 3 getBlocksData: ')
        fetch(API_URL_BLOCKS + post.id)
            .then(response => {
                return response.json()
            })
            .then(maincast_id => {
               //console.log('Result 3 getBlocksData: ', maincast_id)
               //arrayId.push(maincast_id)
               getWorkData(maincast_id, post);
               //setArray3(arrayId)
               //console.log(arrayId)
            })
    }

    //4
    const getWorkData = (id, post) => {
        console.log('Start 4 getWorkData')  
        fetch(API_URL_DATABASE + id)
            .then(response => {
                return response.json()
            })
            .then(worklist => {
                console.log('Result 4 getWorkData')  
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
                //console.log('arrayPost: ', arrayPost) 
            }) 
            
    }
    

    useEffect(() => {
        console.log('useEffect start')
        setIsPostsLoading(true);

        const manager_id = getManagerId();       
        //if (manager_id) {
            getProjectData();
        //}
               

        setTimeout(async ()=> {
            console.log('posts.map start')
            posts.map((post) => {           
                getBlocksData(post); 
                //console.log('arrayId: ', arrayId) 
            }); 

            //console.log('arrayId.map start')
            //console.log(arrayId) 
            // arrayId.map((id) => {  
            //     //id          
            //     console.log(id)
            // })
            //console.log('array3: ', array3)

            //const numbers = [1, 2, 3, 4, 5];
            //const doubled = arrayId.map((number) => number);
            //console.log(doubled);
            
        }, 4000)

        setTimeout(async ()=> {
            // console.log('setPosts2 start')
            // setPosts2(arrayPost)
            // console.log('setPosts2(arrayPost):', posts2)

            //setArray3(arrayId);
            //console.log('array3: ', arrayId);

            arrayPost.map((post) => {
                console.log('post: ', post)
                //getWorkData(maincast_id, post);
            });
            //console.log(doubled);

            setIsPostsLoading(false);
        }, 15000)


        
               
    }, [])

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
