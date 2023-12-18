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

import { getManagerIdApi, getProjectsCashApi } from '../../http/projectAPI';

function Load() {
    const {tg, user, onClose} = useTelegram();
    const { userApp, projects, setProjects } = useUsersContext();
    const navigate = useNavigate();
    const [managerId, setManagerId] = useState("");

    const [isPostsLoading, setIsPostsLoading] = useState(false);

//---------------------------------------------------------------------------------------


	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setIsPostsLoading(true);
        const fetchData = async() => {
            const managerId = await getManagerIdApi(userApp) //user?.id '805436270' '1408579113'
            setManagerId(managerId)

			if (!managerId) {
				console.log('Данные о менеджере отсутствуют БД!')
			} else {
				console.log('ManagerId Context: ', managerId) 
				
				//const projects = await getProjectsApi(managerId)
				const res = await getProjectsCashApi()
				const projectsManager = res.filter((item) => item.manager === managerId)
				console.log("------ post: ", projectsManager)
				
				//setProjects(projectsManager)
                setProjects(projectsManager)
			}
        }


        fetchData()

    }, []);

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        setTimeout(() =>  navigate("/posts"), 1500)
    }, []);

    useEffect(()=>{
        tg.expand() //раскрыть приложение на всю высоту
    }, [])


    return (
        <div className="App">
            <Loader/>
        </div>
    );
}

export default Load;
