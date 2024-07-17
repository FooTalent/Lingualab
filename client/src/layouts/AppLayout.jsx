
import Logo from '../components/Logo'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'

export default function AppLayout() {
    const navigate = useNavigate()
    const { status, localLogin } = useAppStore()
    // useEffect(() => {
    //     if (!status) {
    //         const checkLoginStatus = async () => {
    //             await localLogin();
    //         };
    //         checkLoginStatus();
    //     }
    //     if (!status) {
    //         navigate('/auth/login')
    //     }
    // }, [status]);

    return (
        <>
            <div className='bg-gray-800 min-h-screen'>
                <div className='py-4 lg:py-10 mx-auto'>
                    <Logo />
                    <div className='mt-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}