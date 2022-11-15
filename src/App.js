import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import Posts from "./pages/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Form from "./components/Form/Form";
import NewProject from "./pages/NewProject/NewProject";
import ProductList from "./components/ProductList/ProductList";

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'Красная площадь', time: '4 ноября 17:00', geo: '', teh: '', status: 'Готов'},
        {id: 2, title: 'Новый год', time: '31 декабря 12:00', geo: '', teh: '', status: 'В эфире'},
        {id: 3, title: 'Тестовый проект', time: '1 января 15:00', geo: '', teh: '', status: 'Обработан'},
    ])

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
                    {/*<Route index element={<Posts posts={posts}/>}/>*/}
                    <Route index element={<ProductList />}/>
                    <Route path={'add-project'} element={<NewProject create={createPost}/>}/>
                    <Route path={'form'} element={<Form create={createPost}/>}/>
                </Routes>

            </div>
        </ThemeProvider>
    );
}

export default App;
