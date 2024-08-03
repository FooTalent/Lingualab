import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import AppLayout from './layouts/AppLayout'
import Home from './views/Home'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import NewPassword from './views/auth/NewPassword'
import Profile from './views/Profile'
import VirtualClassRoom from './views/VirtualClassRoom/VirtualClassRoom'
import VCRDetail from './views/VirtualClassRoom/Program/ProgramDetail'
import VCRClassDetail from './views/WorkSpace/Class/ClassDetail'
import WorkSpace from './views/WorkSpace/WorkSpace'
import ProgramDetail from './views/WorkSpace/Program/ProgramDetail'
import ClassDetail from './views/WorkSpace/Class/ClassDetail'
import Recursos from './views/Resources/Resources'
import Calendario from './views/user/Calendario'


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
                    <Route path='/profile' element={<Profile />}  />
                    <Route path='/calendario' element={<Calendario />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} />
                    <Route path='/auth/new-password' element={<NewPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
