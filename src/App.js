import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Posts/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewProject from "./pages/NewProject/NewProject";

function App() {

    const [posts, setPosts] = useState([
        //{id: 1, title: 'Красная площадь', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'red'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}, {id: 2, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        //{id: 2, title: 'Красная площадь2', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'blue'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        // {id: 3, title: 'Тестовый проект', time: '1 января 15:00', geo: '', teh: '', status: 'Обработан'},
    ])
    const [posts2, setPosts2] = useState([]);

    const [mainCast, setMainCast] = useState([]);
    
    const [managerId, setManagerId] = useState([]);

    const {user} = useTelegram();

    //console.log('app posts: ', mainCast)
    
    const getManagerId = () => {
        const url = 'https://telegram.uley.moscow:8000/managers/'+ user?.id;
        fetch(url)
            .then(response => {          
                return response.text()
                //return (response ? JSON.stringify(response) : {})
            })
            .then(data => {
                console.log("Result getManagerId(): ", JSON.stringify(data));
                setManagerId(data);
            })
    }

    const getProjectData = () => {
        fetch('https://telegram.uley.moscow:8000/projects')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPosts(data);
            })
    }

    const getBlocksData = (post) => {
        fetch('https://telegram.uley.moscow:8000/blocks/' + post.id)
            .then(response => {
                return response.json()
            })
            .then(maincast_id => {
                //console.log("Result BlockId: ", maincast_id);
                getWorkData(maincast_id, post);
            })
    }

    const getWorkData = (id, post) => {
        fetch('https://telegram.uley.moscow:8000/database/' + id)
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
                setPosts2([...posts2, newPost2])
            })
    }
    

    useEffect(() => {
        const manager_id = getManagerId();

        //if (manager_id) {
            getProjectData();
        //}

        {posts.map((post) => {
               getBlocksData(post);            
            }    
        )}   

        console.log('posts: ', posts)
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
                    <Route index element={<Posts posts={posts} manager={managerId} worklist={mainCast}/>}/>
                    <Route path={'add-project'} element={<NewProject create={createPost}/>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
