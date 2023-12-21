import {$host} from "./index";

export const getManagerApi = async (id) =>{
    try {
       let response = await $host.get(`managers/cash/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerApi api from webapp-react", error.message);
    }
}

export const createManagerApi = async (data) =>{
    console.log("data: ", data)
    try {
       let response = await $host.post(`manager`, data);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling createManagerApi api from webapp-react", error.message);
    }
}

export const getManagerIdApi = async (id) =>{
    console.log(id, parseInt(id))
    try {
       let response = await $host.get(`managers/chat/${parseInt(id)}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerIdApi api from webapp-react", error.message);
    }
}


export const getCompanyIdApi = async (id) =>{
    try {
       let response = await $host.get(`manager/${id}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyIdApi api from webapp-react", error.message);
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