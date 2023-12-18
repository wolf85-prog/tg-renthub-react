import React, { createContext, useContext, useEffect, useState } from "react";
import { getManagerIdApi, getProjectsApi, getProjectsCashApi } from './../http/projectAPI';
import {useTelegram} from "./../hooks/useTelegram";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const {user} = useTelegram();

	const [managerId, setManagerId] = useState("");
	const [projects, setProjects] = useState([]);
	const [status, setStatus] = useState([]);

    const [userApp, setUserApp] = useState('1408579113');

	const arr_status = [] 

	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        const fetchData = async() => {
            setUserApp(user?.id)

            const managerId = await getManagerIdApi(user?.id) //user?.id '805436270' '1408579113'
            setManagerId(managerId)

			if (!managerId) {
				console.log('Данные о менеджере (' + user?.first_name + ') отсутствуют БД!')
			} else {
				console.log('ManagerId Context: ', managerId) 
				
				//const projects = await getProjectsApi(managerId)
				const res = await getProjectsCashApi()
				const projectsManager = res.filter((item) => item.manager === managerId)
				console.log("------ post: ", projectsManager)
				
				setProjects(projectsManager)
			}
        }


        fetchData()

    }, []);

	useEffect(() => {
        const countItems = {}; // здесь будет храниться промежуточный результат
        for (const item of projects) {
            // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
            //ВЫВОДИТЬ КНОПКИ БЕЗ ненужных кнопок фильтра
            if (item.status_id && item.status_id.name != 'Test' && item.status_id.name != 'OnHold' && item.status_id.name != 'Deleted') {
                countItems[item.status_id.name] = countItems[item.status_id.name] ? countItems[item.status_id.name] + 1 : 1;
            }
        }
        //console.log('countItemsStatus: ', countItems);

        const obj = {
            title: 'All',
            color: "gray",
            count: '',
        }
        arr_status.push(obj) 
        
        const objectArray = Object.entries(countItems);
        objectArray.forEach(([key, value]) => {
            const obj = {
                title: key,
                color: "",
                count: value,
            }
            arr_status.push(obj) 
        });

        //console.log('arr status: ', arr_status);
        setStatus(arr_status);

    },[projects]);  


    return (
		<UserContext.Provider value={{ 
			projects,
			setProjects,
			managerId,
			setManagerId,
			status,
            setStatus,
            userApp,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };