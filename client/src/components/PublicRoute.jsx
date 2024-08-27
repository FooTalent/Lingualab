import { Navigate, Outlet} from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const PublicRoute = () => {
    const { status } = useAppStore();

    return status ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;