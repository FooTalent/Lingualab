import LogoHeader from '../components/LogoHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'
import NavProfile from '../components/NavProfile'
import NavBar from '../components/NavBar'

export default function AppLayout() {
    const navigate = useNavigate()
    const { status, localLogin } = useAppStore()
    useEffect(() => {
        if (!status) {
            const checkLoginStatus = async () => {
                await localLogin();
            };
            checkLoginStatus();
        }
        if (!status) {
            navigate('/auth/login')
        }
    }, [status]);

    return (
        <>
            <div className='min-h-screen'>
                <header className='bg-Purple flex items-center justify-between w-full h-[80px] px-[115px] py-[16px]'>
                    <LogoHeader />
                    <NavProfile />
                </header>
                <NavBar />
                <div className='mt-10'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}