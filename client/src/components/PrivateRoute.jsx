import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

const PrivateRoute = () => {
    const { localLogin, status } = useAppStore()
    
    useEffect(() => {
        const initialize = async () => {
            await localLogin();
        };
        initialize();
    }, [localLogin, status]);
    const statusLocal = localStorage.getItem('status')

    return statusLocal ? <Outlet /> : <Navigate to="/landing" />;
};

export default PrivateRoute;