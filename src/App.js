import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewProject from "./pages/NewProject/NewProject";

function App() {

    const [posts, setPosts] = useState([
        //{id: 1, title: 'Красная площадь', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'red'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}, {id: 2, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        //{id: 2, title: 'Красная площадь2', time: '12/12/2022T00:00:00', geo: '', teh: '', status_id: {id: 1, name: 'Done', color: 'blue'}, workers: [{id: 1, cat: 'audio', spec: 'реж', count: 1, icon: 'Sound'}]},
        // {id: 3, title: 'Тестовый проект', time: '1 января 15:00', geo: '', teh: '', status: 'Обработан'},
    ])

    const [managers, setManagers] = useState([]);

    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const getProjectData = () => {
        fetch('https://telegram.uley.moscow:8000/projects')
            .then(response => {
                return response.json()
            })
            .then(data => {
                //setPosts(data);
                console.log(data);
            })
    }

    // const getManagerData = () => {
    //     fetch('https://telegram.uley.moscow:8000/managers')
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             setManagers(data);
    //         })
    // }

    useEffect(() => {
        //setIsPostsLoading(true);
        getProjectData();
        //getManagerData();
        //setIsPostsLoading(false);
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
                    <Route index element={<Posts posts={posts} />}/>
                    <Route path={'add-project'} element={<NewProject create={createPost}/>}/>
                </Routes>

            </div>
        </ThemeProvider>
    );
}

export default App;
