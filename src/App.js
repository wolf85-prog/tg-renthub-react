import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Post/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewProject from "./pages/NewProject/NewProject";

function App() {

    const [posts, setPosts] = useState([
        //{id: 1, title: 'Красная площадь', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'red'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}, {id: 2, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        //{id: 2, title: 'Красная площадь2', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'blue'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        // {id: 3, title: 'Тестовый проект', time: '1 января 15:00', geo: '', teh: '', status: 'Обработан'},
    ])

    const {user} = useTelegram();
    const [managerId, setManagerId] = useState('');

    const getManagerId = () => {
        const url = 'https://telegram.uley.moscow:8000/managers/'+ user?.id;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setManagerId(data);
                console.log(data);
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


    useEffect(() => {
        const manager_id = getManagerId();

        //if (manager_id) {
            getProjectData();
        //}
        
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
                    <Route index element={<Posts posts={posts} manager={managerId} />}/>
                    <Route path={'add-project'} element={<NewProject create={createPost}/>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
