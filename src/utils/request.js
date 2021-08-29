import axios from 'axios'

const BASE_URL = 'http://liugezhou.com:7001'

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
);

export default service;