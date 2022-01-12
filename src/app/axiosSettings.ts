import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://test-job.webatom.ru/',
    headers: {
        'Content-Type': 'application/json'
    }
})