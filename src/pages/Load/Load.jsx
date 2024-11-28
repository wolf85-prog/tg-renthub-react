import React, { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import './Load.css';


function Load() {
    const {tg} = useTelegram();   
    const navigate = useNavigate();

    useEffect(() => {     
        setTimeout(()=> {
            navigate("/profile")
        }, 1000)
            
    }, []);

//---------------------------------------------------------------------------------------

    useEffect(()=>{
        tg.setHeaderColor('#121212') // установка цвета хедера
        tg.setBackgroundColor('#121212') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
        tg.expand() //раскрыть приложение на всю высоту 
        }
        
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
