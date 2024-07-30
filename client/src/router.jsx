import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import AppLayout from './layouts/AppLayout'
import Home from './views/Home'
import Register from './views/auth/Register'
import ForgotPassword from './views/auth/ForgotPassword'
import NewPassword from './views/auth/NewPassword'
import Profile from './views/Profile'
import VirtualClasstoom from './views/VirtualClassroom/VirtualClassroom'
import ProgramDetail from './views/Programs/ProgramDetail'
import ClassRoomDetail from './views/ClassRoom/ClassRoomDetail'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home />} index />
                    <Route path='/aulavirtual' element={<VirtualClasstoom />} />
                    <Route path='/programas/:eid' element={<ProgramDetail />} />
                    <Route path='/classroom/:eid' element={<ClassRoomDetail />} />
                    <Route path='/profile' element={<Profile />}  />
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