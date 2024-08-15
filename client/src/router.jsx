// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import LandingLayout from './layouts/LandingLayout';

// Views: Auth
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import ForgotPassword from './views/auth/ForgotPassword';
import NewPassword from './views/auth/NewPassword';

// Views: Home
import Home from './views/Home/Home';

// Views: Classroom - VirtualClassRoom
import VirtualClassRoom from './views/Classroom/VirtualClassRoom/VirtualClassRoom';
import VCRDetail from './views/Classroom/VirtualClassRoom/Program/ProgramDetail';
import VCRClassDetail from './views/Classroom/VirtualClassRoom/Class/ClassDetail';

// Views: Classroom - WorkSpace
import WorkSpace from './views/Classroom/WorkSpace/WorkSpace';
import ProgramDetail from './views/Classroom/WorkSpace/Program/ProgramDetail';
import ClassDetail from './views/Classroom/WorkSpace/Class/ClassDetail';

// Views: Student
import ViewStudent from './views/Student/ViewStudent';
import DetailStudent from './views/Student/DetailStudent';

// Views: Resources
import Recursos from './views/Resources/Resources';

// Views: Calendar
import Calendario from './views/Calendar/Calendario';

// Views: Landing
import Landing from './views/Landing/Landing';
import History from './views/Landing/History';
import AboutUs from './views/Landing/AboutUs';

// Views: Profile
import Profile from './views/Profile/Profile';

// Views: Error
import Error404 from './views/Error/404';

// Custom Hooks
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";

export default function Router() {
    useAxiosInterceptor();

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingLayout />}>
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/historia' element={<History />} />
                    <Route path='/conocenos' element={<AboutUs />} />
                </Route>
                
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home />} index />
                    <Route path='/aulavirtual' element={<VirtualClassRoom />} />
                    <Route path='/aulavirtual/aula/:eid' element={<VCRDetail />} />
                    <Route path='/aulavirtual/clase/:eid' element={<VCRClassDetail />} />
                    <Route path='/workspace' element={<WorkSpace />} />
                    <Route path='/workspace/programas/:eid' element={<ProgramDetail />} />
                    <Route path='/workspace/class/:eid' element={<ClassDetail />} />
                    <Route path='/recursos' element={<Recursos />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/calendario' element={<Calendario />} />
                    <Route path='/student' element={<ViewStudent />} />
                    <Route path="/student/:studentId" element={<DetailStudent />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} />
                    <Route path='/auth/newpassword' element={<NewPassword />} />
                </Route>

                <Route path='*' element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}
