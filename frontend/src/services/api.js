import axios from 'axios';
import { getToken, validateToken, logout } from "./auth";

const api = axios.create({
    baseURL: 'http://45.79.47.218/cvportal/backend/api/',
});

api.interceptors.request.use(async config => {
    const token = getToken();
    console.log(token)

    if(config.url !== "checkToken"){
      if (token){
        if(validateToken()){
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  });

export default api;