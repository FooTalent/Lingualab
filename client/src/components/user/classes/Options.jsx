import React from 'react'
import { Link } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Options({ state }) {
    return (
        <div className={`absolute top-1/4 end-0 text-sm shadow-cardOption rounded-lg bg-white p-4 ${state ? 'flex flex-col gap-2' : 'hidden'}`}>
            <Link className='cursor-pointer flex items-center gap-2 !text-card !no-underline'><PersonAddIcon /> Invitar al/los alumno/os</Link>
            <Link className='cursor-pointer flex items-center gap-2 !text-card !no-underline'><WatchLaterIcon /> Editar fecha y hora</Link>
            <Link className='cursor-pointer flex items-center gap-2 !text-card !no-underline'><ShareIcon /> Compartir</Link>
            <Link className='cursor-pointer flex items-center gap-2 !text-card !no-underline'><DeleteIcon /> Eliminar clase</Link>
        </div>
    )
}
