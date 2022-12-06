import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Posts/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewProject from "./pages/NewProject/NewProject";

function App() {
    const API_URL = 'https://proj.uley.team:8000/'
    const API_URL_MANAGER = API_URL + 'managers/';
    const API_URL_PROJECTS = API_URL + 'projects';
    const API_URL_BLOCKS = API_URL + 'blocks';
    const API_URL_DATABASE = API_URL + 'database/';

    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([]);

    const arrayPost = []
    
    const [managerId, setManagerId] = useState([]);

    const {user} = useTelegram();
    
    const getManagerId = () => {
        const url = API_URL_MANAGER + user?.id;
        fetch(url)
            .then(response => {          
                return response.text()
            })
            .then(data => {
                console.log("Result getManagerId(): ", JSON.stringify(data));
                setManagerId(data);
            })
    }

    const getProjectData = () => {
        fetch(API_URL_PROJECTS)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data);
            })
    }

    const getBlocksData = (post) => {
        fetch(API_URL_BLOCKS + post.id)
            .then(response => {
                return response.json()
            })
            .then(maincast_id => {
                getWorkData(maincast_id, post);
            })
    }

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
                
                console.log('arrayPost: ', arrayPost) 
                
            })

            
    }
    

    useEffect(() => {
        const manager_id = getManagerId();
        //if (manager_id) {
            getProjectData();
        //}
        
        posts.map((post) => {           
                getBlocksData(post);           
            }   
        ); 

        setTimeout(async ()=> {
            setPosts2(arrayPost)
        }, 20000)
               
    }, [])

    


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Routes>
                    <Route index element={<Posts manager={managerId} posts={posts2}/>}/>
                    <Route path={'add-project'} element={<NewProject create={createPost}/>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
