import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const NavProfile = () => {
    const { loguot } = useAppStore()
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    return (
        <div className='relative flex justify-end items-center gap-3 h-12 w-full'>
            <NotificationsIcon className='w-6 h-6 cursor-pointer text-white' />
            <div className='flex flex-row justify-center items-center text-white'>
                <span className='flex justify-center items-center font-bold rounded-full w-8 h-8 bg-Yellow'>P</span>
                <h3 className='p-2'>Hola! Profesor</h3>
                <button onClick={handleMenuToggle} className='relative'>
                    <ExpandMoreIcon className='text-white' />
                </button>
                {menuOpen && (
                    <div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg'>
                        <ul className='py-1'>
                            <li>
                                <button
                                    onClick={handleMenuClose}
                                    className='buttonNavProf'
                                >
                                    Perfil
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleMenuClose}
                                    className='buttonNavProf'
                                >
                                    Configuración
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => loguot()}
                                    className='buttonNavProf'
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavProfile