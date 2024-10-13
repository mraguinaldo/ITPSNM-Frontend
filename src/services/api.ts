import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie'; 

const baseURL = 'https://itpsnm.onrender.com/api/v1';
const API = axios.create({ baseURL });

const useAxiosInterceptor = () => {
  const redirectTo = useNavigate();

  useEffect(() => {
    const requestInterceptor = API.interceptors.request.use(
      (config: any) => {
        const token = Cookies.get('token'); 
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = API.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const message = error.response?.data?.message;
        if (message === 'Unauthorized: Invalid token' || message === 'User is invalid.' || message === 'Account is blocked. Please contact support.' || message === 'Unauthorized: User is blocked or inactive' || message === 'Forbidden: Access denied') {
          redirectTo('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      API.interceptors.request.eject(requestInterceptor);
      API.interceptors.response.eject(responseInterceptor);
    };
  }, [redirectTo]);
};

export { API, useAxiosInterceptor };
