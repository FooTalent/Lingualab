import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import AppLayout from './layouts/AppLayout'
import Home from './views/Home'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import NewPassword from './views/auth/NewPassword'
import Profile from './views/Profile'
import WorkSpace from './views/WorkSpace/WorkSpace'
import ProgramDetail from './views/Program/ProgramDetail'
import ClassDetail from './views/Class/ClassDetail'
import Recursos from './views/Resources/Resources'
import Calendario from './views/user/Calendario'
import Resources from './views/Resources/Resources'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home />} index />
                    <Route path='/aulavirtual' element={<WorkSpace />} />
                    <Route path='/programas/:eid' element={<ProgramDetail />} />
                    <Route path='/classroom/:eid' element={<ClassDetail />} />
                    <Route path='/recursos' element={<Resources />} />
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
