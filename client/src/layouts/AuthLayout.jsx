import Logo from '../components/Logo'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'

export default function AuthLayout() {
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
            <div className='flex bg-fondo bg-no-repeat bg-cover min-h-screen w-full'>
                <div className='flex flex-col items-center bg-whiteCustom shadow-custom md:w-[504px] rounded-2xl md:p-10 md:gap-4 md:mt-[77px] md:mb-[20px] md:mx-[70px] 2 mt-[30px] p-[10px] mx-[10px] h-full'>
                    <Logo />
                    <Outlet />
                </div>
            </div>
        </>
    )
}