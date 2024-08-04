import React from 'react';
import Options from './Options';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ClassCard({ id, title, students, duration, isNow, linkMeet, toggleOptions, stateOption }) {
    const links = [
        { path: `/classroom/${id}`, label: <><PersonAddIcon /> Invitar al/los alumno/os</> },
        { path: `/classroom/${id}`, label: <><WatchLaterIcon /> Editar fecha y hora</> },
        { path: `/classroom/${id}`, label: <><ShareIcon /> Compartir</> },
        { path: `/classroom/${id}`, label: <><DeleteIcon /> Eliminar clase</> },
    ]

    const handleCardOptions = (e) => {
        e.stopPropagation();
        toggleOptions(id);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='relative border hover:border-Purple rounded-xl shadow-cardContainer p-4 flex justify-between flex-nowrap w-full text-card'>
            <div className='flex flex-col gap-4 w-7/12'>
                <h2 className='font-bold text-lg'>Programa 1</h2>
                <h3 className='font-semibold text-base truncate'>{title ? title : 'Sin titulo asignado'}</h3>
                <div className='flex flex-col gap-2 text-sm'>
                    <p className='flex items-center gap-2 truncate'><AccountCircleIcon /> {students.length ? students : 'Sin alumnos asignados'}</p>
                    <p className='flex items-center gap-2'><WatchLaterIcon />{duration}</p>
                </div>
            </div>

            <div className='flex flex-col justify-between items-end w-4/12'>
                <button
                    id={`button-Options-${id}`}
                    onClick={handleCardOptions}
                >
                    <MoreVertIcon />
                </button>

                <Link
                    to={isNow ? linkMeet : `/classroom/${id}`}
                    target={isNow ? '_blank' : ''}
                    className={`flex gap-2 rounded-lg px-2 py-2 font-extrabold ease-linear duration-200 ${isNow ? 'bg-yellowInput hover:bg-card hover:text-yellowInput' : 'bg-Purple text-white hover:bg-PurpleHover'}`}
                    onClick={handleLinkClick}
                >
                    {isNow ? <><VideocamIcon />Unirse</> : 'Ir al aula'}
                </Link>
            </div>

            {stateOption === id && <Options state={stateOption} id={id} links={links} />}
        </div>
    );
}
