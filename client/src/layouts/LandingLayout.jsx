import { Outlet, useNavigate } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'
import NavBar from '../components/NavBar'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'
import NavAuth from '../views/Landing/NavAuth'
import Footer from '../views/Landing/Footer'

export default function LandingLayout() {
    const navigate = useNavigate()
    const { status, localLogin } = useAppStore()

    useEffect(() => {
        const initialize = async () => {
            if (!status) {
                await localLogin();
            }
        };
        initialize();
        if (status) {
            navigate('/')
        }
    }, [status, navigate])

    return (
        <>
            <div className='min-h-screen w-full'>
                <div className='bg-Purple'>
                    <header className='flex items-center justify-between max-w-[1210px] mx-auto h-[80px] py-[16px]'>
                        <LogoHeader />
                        <NavBar />
                        <NavAuth />
                    </header>
                </div>
                <div className='flex flex-col mx-auto max-w-full'>
                    <Outlet />
                </div>
                < footer className='bg-Purple mt-4'>
                    <Footer />
                </footer>
            </div>
        </>
    )
}