import Logo from '../components/Logo'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
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