import React, { createContext, useContext, useEffect, useState } from "react";
import { getManagerId, getProjects } from './../http/projectAPI';
import {useTelegram} from "./../hooks/useTelegram";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const {user} = useTelegram();

	const [managerId, setManagerId] = useState("");
	const [manager, setManager] = useState("");
	const [projects, setProjects] = useState([]);


	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        const fetchData = async() => {
            const manager = await getManagerId(user?.id) //user?.id '805436270'
            console.log("manager context: ", manager)
            setManager(manager)
        }

        fetchData()

    }, []);


    return (
		<UserContext.Provider value={{ 
			projects,
			setProjects,
			managerId,
			setManagerId,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };