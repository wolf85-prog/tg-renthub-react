import {$host} from "./index";

export const getManagerId = async (id) =>{
    try {
       let response = await $host.get(`managers/chat/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerId api from webapp-react", error.message);
    }
}

export const getProjects = async () =>{
    try {
       let response = await $host.get(`projects`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjects api from webapp-react", error.message);
    }
}