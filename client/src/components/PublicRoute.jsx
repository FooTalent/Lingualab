import { Navigate, Outlet} from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

const PublicRoute = () => {
    const statusLocal = localStorage.getItem('status')
    const { localLogin, status } = useAppStore()
    
    useEffect(() => {
        const initialize = async () => {
            await localLogin();
        };
        initialize();
    }, [localLogin, status]);

     return !statusLocal ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;