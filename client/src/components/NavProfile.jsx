import NotificationsIcon from '@mui/icons-material/Notifications';

const NavProfile = () => {
    return (
        <div className='flex justify-end items-center gap-[12px] h-[48px] w-full' >
            <NotificationsIcon className='w-6 h-6 cursor-pointer text-white' />
            <div className='flex flex-row justify-center items-center text-white'>
                <span className='flex text-center justify-center items-center font-bold rounded-full w-8 h-8 bg-Yellow'>P</span>
                <h3 className='p-2'>Hola! Profesor</h3>
            </div>
        </div>
    )
}

export default NavProfile
