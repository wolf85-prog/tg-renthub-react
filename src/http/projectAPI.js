import {$host} from "./index";

export const getManagerIdApi = async (id) =>{
    try {
       let response = await $host.get(`managers/chat/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerId api from webapp-react", error.message);
    }
}

export const getProjectsApi = async (id) =>{
    try {
       let response = await $host.get(`projects/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsApi api from webapp-react", error.message);
    }
}

export const getProjectsCashApi = async () =>{
    try {
       let response = await $host.get(`projectscash`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsCashApi api from webapp-react", error.message);
    }
}