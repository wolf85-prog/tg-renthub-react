import {$host, $host_old, $host_stavka, $host_bot} from "./index";

export const getManagerApi = async (id) =>{
    try {
       let response = await $host.get(`api/managers/get/${id}`);
       console.log(response.data);
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
    try {
       let response = await $host.get(`managers/chat/${parseInt(id)}`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getManagerIdApi api from webapp-react", error.message);
    }
}

export const updateManager = async (id, data) =>{
    try {
       let response = await $host_old.patch(`api/managers/update/${id}`, data);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling updateManager api from webapp-react", error.message);
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

export const getCompanysApi = async () =>{
    try {
       let response = await $host.get(`api/companys/get`);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanysApi api from webapp-react", error.message);
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


export const getSpecStavka = async (data) =>{
    try {
       let response = await $host_stavka.post(`api/rates/spec-name`, data);
       //console.log(response);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecStavka api from webapp-react", error.message);
    }
}

export const sendManagerAvatar = async (id, data) =>{
    try {
       let response = await $host_bot.post(`managers/send/${id}`, data);
       return response.data;
    } catch (error) {
        console.log("error while calling sendManagerAvatar api", error.message);
    }
}