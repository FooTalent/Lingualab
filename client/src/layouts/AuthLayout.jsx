import Logo from '../components/Logo'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <>
            <div className='bg-gray-800 min-h-screen'>
                <div className='py-4 lg:py-10 mx-auto w-[500px]'>
                    <Logo />
                    <div className='mt-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}