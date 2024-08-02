import React from 'react'
import { Link } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Options({ state, id }) {
    const links = [
        { path: `/classroom/${id}`, label: <><PersonAddIcon /> Invitar al/los alumno/os</> },
        { path: `/classroom/${id}`, label: <><WatchLaterIcon /> Editar fecha y hora</> },
        { path: `/classroom/${id}`, label: <><ShareIcon /> Compartir</> },
        { path: `/classroom/${id}`, label: <><DeleteIcon /> Eliminar clase</> },
    ]
    return (
        <div
            className={`absolute top-1/4 end-0 text-sm border shadow-cardContainer z-10 rounded-lg bg-white p-4 ${state ? 'flex flex-col gap-4' : 'hidden'}`}
        >
            {
                links.map(link => (
                    <Link
                        to={link.path}
                        className='cursor-pointer py-1 px-2 rounded-md ease-linear duration-200 flex items-center gap-2 !text-card !no-underline hover:bg-yellowInput'
                    >
                        {link.label}
                    </Link>
                ))
            }
        </div>
    )
}
