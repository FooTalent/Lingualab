import Logo from '../components/Logo'
import { Outlet} from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'

export default function AuthLayout() {
    const { localLogin, status } = useAppStore()

    useEffect(() => {
        const initialize = async () => {
            await localLogin();
        };
        initialize();
    }, [localLogin, status]);

    return (
        <>
            <div className='flex items-center justify-center md:justify-start md:bg-fondo md:bg-no-repeat md:bg-cover md:min-h-screen w-full'>
                <div className='flex flex-col items-center w-full bg-whiteCustom md:shadow-custom md:w-[504px] md:rounded-2xl md:p-10 p-5 gap-8 md:mt-[77px] md:mb-[20px] md:mx-[70px] mt-[30px] mx-[10px] h-full'>
                    <Logo />
                    <Outlet />
                </div>
            </div>
        </>
    )
}