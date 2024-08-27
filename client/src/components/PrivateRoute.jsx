import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const PrivateRoute = () => {
    const { status } = useAppStore();

    return status ? <Outlet /> : <Navigate to="/landing" />;
};

export default PrivateRoute;