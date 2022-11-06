import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProjectList from "./components/ProjectList/ProjectList";
import Form from "./components/Form/Form";
import ProjectForm from "./components/PostForm/ProjectForm";
import Posts from "./pages/Posts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

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
                <Header />

                <Routes>
                    <Route index element={<Posts />}/>
                    <Route path={'form'} element={<Form />}/>
                    <Route path={'add-project'} element={<ProjectForm/>}/>
                </Routes>

            </div>
        </ThemeProvider>
    );
}

export default App;
