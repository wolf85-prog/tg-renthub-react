import React, { createContext, useContext, useEffect, useState } from "react";
import { getCompanysApi, getManagerApi, getProjectsApi, getProjectsCashApi } from './../http/projectAPI';
import {useTelegram} from "./../hooks/useTelegram";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const {user} = useTelegram();
    const [workerhub, setWorkerhub] = useState();
	const [managerId, setManagerId] = useState('');
	const [projects, setProjects] = useState([]);
	const [status, setStatus] = useState([]);
    const [companys, setCompanys] = useState([]);
    const [companyId, setCompanyId] = useState('');
    const [companyManager, setCompanyManager] = useState('');
    const [companyProfile, setCompanyProfile] = useState('');
    const [userApp, setUserApp] = useState('');

    const [projectDate, setProjectDate] = useState('');

    //категории рассылки
    const [distrib, setDistrib] = useState({id: '', cat: '', spec: '', icon: ''})
    const [distribs, setDistribs] = useState([])

    //регион рассылки
    const [distrib2, setDistrib2] = useState({id: '', cat: '', spec: '', icon: ''})
    const [distribs2, setDistribs2] = useState([])

	const arr_status = [] 

    //количество работников
    const [count, setCount] = useState(1)

	// при первой загрузке приложения выполнится код ниже
    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        setUserApp(user?.id)

        const fetchData = async() => {
            const managerId = user?.id //user?.id '805436270' '1408579113'

            const manager = await getManagerApi(user?.id)
            console.log("manager profile: ", manager) 

            setManagerId(manager?.id)

            setWorkerhub(manager)

            const resCompany = await getCompanysApi()
            const company = resCompany.find((item)=> item.id === parseInt(manager?.companyId) || item.GUID === manager?.companyId && manager?.companyId !== null)

            setCompanyId(manager?.companyId)          
            setCompanyManager(company?.title)
            setCompanyProfile(company?.profile)

            let arr = []
            if (manager?.worklist) {
                JSON.parse(manager.worklist).map((item, index)=> {
                    const obj = {
                        id: Date.now()+index,
                        cat: item.cat,
                        icon: '',
                        spec: '',
                    }
                    arr.push(obj)
                })
                setDistribs(arr)
            }
		
			const projects = await getProjectsApi(manager?.chatId)
            console.log("projects: ", projects)

            setProjects(projects)
        }

        fetchData()

    }, []);
    

    useEffect(() => {
        if (!managerId) {
			console.log('Данные о менеджере отсутствуют БД!')
		} else {
			console.log('ManagerId: ', managerId) 
        }
    }, [managerId])

	// useEffect(() => {
    //     const countItems = {}; // здесь будет храниться промежуточный результат
    //     for (const item of projects) {
    //         // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
    //         //ВЫВОДИТЬ КНОПКИ БЕЗ ненужных кнопок фильтра
    //         if (item.status_id && item.status_id.name != 'Test' && item.status_id.name != 'OnHold' && item.status_id.name != 'Deleted') {
    //             countItems[item.status_id.name] = countItems[item.status_id.name] ? countItems[item.status_id.name] + 1 : 1;
    //         }
    //     }
    //     //console.log('countItemsStatus: ', countItems);

    //     const obj = {
    //         title: 'All',
    //         color: "gray",
    //         count: '',
    //     }
    //     arr_status.push(obj) 
        
    //     const objectArray = Object.entries(countItems);
    //     objectArray.forEach(([key, value]) => {
    //         const obj = {
    //             title: key,
    //             color: "",
    //             count: value,
    //         }
    //         arr_status.push(obj) 
    //     });

    //     //console.log('arr status: ', arr_status);
    //     setStatus(arr_status);

    // },[projects]);  


    return (
		<UserContext.Provider value={{ 
            workerhub, 
            setWorkerhub,
            companyId,
            companyManager,
            companyProfile,
			projects,
			setProjects,
			managerId,
			setManagerId,
			status,
            setStatus,
            userApp,
            setUserApp,
            count,
            setCount,
            distrib, 
            setDistrib,
            distribs, 
            setDistribs,
            distrib2, 
            setDistrib2,
            distribs2, 
            setDistribs2,
            projectDate, 
            setProjectDate,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };