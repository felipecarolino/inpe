import axios from 'axios';

const api = axios.create({
    baseURL: 'http://45.79.47.218/cvportal/backend/api/',
});

export default api;