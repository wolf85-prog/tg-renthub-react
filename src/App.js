import './style/App.css';
import React, {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProjectList from "./components/ProjectList/ProjectList";
import Form from "./components/Form/Form";
import ProjectForm from "./components/ProjectForm";
import Posts from "./pages/Posts";

function App() {

    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />

            <Routes>
                <Route index element={<Posts />}/>
                <Route path={'form'} element={<Form />}/>
                <Route path={'add-project'} element={<ProjectForm/>}/>
            </Routes>

        </div>
    );
}

export default App;
