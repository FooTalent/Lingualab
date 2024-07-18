import Logo from '../components/Logo'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <div className='flex bg-fondo bg-no-repeat bg-cover min-h-screen'>
                <div className='ml-[70px] mt-[124px]'>
                    <div className='flex flex-col items-center bg-whiteCustom shadow-custom w-[504px] rounded-[16px] p-[60px]'>
                        <Logo />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}