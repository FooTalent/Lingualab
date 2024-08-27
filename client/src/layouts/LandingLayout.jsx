import { Outlet } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'
import NavBar from '../components/NavBar'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'
import NavAuth from '../views/Landing/NavAuth'
import Footer from '../views/Landing/Footer'

export default function LandingLayout() {
    
    const { localLogin, status } = useAppStore()

    useEffect(() => {
        const initialize = async () => {
            await localLogin();
        };
        initialize();
    }, [localLogin, status]);

    return (
        <>
            <div className='min-h-screen w-full'>
                <div className='bg-Purple'>
                    <header className='flex z-40 w-full mx-auto  items-center justify-between max-w-[1210px] h-[48px] md:h-[80px] px-5 py-4'>
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