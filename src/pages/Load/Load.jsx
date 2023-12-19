import React, {useEffect, useState, useMemo} from "react";
import { useProjects } from "../../hooks/useProjects"
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import MyButton from "../../components/UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import './Load.css';


function Load() {
    const {tg} = useTelegram();   
    const navigate = useNavigate();

    useEffect(() => {     
        setTimeout(()=> {
            navigate("/posts")
        }, 1000)
            
    }, []);

//---------------------------------------------------------------------------------------

    useEffect(()=>{
        tg.expand() //раскрыть приложение на всю высоту
    }, [])


    return (
        <div className="App">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
               <Loader/>
            </div>   
        </div>
    );
}

export default Load;
