// useAxiosInterceptor.jsx
import axios from 'axios';
import { useAppStore } from '../store/useAppStore';

export const useAxiosInterceptor = () => {
    const logout = useAppStore(state => state.logout);
    
    if (!axios.defaults.headers.common['Authorization']) {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        logout();
                    }
                    return Promise.reject(error.response);
                }

                console.error('Error de red o del servidor:', error);
                return Promise.reject(error);
            }
        );
    }
};
