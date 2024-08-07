import LogoHeader from '../components/LogoHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'
import NavProfile from '../components/NavProfile'
import NavBar from '../components/NavBar'
import CurrentTime from '../components/CurrentTime'

export default function AppLayout() {
    const navigate = useNavigate()
    const { status, localLogin } = useAppStore()

    useEffect(() => {
        const initialize = async () => {
            if (!status) {
                await localLogin();
                // navigate('/auth/login')
            }
        };
        initialize();
    }, [status, localLogin, navigate]);

    if (!status) {
        navigate('/auth/login');
    }

    return (
        <>
            <div className='min-h-screen w-full'>
                <div className='bg-Purple'>
                    <header className='flex items-center justify-between max-w-[1210px] mx-auto h-[80px] py-[16px]'>
                        <LogoHeader />
                        <NavBar />
                        <NavProfile />
                    </header>
                </div>
                <div className='flex flex-col mx-auto max-w-[1210px] px-8p box-content pb-10'>
                    <CurrentTime />
                    <Outlet />
                </div>
            </div>
        </>
    )
}