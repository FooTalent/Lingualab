import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './views/auth/Login'
import AppLayout from './layouts/AppLayout'
import Home from './views/Home'
import Register from './views/auth/Register'
import Calendar from './views/user/Calendar'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home />} index />
                    <Route path='/user/calendario' element={<Calendar />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}