import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import AppLayout from './layouts/AppLayout'
import Home from './views/Home'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import NewPassword from './views/auth/NewPassword'
import Profile from './views/Profile/Profile'
import VirtualClassRoom from './views/Classroom/VirtualClassRoom/VirtualClassRoom'
import VCRDetail from './views/Classroom/VirtualClassRoom/Program/ProgramDetail'
import VCRClassDetail from './views/Classroom/VirtualClassRoom/Class/ClassDetail'
import WorkSpace from './views/Classroom/WorkSpace/WorkSpace'
import ProgramDetail from './views/Classroom/WorkSpace/Program/ProgramDetail'
import ClassDetail from './views/Classroom/WorkSpace/Class/ClassDetail'
import Recursos from './views/Resources/Resources'
import Calendario from './views/user/Calendario'
import Landing from './views/Landing'
import History from './views/History'
import AboutUs from './views/AboutUs'
import ViewStudent from './views/Student/ViewStudent'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
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
                    <Route path='/alumnos' element={<ViewStudent />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/historia' element={<History />} />
                    <Route path='/conocenos' element={<AboutUs />} />
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} />
                    <Route path='/auth/new-password' element={<NewPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
