import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL2
})

const $host_old = axios.create({
    baseURL: process.env.REACT_APP_API_URL_UPLOAD
})

const $host_stavka = axios.create({
    baseURL: process.env.REACT_APP_API_URL_STAVKA
})


export {
    $host,
    $host_old,
    $host_stavka,
}