import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';
import { crearURLCompleta } from '../utils/urifoto';

const NavProfile = () => {
    const { logout, userDetail } = useAppStore()
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    const initials = userDetail?.first_name?.charAt(0) + userDetail?.last_name?.charAt(0)

    return (
        <div className='hidden relative lg:flex justify-end items-center gap-3 h-12'>
            <NotificationsIcon className='w-6 h-6 text-white opacity-50 cursor-not-allowed' />
            <div className='flex flex-row justify-center items-center text-white'>
                {userDetail?.photo ? (
                    <img className='flex justify-center items-center font-bold rounded-full w-8 h-8'
                        src={crearURLCompleta(userDetail.photo)}
                    />
                ) : <span className='flex justify-center items-center font-bold rounded-full w-8 h-8 bg-Yellow uppercase'>{initials ? initials : "?"}</span>}

                <h3 className='p-2'>¡Hola, Docente!</h3>
                <button onClick={handleMenuToggle} className='relative'>
                    <ExpandMoreIcon className='text-white' />
                </button>
            </div>
            {
                menuOpen && (
                    <div className='absolute top-[50%] z-40 shadow-customTable p-4 mt-4 bg-white rounded-lg'>
                        <ul className='space-y-2'
                            onClick={handleMenuClose}>
                            <li>
                                <Link
                                    to='/profile'
                                    className='buttonNavProf'
                                >
                                    Perfil
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => logout()}
                                    className='buttonNavProf'
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default NavProfile