import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL2
})

const $host_old = axios.create({
    baseURL: process.env.REACT_APP_API_URL_UPLOAD
})


export {
    $host,
    $host_old,
}